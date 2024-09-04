import {
    SwitchFilterFn,
    useAppliedFilters,
    useFilteredRows,
    useSelectedFilters
} from '@/@core/components/table/hooks/helpers';
import { useCallback, useMemo, useRef } from 'react';
import { $Filter } from '@/@core/components/filters/utils';
import { FILTER_SWITCH_KEY } from '@/@core/components/filters/constants';
import {
    useActiveCyclesMap,
    useDriverTypesMap,
    useRevenueTypesMap,
    useTrailersTypesMap,
    useVendorsMap
} from '@/store/hash_maps/hooks';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import CriticalNotificationGrpcService from '@/@grpcServices/services/critical-notifications.service';
import { useStableArray } from '@/hooks/useStable';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { DriverStatuses } from '@/models/fleet/drivers/driver-status';
import { DRIVER_STATUS_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';
import DriverTypesGrpcService from '@/@grpcServices/services/settings-service/driver-types.service';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { PhpFilterTypeMap } from '@/@core/components/filters/types';
import { useTablePageData } from '@/hooks/page-table/useTablePageData';
import { DriverGetReply } from '@proto/drivers';
import { DriverModel_Driver, DriverModel_Status } from '@proto/models/model_driver';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { useAppSelector } from '@/store/hooks';
import { TrucksDataSelectors } from '@/store/storage/trucks/slice';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';
import DriversTypes from './types';

const page = 'drivers';
export const default_drivers_filters = PAGES_FILTERS_CONFIG.FLEET.DRIVERS.defaultFilters;

const driverFilters = $Filter.order(default_drivers_filters)(
    'driver_status',
    'vendor',
    'driver_type',
    'settlement_revenue_type',
    'driver_tags',
    'driver_age',
    'driver_hire_date'
);

const filterIds = [
    PhpFilterTypeMap.DRIVER_STATUS,
    PhpFilterTypeMap.VENDOR,
    PhpFilterTypeMap.DRIVER_TYPE,
    PhpFilterTypeMap.SETTLEMENT_REVENUE_TYPE,
    PhpFilterTypeMap.DRIVER_TAGS
];

const filterValues = [
    'status',
    'vendorId',
    'driverType.driverTypeId',
    'settlementRevenueTypeId',
    'tags.tagId'
];

type DefaultFiltersType = typeof default_drivers_filters;

const compareDrivers = $Filter.compareMap({
    driver_type: (target: DriversTypes.DriverRow, filter: string[]) =>
        !filter.length || filter.includes(target.driverTypeId)
});

const switchFilter: SwitchFilterFn<DriversTypes.ConvertedDriverRow, DefaultFiltersType> = (
    rows,
    selectedFilters
) => {
    if (selectedFilters[FILTER_SWITCH_KEY].uninsured) {
        return rows.filter((row) => !row.insuranceEndorsed);
    }
    return rows;
};

export const useConvertDriver = () => {
    const trucks = useAppSelector(TrucksDataSelectors.getRows);
    const indexes = useAppSelector(TrucksDataSelectors.getIndexes);

    // const trucksMap = truckMapByDriverId

    const trailersMap = useTrailersMap();
    const trailersTypesMap = useTrailersTypesMap();
    const driversTypesMap = useDriverTypesMap();
    const vendorsMap = useVendorsMap();
    const revenueTypesMap = useRevenueTypesMap();
    const cyclesMap = useActiveCyclesMap();
    const nowYear = new Date().getFullYear();

    const converter: (driver: DriverModel_Driver) => DriversTypes.ConvertedDriverRow = useCallback(
        (driver) => {
            const truckIdx = indexes.driverIdToIndexesMap[driver.driverId];
            const truck = trucks?.[truckIdx] || undefined;
            const trailer = trailersMap[truck?.trailerId || ''];
            const trailerType = trailersTypesMap[trailer?.trailerTypeId];
            const revenueType = revenueTypesMap[driver.settlementRevenueTypeId];
            const cycle = cyclesMap[driver.settlementCycleId];
            return {
                ...driver,
                status     : DRIVER_STATUS_GRPC_ENUM[driver.status],
                truck      : truck || null,
                truckId    : truck?.truckId || '',
                trailer    : trailer || null,
                trailerType: trailerType || null,
                driverType : driversTypesMap[driver.driverTypeId] || null,
                vendor     : vendorsMap[driver.vendorId] || null,
                revenueType: revenueType || null,
                cycle      : cycle || null,
                unique_key : driver.driverId,
                full_name  : `${driver.firstName} ${driver.lastName}`,
                last_name  : driver.lastName,
                first_name : driver.firstName,
                driver_id  : driver.friendlyId,
                entityId   : driver.driverId,
                age        : driver.dobDate ? nowYear - new Date(driver.dobDate).getFullYear() : 0,
                entities   : {
                    driver : driver.driverId,
                    truck  : truck?.truckId || '',
                    trailer: truck?.trailerId || ''
                }
            };
        },
        [
            indexes.driverIdToIndexesMap,
            trucks,
            trailersMap,
            trailersTypesMap,
            revenueTypesMap,
            cyclesMap,
            driversTypesMap,
            vendorsMap,
            nowYear
        ]
    );

    return { converter };
};

const useMemoize = (data?: DriverGetReply) => {
    const {
        views,
        headers,
        updateColumnWidth
    } = useTablePageData('DRIVERS');
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_drivers_filters);

    const {
        selectView,
        selectedViewId,
        defaultViewId,
        currentView: view
    } = useSelectSearchView({
        page,
        defaultFilters: default_drivers_filters,
        views
    });

    const { converter } = useConvertDriver();
    const driversList = useMemo(
        () => (data?.drivers ? data.drivers.map(converter) : []),
        [data, converter]
    );

    const filteredDrivers = useMemo(() => {
        // @ts-ignore
        if (!selected_filters.driver_status.includes(DriverStatuses.DELETED)) {
            return driversList.filter((row) => row.status !== DriverStatuses.DELETED);
        }
        return driversList;
    }, [driversList, selected_filters]);

    const rowsData = useFilteredRows<DriversTypes.ConvertedDriverRow>(
        filteredDrivers,
        selected_filters,
        switchFilter,
        undefined,
        compareDrivers
    );

    const dataFilters = $Filter.getFiltersData(filterIds, filterValues);
    const counts = $Filter.calculateCounts(filteredDrivers, dataFilters);
    const filters = useAppliedFilters(driverFilters, counts);

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
        driversList,
        defaultViewId,
        updateColumnWidth
    };
};

