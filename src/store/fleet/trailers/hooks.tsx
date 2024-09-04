/* eslint-disable max-len */
import {
    useAppliedFilters,
    useFilteredRows,
    useSelectedFilters
} from '@/@core/components/table/hooks/helpers';
import { useCallback, useMemo, useRef } from 'react';
import TrailersTypes from '@/store/fleet/trailers/types';
import { pollingIntervalForTable } from '@/@core/components/table/configs';
import { $Filter } from '@/@core/components/filters/utils';
import TrailerTypesGrpcService from '@/@grpcServices/services/settings-service/trailer-types.service';
import {
    useDriverTypesMap,
    usePlatesMap,
    useTrailersTypesMap,
    useVendorsMap
} from '@/store/hash_maps/hooks';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { PhpFilterTypeMap } from '@/@core/components/filters/types';
import { useTablePageData } from '@/hooks/page-table/useTablePageData';
import { TrailerGetReply } from '@proto/trailers';
import { TrailerModel_Status, TrailerModel_Trailer } from '@proto/models/model_trailer';
import { TrailerStatuses } from '@/models/fleet/trailers/trailer-status';
import { useStableArray } from '@/hooks/useStable';
import {
    TRAILER_OWNERSHIP_TYPE_GRPC,
    TRAILER_STATUS_GRPC
} from '@/models/fleet/trailers/trailers-mappings';
import TrailerCompaniesGrpcService from '@/@grpcServices/services/trailer-companies.service';
import { TrailerCompanyGetReply } from '@proto/trailer.company';
import { useAppSelector } from '@/store/hooks';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';
import { TrailerDataSelectors } from '@/store/storage/trailers/slice';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

export const default_trailers_filter = PAGES_FILTERS_CONFIG.FLEET.TRAILERS.defaultFilters;
export const default_trailer_companies_filter =
    PAGES_FILTERS_CONFIG.FLEET.TRAILER_COMPANIES.defaultFilters;
const page = 'trailers';

const filtersOrder = $Filter.order(default_trailers_filter)(
    'trailer_status',
    'trailer_ownership_type',
    'trailer_type',
    'vendor',
    'trailer_company',
    'trailer_tags'
);

const filterIds = [
    PhpFilterTypeMap.TRAILER_STATUS,
    PhpFilterTypeMap.TRAILER_OWNERSHIP_TYPE,
    PhpFilterTypeMap.TRAILER_TYPE,
    PhpFilterTypeMap.VENDOR,
    PhpFilterTypeMap.TRAILER_COMPANY,
    PhpFilterTypeMap.TRAILER_TAGS
];

const filterValues = [
    'status',
    'ownershipType',
    'trailerTypeId',
    'vendorId',
    'trailerCompanyId',
    'tags.tagId'
];

export const useConvertTrailer = () => {
    const trucks = useAppSelector(TrucksDataSelectors.getRows);

    const trailersTypesMap = useTrailersTypesMap();
    const platesMap = usePlatesMap();
    const driversMap = useDriversMap();
    const driversTypesMap = useDriverTypesMap();
    const vendorsMap = useVendorsMap();

    const converter: (trailer: TrailerModel_Trailer) => TrailersTypes.ConvertedTrailerRow =
        useCallback(
            (trailer) => {
                const truck = trucks.find((truck) => truck.trailerId === trailer.trailerId);
                const primaryDriverId = truck?.drivers?.find((driver) => driver.primary)?.driverId;
                const driver = driversMap[primaryDriverId || ''];
                const driverType = driversTypesMap[driver?.driverTypeId];
                return {
                    ...trailer,
                    ownershipType         : TRAILER_OWNERSHIP_TYPE_GRPC[trailer.ownershipType],
                    status                : TRAILER_STATUS_GRPC[trailer.status],
                    trailerType           : trailersTypesMap[trailer.trailerTypeId] || null,
                    reference_id          : trailer.referenceId,
                    plate                 : platesMap[trailer.plateId] || null,
                    driver                : driver || null,
                    driverId              : driver?.driverId || '',
                    driverType            : driverType || null,
                    truck                 : truck || null,
                    truckId               : truck?.truckId || '',
                    vendor                : vendorsMap[trailer.vendorId] || null,
                    unique_key            : trailer.trailerId,
                    driver_rent_amount    : `$${trailer.driverRentAmount}`,
                    company_rent_amount   : `$${trailer.companyRentAmount}`,
                    driver_deposit_amount : `$${trailer.driverDepositAmount}`,
                    company_deposit_amount: `$${trailer.companyDepositAmount}`,
                    trailer_id            : trailer.trailerId,
                    entityId              : trailer.trailerId,
                    entities              : {
                        trailer: trailer.trailerId,
                        truck  : truck?.truckId || '',
                        driver : driver?.driverId
                    }
                };
            },
            [trucks, driversMap, driversTypesMap, trailersTypesMap, platesMap, vendorsMap]
        );

    return { converter };
};

