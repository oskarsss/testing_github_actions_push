/* eslint-disable max-len */
import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';
import { useConvertedLoads } from '@/store/dispatch/loads/hooks';
import { useFilters } from '@/@core/components/filters/filter-button/hooks';
import { useAppliedFilters } from '@/@core/components/table/hooks/helpers';
import { $Filter } from '@/@core/components/filters/utils';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import useOrdersPageStorage from '@/store/storage/orders/hooks/useOrderPageData';

const pageId = 'map_loads';

export const map_loads_default_filters = PAGES_FILTERS_CONFIG.MAP.LOADS.defaultFilters;

const filtersOrder = $Filter.order(map_loads_default_filters)(
    'load_status',
    'load_invoice_status',
    'user',
    'broker',
    'driver',
    'truck'
);

export const useMapLoads = () => {
    const selected_truck_id = useAppSelector((state) => state.map.selected.truck_id);
    const ordersRows = useAppSelector((state) => state.ordersData.rows);
    const isLoading = useAppSelector((state) => state.ordersData.isLoading);
    const selected_filters = useFilters(pageId, map_loads_default_filters);

    const mapLoadsFilters = useMemo(
        () =>
            selected_truck_id
                ? map_loads_default_filters
                : { ...map_loads_default_filters, ...selected_filters },
        [selected_filters, selected_truck_id]
    );

    const {
        filters,
        rows,
        rowsTotalCounts
    } = useOrdersPageStorage({
        selectedFilters: {
            broker             : selected_filters.broker,
            user               : selected_filters.user,
            driver             : selected_filters.driver,
            end_at             : selected_filters.end_at,
            gps_inactive       : selected_filters.gps_inactive,
            load_invoice_status: selected_filters.load_invoice_status,
            page               : selected_filters.page,
            per_page           : selected_filters.per_page,
            start_at           : selected_filters.start_at,
            load_status        : selected_filters.load_status,
            late_pickups       : selected_filters.late_pickups,
            truck              : selected_filters.truck,
            late_dropoffs      : selected_filters.late_dropoffs,
            search             : selected_filters.search,
            sortBy             : selected_filters.sortBy,
            id                 : 'default',
            order              : 'asc',
            orderBy            : ''
        }
    });

    const orders = useMemo(
        () => rows.map((idx) => ordersRows[idx], [ordersRows, rows]),
        [ordersRows, rows]
    );

    const loads = useConvertedLoads(orders);
    const availableFilters = useAppliedFilters(filtersOrder, filters);

    return {
        loads,
        isLoading,
        filters: mapLoadsFilters,
        selected_filters,
        availableFilters
    };
};