export function useMainDrivers() {
    const drivers = useAppSelector(DriversDataSelectors.getRows);
    const isLoading = useAppSelector(DriversDataSelectors.getIsLoading);
    const memoizedData = useMemoize({ drivers });

    return { ...memoizedData, isLoading };
}

export function useDrivers() {
    const isLoading = useAppSelector(DriversDataSelectors.getIsLoading);
    const drivers = useAppSelector(DriversDataSelectors.getRows);

    const memoizedData = useMemoize({ drivers });

    return { ...memoizedData, isLoading };
}

export const useDriversTypes = () => {
    const {
        data,
        isError,
        isLoading,
        isFetching
    } = DriverTypesGrpcService.useGetDriverTypesQuery(
        {}
    );

    const driverTypes = useStableArray(data?.driverTypes);

    return {
        driverTypes,
        isError,
        isLoading,
        isFetching
    };
};

export const useDriverCriticalNotification = (id: string) => {
    const {
        data,
        isError,
        isLoading,
        isFetching
    } =
        CriticalNotificationGrpcService.endpoints.getCriticalNotifications.useQuery(
            { driverId: id },
            {
                pollingInterval: 3000
            }
        );

    const critical_notifications = useStableArray(data?.criticalNotifications);

    return {
        critical_notifications,
        isFetching,
        isError,
        isLoading
    };
};

export const useDriverDevices = (driverId: string | undefined = '') => {
    const stableArray = useRef([]).current;
    const {
        data,
        isError,
        isLoading,
        isSuccess
    } = DriversGrpcService.useGetDriverDevicesQuery(
        { driverId },
        {
            pollingInterval: 10000,
            skip           : !driverId
        }
    );

    const devices = useMemo(() => (data ? data.driverDevice : stableArray), [data, stableArray]);

    return {
        devices,
        isError,
        isLoading,
        isSuccess
    };
};

export const useActiveDrivers = () => {
    const dataDrivers = useAppSelector(DriversDataSelectors.getRows);
    const isLoading = useAppSelector(DriversDataSelectors.getIsLoading);

    const drivers = useMemo(
        () => dataDrivers.filter((driver) => driver.status !== DriverModel_Status.DELETED),
        [dataDrivers]
    );

    return { drivers, isLoading };
};