const useMemoize = (data?: TrailerGetReply) => {
    const {
        views,
        headers,
        updateColumnWidth
    } = useTablePageData('TRAILERS');
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_trailers_filter);

    const { converter } = useConvertTrailer();

    const convertedTrailers = useMemo(
        () => (data?.trailers ? data.trailers.map(converter) : []),
        [data, converter]
    );

    const filteredByDeleteStatus = useMemo(() => {
        // @ts-ignore
        if (!selected_filters.trailer_status.includes(TrailerStatuses.DELETED)) {
            return convertedTrailers.filter((row) => row.status !== TrailerStatuses.DELETED);
        }
        return convertedTrailers;
    }, [convertedTrailers, selected_filters.trailer_status]);

    const rowsData = useFilteredRows(filteredByDeleteStatus, selected_filters);
    const dataFilters = $Filter.getFiltersData(filterIds, filterValues);
    const counts = $Filter.calculateCounts(filteredByDeleteStatus, dataFilters);
    const filters = useAppliedFilters(filtersOrder, counts);

    const {
        defaultViewId,
        selectView,
        selectedViewId,
        currentView: view
    } = useSelectSearchView({
        views,
        defaultFilters: default_trailers_filter,
        page
    });

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
        convertedTrailers,
        defaultViewId,
        updateColumnWidth
    };
};

export function useMainTrailers() {
    const isLoading = useAppSelector(TrailerDataSelectors.getIsLoading);
    const trailers = useAppSelector(TrailerDataSelectors.getRows);

    const memoizedData = useMemoize({
        trailers
    });

    return { ...memoizedData, isLoading };
}

export function useTrailers() {
    const isLoading = useAppSelector(TrailerDataSelectors.getIsLoading);
    const trailers = useAppSelector(TrailerDataSelectors.getRows);

    const memoizedData = useMemoize({ trailers });

    return { ...memoizedData, isLoading };
}

export function useAllTrailersTypes() {
    const {
        data,
        isError,
        isLoading
    } = TrailerTypesGrpcService.endpoints.getTrailerTypes.useQuery(
        {}
    );

    const types = useMemo(() => (data ? data.trailerTypes : []), [data]);

    return { types, isError, isLoading };
}

const trailerCompaniesPage = 'trailer_companies';

