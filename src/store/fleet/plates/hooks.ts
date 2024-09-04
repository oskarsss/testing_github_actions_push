/* eslint-disable max-len */
import { useCallback, useMemo, useRef } from 'react';
import {
    useAppliedFilters,
    useFilteredRows,
    useSelectedFilters
} from '@/@core/components/table/hooks/helpers';
import { pollingIntervalForTable } from '@/@core/components/table/configs';
import { $Filter } from '@/@core/components/filters/utils';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { useStableArray } from '@/hooks/useStable';
import { PhpFilterTypeMap } from '@/@core/components/filters/types';
import { useTablePageData } from '@/hooks/page-table/useTablePageData';
import PlateCompaniesGrpcService from '@/@grpcServices/services/plate-companies.service';
import { PlateCompanyGetReply } from '@proto/plate.company';
import PlatesGrpcService, {
    PlateStatusGrpc,
    VehicleTypeGrpc,
    VehicleTypeGrpcReverse
} from '@/@grpcServices/services/plates.service';
import type { PlateGetReply } from '@proto/plates';
import createMap from '@/utils/create-map';
import {
    type PlateModel,
    PlateModel_Status,
    PlateModel_VehicleType
} from '@proto/models/model_plate';
import TrailersGrpcService from '@/@grpcServices/services/trailers.service';
import { useAppSelector } from '@/store/hooks';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';
import { TrailerDataSelectors } from '@/store/storage/trailers/slice';
import PlatesTypes from './types';

const page = 'plates';
export const default_plates_filters = PAGES_FILTERS_CONFIG.FLEET.PLATES.defaultFilters;

const filtersOrder = $Filter.order(default_plates_filters)(
    'plate_company',
    'plate_status',
    'plate_vehicle_type'
);

const filterIds = [
    PhpFilterTypeMap.PLATE_COMPANY,
    PhpFilterTypeMap.PLATE_STATUS,
    PhpFilterTypeMap.PLATE_VEHICLE_TYPE
];

const filterValues = ['plateCompanyId', 'status', 'vehicle_type'];

const useConvertPlate = () => {
    const trucks = useAppSelector(TrucksDataSelectors.getRows);
    const trailers = useAppSelector(TrailerDataSelectors.getRows);
    const { companies } = useActivePlatesCompanies();

    const vehiclesMap = useMemo(
        () => ({
            trucksMap  : createMap(trucks, 'plateId'),
            trailersMap: createMap(trailers, 'plateId')
        }),
        [trailers, trucks]
    );

    const plateCompaniesMap = createMap(companies, 'plateCompanyId');

    const formatFunction = new Intl.NumberFormat('en-US', {
        style                : 'currency',
        currency             : 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 2
    }).format;

    const converter = useCallback(
        (plate: PlateModel) => {
            const isTruck = plate.vehicleType === PlateModel_VehicleType.TRUCK;
            return {
                ...plate,
                truckId           : isTruck ? vehiclesMap.trucksMap[plate.plateId]?.truckId : '',
                trailerId         : !isTruck ? vehiclesMap.trailersMap[plate.plateId]?.trailerId : '',
                truckRefId        : isTruck ? vehiclesMap.trucksMap[plate.plateId]?.referenceId : '',
                trailerRefId      : !isTruck ? vehiclesMap.trailersMap[plate.plateId]?.referenceId : '',
                vehicle_type      : VehicleTypeGrpcReverse[plate.vehicleType],
                status            : PlateStatusGrpc[plate.status],
                plate_company_name: plateCompaniesMap[plate.plateCompanyId]?.name || '',
                annual_cost       : formatFunction(plate.annualCost),
                owner_name        : plate.ownerName,
                unique_key        : plate.plateId,
                entityId          : plate.plateId,
                entities          : {
                    plate: plate.plateId
                }
            };
        },
        [formatFunction, plateCompaniesMap, vehiclesMap]
    );

    return { converter };
};

const useMemoize = (data?: PlateGetReply) => {
    const {
        views,
        headers,
        updateColumnWidth
    } = useTablePageData('PLATES');
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_plates_filters);

    const {
        selectView,
        defaultViewId,
        selectedViewId,
        currentView: view
    } = useSelectSearchView({
        page,
        defaultFilters: default_plates_filters,
        views
    });

    const { converter } = useConvertPlate();

    const platesList: PlatesTypes.Row[] = useMemo(
        () =>
            data?.plates
                .filter(({ status }) => status !== PlateModel_Status.DELETED)
                .map(converter) || [],
        [data?.plates, converter]
    );

    const rowsData = useFilteredRows(platesList, selected_filters);
    const dataFilters = $Filter.getFiltersData(filterIds, filterValues);
    const counts = $Filter.calculateCounts(platesList, dataFilters);
    const filters = useAppliedFilters(filtersOrder, counts);

    return {
        views,
        headers,
        ...rowsData,
        filters,
        selected_filters,
        view,
        filter_id,
        selected_view_id: selectedViewId,
        selectView,
        defaultViewId,
        updateColumnWidth
    };
};

