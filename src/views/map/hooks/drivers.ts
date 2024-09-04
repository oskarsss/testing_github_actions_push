import { useFilters } from '@/@core/components/filters/filter-button/hooks';
import { useAppliedFilters, useFilteredRows } from '@/@core/components/table/hooks/helpers';
import { $Filter } from '@/@core/components/filters/utils';
import { useConvertDriver } from '@/store/fleet/drivers/hooks';
import { useMemo } from 'react';
import { DriverStatuses } from '@/models/fleet/drivers/driver-status';
import DriversTypes from '@/store/fleet/drivers/types';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { DriverModel_Status } from '@proto/models/model_driver';
import { PhpFilterTypeMap } from '@/@core/components/filters/types';
import { useAppSelector } from '@/store/hooks';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';
import { map_loads_default_filters } from './loads';
import { driver_filter_id } from '../left_panel/components/Filters/DriversFilters';

export const map_drivers_default_filters = PAGES_FILTERS_CONFIG.MAP.DRIVERS.defaultFilters;

const driverFiltersOrder = $Filter.order(map_drivers_default_filters)(
    'driver_status',
    'vendor',
    'driver_type',
    'settlement_revenue_type',
    'driver_tags'
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

const compareDrivers = $Filter.compareMap({
    driver_type: (target: DriversTypes.DriverRow, filter: string[]) =>
        !filter.length || filter.includes(target.driverTypeId)
});

export const useMapDrivers = () => {
    const mapDriversFilters = useFilters(driver_filter_id, map_drivers_default_filters);
    const isLoading = useAppSelector(DriversDataSelectors.getIsLoading);
    const dataDrivers = useAppSelector(DriversDataSelectors.getRows);
    const { converter } = useConvertDriver();

    const activeDrivers = useMemo(() => {
        if (mapDriversFilters.driver_status.includes(DriverStatuses.DELETED)) {
            return dataDrivers.map(converter);
        }
        return dataDrivers
            .filter((driver) => driver.status !== DriverModel_Status.DELETED)
            .map(converter);
    }, [dataDrivers, converter, mapDriversFilters.driver_status]);

    const dataFilters = $Filter.getFiltersData(filterIds, filterValues);
    const counts = $Filter.calculateCounts(activeDrivers, dataFilters);
    const formatted_filters = useAppliedFilters(driverFiltersOrder, counts);

    const { rows: drivers } = useFilteredRows(
        activeDrivers,
        mapDriversFilters,
        undefined,
        driverFiltersOrder,
        compareDrivers
    );

    return {
        drivers,
        filters         : mapDriversFilters,
        availableFilters: formatted_filters,
        isLoading
    };
};

export const useLoadsMapDrivers = () => {
    const mapDriversFilters = useFilters('map_loads', map_loads_default_filters);
    const dataDrivers = useAppSelector(DriversDataSelectors.getRows);
    const isLoading = useAppSelector(DriversDataSelectors.getIsLoading);

    const { converter } = useConvertDriver();

    const activeDrivers = useMemo(
        () =>
            dataDrivers
                .filter((driver) => driver.status !== DriverModel_Status.DELETED)
                .map(converter),
        [dataDrivers, converter]
    );

    const { rows: drivers } = useFilteredRows(
        activeDrivers,
        mapDriversFilters,
        undefined,
        driverFiltersOrder,
        compareDrivers
    );

    return {
        drivers,
        filters: mapDriversFilters,
        isLoading
    };
};