const useCompaniesMemoize = (data?: TrailerCompanyGetReply) => {
    const stableArray = useRef([]);
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(
        trailerCompaniesPage,
        default_trailer_companies_filter
    );

    const views_and_headers = useTablePageData('TRAILER_COMPANIES');

    const {
        selectView,
        defaultViewId,
        selectedViewId,
        currentView: view
    } = useSelectSearchView({
        page          : trailerCompaniesPage,
        defaultFilters: default_trailer_companies_filter,
        views         : views_and_headers.views
    });

    const companies = useMemo(() => {
        if (!data?.trailerCompanies) return stableArray.current;
        return data.trailerCompanies.filter((trailerCompany) => !trailerCompany.deleted);
    }, [data?.trailerCompanies]);

    const companiesList = useMemo(
        () =>
            companies.map((company) => ({
                ...company,
                phone_number : company.phoneNumber,
                created_at   : company.createdAt,
                trailer_count: company.trailerCompanyCount,
                entityId     : company.trailerCompanyId,
                unique_key   : company.trailerCompanyId,
                entities     : {
                    trailer_company: company.trailerCompanyId
                }
            })),
        [companies]
    );
    const rowsData = useFilteredRows(companiesList, selected_filters);
    const filters = useAppliedFilters();

    return {
        ...views_and_headers,
        ...rowsData,
        filters,
        selected_filters,
        view,
        filter_id,
        selected_view_id: selectedViewId,
        selectView,
        defaultViewId,
        selectedViewId
    };
};

export function useTrailersCompanies(isPollingInterval = true) {
    const {
        data,
        isError,
        isLoading
    } = TrailerCompaniesGrpcService.useGetTrailerCompaniesQuery(
        {},
        {
            pollingInterval: isPollingInterval ? pollingIntervalForTable : undefined
        }
    );

    const memoizedData = useCompaniesMemoize(data);

    return { ...memoizedData, isError, isLoading };
}

export function useActiveTrailersCompanies() {
    const stableArray = useRef([]);

    const {
        data,
        isError,
        isLoading
    } = TrailerCompaniesGrpcService.useGetTrailerCompaniesQuery(
        {}
    );

    const companies = useMemo(() => {
        if (!data?.trailerCompanies) return stableArray.current;
        return data.trailerCompanies.filter((trailerCompany) => !trailerCompany.deleted);
    }, [data?.trailerCompanies]);

    return { companies, isError, isLoading };
}

// export const useTrailerQuery = ({ trailerId }: { trailerId: string }) => {
//     const trailersTypesMap = useTrailersTypesMap();
//     const trailerCompaniesMap = useTrailerCompaniesMap();
//     const platesMap = usePlatesMap();
//     const vendorsMap = useVendorsMap();
//     const trucks = useAppSelector(TrucksDataSelectors.getRows);

//     const {
//         data,
//         isSuccess,
//         ...rest
//     } = TrailersGrpcService.useRetrieveTrailerQuery(
//         { trailerId },
//         {
//             skip                     : !trailerId,
//             refetchOnMountOrArgChange: true,
//             refetchOnFocus           : true
//         }
//     );

//     const trailer: TrailersTypes.ConvertedTrailer | null = useMemo(() => {
//         if (!isSuccess || !data?.trailer) return null;
//         const trailerType = trailersTypesMap[data?.trailer.trailerTypeId || ''];
//         const trailerCompany = trailerCompaniesMap[data?.trailer.trailerCompanyId || ''];
//         const plate = platesMap[data?.trailer.plateId || ''];
//         const vendor = vendorsMap[data?.trailer.vendorId || ''];
//         const trucksMap = createMap(trucks, 'trailerId');
//         const truck = trucksMap[data.trailer.trailerId];
//         return {
//             ...data.trailer,
//             truckId       : truck?.truckId || '',
//             trailerType   : trailerType || null,
//             truck         : truck || null,
//             plate         : plate || null,
//             vendor        : vendor || null,
//             trailerCompany: trailerCompany || null
//         };
//     }, [data, trailersTypesMap, trailerCompaniesMap, platesMap, vendorsMap, isSuccess, trucks]);

//     return {
//         ...rest,
//         trailer,
//         isSuccess
//     };
// };

export function useActiveTrailers() {
    const trailersData = useAppSelector(TrailerDataSelectors.getRows);
    const isLoading = useAppSelector(TrailerDataSelectors.getIsLoading);
    const { converter } = useConvertTrailer();

    const trailers = useMemo(
        () =>
            trailersData
                .filter((trailer) => trailer.status !== TrailerModel_Status.DELETED)
                .map(converter),
        [trailersData, converter]
    );

    return { trailers, isLoading };
}