export function useMainPlates(isPollingInterval = true) {
    const {
        data,
        isError,
        isLoading
    } = PlatesGrpcService.useGetPlatesQuery(
        {},
        {
            pollingInterval: isPollingInterval ? pollingIntervalForTable : undefined
        }
    );

    const memoizedData = useMemoize(data);

    return { ...memoizedData, isError, isLoading };
}

export function usePlates() {
    const {
        data,
        isError,
        isLoading
    } = PlatesGrpcService.useGetPlatesQuery({});

    const memoizedData = useMemoize(data);

    return { ...memoizedData, isError, isLoading };
}

type UseAvailablePlatesProps = {
    vehicle_type: PlatesTypes.VehicleType;
    truckId?: string;
    trailerId?: string;
};

export function useAvailablePlates({
    vehicle_type,
    truckId,
    trailerId
}: UseAvailablePlatesProps) {
    const stableArray = useRef([]).current;
    const {
        data,
        isError,
        isLoading,
        refetch
    } = PlatesGrpcService.useGetPlatesQuery({});

    const { converter } = useConvertPlate();

    const available_plates = useMemo(
        () =>
            data?.plates
                ? data.plates.filter((plate) => {
                    if (plate.status === PlateModel_Status.DELETED) return false;
                    const convertPlate = converter(plate);

                    if (convertPlate.vehicleType === VehicleTypeGrpc[vehicle_type]) {
                        if (vehicle_type === 'truck') {
                            if (!convertPlate.truckId || convertPlate.truckId === truckId) {
                                return true;
                            }
                        } else if (
                            !convertPlate.trailerId ||
                              convertPlate.trailerId === trailerId
                        ) {
                            return true;
                        }
                    }

                    return false;
                })
                : stableArray,
        [converter, data?.plates, stableArray, trailerId, truckId, vehicle_type]
    );

    return { available_plates, isError, isLoading, refetch };
}

export function useActivePlatesCompanies() {
    const stableArray = useRef([]);

    const {
        data,
        isError,
        isLoading
    } = PlateCompaniesGrpcService.useGetPlateCompaniesQuery({});

    const companies = useMemo(() => {
        if (!data?.plateCompanies) return stableArray.current;
        return data.plateCompanies.filter((plateCompany) => !plateCompany.deleted);
    }, [data]);

    return { companies, isError, isLoading };
}

export const default_plates_companies_filters =
    PAGES_FILTERS_CONFIG.FLEET.PLATES_COMPANIES.defaultFilters;

const page_companies = 'plate_companies';

const useCompaniesMemoize = (data?: PlateCompanyGetReply) => {
    const stableArray = useRef([]);

    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(
        page_companies,
        default_plates_companies_filters
    );

    const views_and_headers = useTablePageData('PLATE_COMPANIES');

    const companies = useMemo(() => {
        if (!data?.plateCompanies) return stableArray.current;
        return data.plateCompanies.filter((plateCompany) => !plateCompany.deleted);
    }, [data?.plateCompanies]);

    const companiesList: PlatesTypes.PlateCompanyRow[] = useMemo(
        () =>
            companies.map((company) => ({
                ...company,
                reference_id: company.referenceId,
                plates_count: company.platesCount,
                created_at  : company.createdAt,
                unique_key  : company.plateCompanyId,
                entityId    : company.plateCompanyId,
                entities    : {
                    plate_company: company.plateCompanyId
                }
            })),
        [companies]
    );

    const rowsData = useFilteredRows(companiesList, selected_filters);

    const {
        selectView,
        defaultViewId,
        selectedViewId,
        currentView: view
    } = useSelectSearchView({
        page          : page_companies,
        defaultFilters: default_plates_companies_filters,
        views         : views_and_headers.views
    });

    return {
        ...views_and_headers,
        ...rowsData,
        selected_filters,
        view,
        filter_id,
        selected_view_id: selectedViewId,
        selectView,
        defaultViewId
    };
};

export function usePlatesCompanies(isPollingInterval = true) {
    const {
        data,
        isError,
        isLoading
    } = PlateCompaniesGrpcService.useGetPlateCompaniesQuery(
        {},
        {
            pollingInterval: isPollingInterval ? pollingIntervalForTable : undefined
        }
    );

    const memoizedData = useCompaniesMemoize(data);

    return {
        ...memoizedData,
        isError,
        isLoading
    };
}
