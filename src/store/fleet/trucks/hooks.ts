import {
    useAppliedFilters,
    useFilteredRows,
    useSelectedFilters
} from '@/@core/components/table/hooks/helpers';
import TrucksTypes from '@/store/fleet/trucks/types';
import { $Filter } from '@/@core/components/filters/utils';
import {
    useDriverTypesMap,
    usePlatesMap,
    useTrailersTypesMap,
    useVendorsMap
} from '@/store/hash_maps/hooks';
import { useCallback, useMemo } from 'react';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { PhpFilterTypeMap } from '@/@core/components/filters/types';
import { useTablePageData } from '@/hooks/page-table/useTablePageData';
import { TruckGetReply } from '@proto/trucks';
import { TruckModel_Status, TruckModel_Truck } from '@proto/models/model_truck';
import {
    TRUCK_STATUS_TO_LOCALE,
    TRUCK_TYPE_TO_GRPC_REVERSE_ENUM
} from '@/models/fleet/trucks/trucks-mappings';
import { TrailerStatuses } from '@/models/fleet/trailers/trailer-status';
import { useAppSelector } from '@/store/hooks';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

const page = 'trucks';

export const default_trucks_filters = PAGES_FILTERS_CONFIG.FLEET.TRUCKS.defaultFilters;

const filtersOrder = $Filter.order(default_trucks_filters)(
    'truck_status',
    'truck_type',
    'trailer_type',
    'vendor',
    'truck_users',
    'truck_tags',
    'truck_year'
);

const filterIds = [
    PhpFilterTypeMap.TRUCK_STATUS,
    PhpFilterTypeMap.TRUCK_TYPE,
    PhpFilterTypeMap.TRAILER_TYPE,
    PhpFilterTypeMap.VENDOR,
    PhpFilterTypeMap.TRUCK_USERS,
    PhpFilterTypeMap.TRUCK_TAGS
];

const filterValues = [
    'status',
    'type',
    'trailerType.trailerTypeId',
    'vendorId',
    'users.userId',
    'tags.tagId'
];

const compareTrucks = $Filter.compareMap({
    trailer_type: (target: TrucksTypes.ConvertedTruckRow, filter: string[]) =>
        !filter.length || filter.includes(target.trailerType?.trailerTypeId || '')
});

export const useTrucksConverter = () => {
    const trailersMap = useTrailersMap();
    const driversMap = useDriversMap();
    const driverTypesMap = useDriverTypesMap();
    const trailerTypesMap = useTrailersTypesMap();
    const platesMap = usePlatesMap();
    const vendorsMap = useVendorsMap();

    const converter: (truck: TruckModel_Truck) => TrucksTypes.ConvertedTruckRow = useCallback(
        (truck) => {
            const trailer = trailersMap[truck.trailerId];
            const trailerType = trailerTypesMap[trailer?.trailerTypeId];
            const primaryDriverId = truck.drivers.find((driver) => driver.primary)?.driverId || '';
            const secondDriverId = truck.drivers.find((driver) => !driver.primary)?.driverId || '';

            const driver = driversMap[primaryDriverId];
            const driverType = driverTypesMap[driver?.driverTypeId];

            const secondDriver = driversMap[secondDriverId];
            const secondDriverType = driverTypesMap[secondDriver?.driverTypeId];

            return {
                ...truck,
                status          : TRUCK_STATUS_TO_LOCALE[truck.status],
                type            : TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type],
                toll_transponder: truck.tollTransponder,
                trailer         : trailer || null,
                trailerType     : trailerType || null,
                driver          : driver || null,
                driverType      : driverType || null,
                plate           : platesMap[truck.plateId] || null,
                secondDriver    : secondDriver || null,
                secondDriverType: secondDriverType || null,
                vendor          : vendorsMap[truck.vendorId] || null,
                entityId        : truck.truckId,
                reference_id    : truck.referenceId,
                truck           : `${truck.year || ''} ${truck.make || ''} ${truck.model || ''}`,
                unique_key      : truck.truckId,
                entities        : {
                    truck  : truck.truckId,
                    driver : primaryDriverId,
                    trailer: truck.trailerId
                }
            };
        },
        [trailersMap, trailerTypesMap, driversMap, driverTypesMap, platesMap, vendorsMap]
    );

    return { converter };
};

const useMemoize = (data?: TruckGetReply) => {
    const {
        views,
        headers,
        isLoading,
        updateColumnWidth
    } = useTablePageData('TRUCKS');

    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_trucks_filters);

    const { converter } = useTrucksConverter();

    const convertedTrucks = useMemo(
        () => (data?.trucks ? data?.trucks.map(converter) : []),
        [data?.trucks, converter]
    );

    const filteredTrucks = useMemo(() => {
        // @ts-ignore
        if (!selected_filters.truck_status.includes(TrailerStatuses.DELETED)) {
            return convertedTrucks.filter((row) => row.status !== TrailerStatuses.DELETED);
        }
        return convertedTrucks;
    }, [selected_filters, convertedTrucks]);

    const rowsData = useFilteredRows(
        filteredTrucks,
        selected_filters,
        undefined,
        filtersOrder,
        compareTrucks
    );

    const {
        selectView,
        defaultViewId,
        selectedViewId,
        currentView: view
    } = useSelectSearchView({
        page,
        defaultFilters: default_trucks_filters,
        views
    });

    const dataFilters = $Filter.getFiltersData(filterIds, filterValues);
    const counts = $Filter.calculateCounts(filteredTrucks, dataFilters);
    const filters = useAppliedFilters(filtersOrder, counts);

    return {
        isTableDataLoading: isLoading,
        views,
        headers,
        ...rowsData,
        filters,
        selected_filters,
        view,
        filter_id,
        selected_view_id  : selectedViewId,
        selectView,
        updateColumnWidth,
        defaultViewId
    };
};

export function useMainTrucks(isPollingInterval = true) {
    const trucks = useAppSelector(TrucksDataSelectors.getRows);
    const isLoading = useAppSelector(TrucksDataSelectors.getIsLoading);

    const memoizedData = useMemoize({ trucks });

    return {
        ...memoizedData,
        isLoading: memoizedData.isTableDataLoading || isLoading
    };
}

export function useTrucks() {
    const isLoading = useAppSelector(TrucksDataSelectors.getIsLoading);
    const trucks = useAppSelector(TrucksDataSelectors.getRows);

    const memoizedData = useMemoize({ trucks });

    return { ...memoizedData, isLoading };
}

export const useActiveTrucks = () => {
    const trucksList = useAppSelector(TrucksDataSelectors.getRows);
    const isLoading = useAppSelector(TrucksDataSelectors.getIsLoading);

    const trucks = useMemo(
        () => trucksList.filter((truck) => truck.status !== TruckModel_Status.deleted),
        [trucksList]
    );

    return { trucks, isLoading };
};

export const useActiveConvertTrucks = (options?: RTKRequestOptions) => {
    const data = useActiveTrucks();
    const { converter } = useTrucksConverter();
    const trucks = useMemo(() => data.trucks.map(converter), [data.trucks, converter]);

    return { ...data, trucks };
};
