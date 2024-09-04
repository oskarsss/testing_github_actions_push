import { useAppliedFilters, useFilteredRows } from '@/@core/components/table/hooks/helpers';
import { useStableArray } from '@/hooks/useStable';
import { useAppSelector } from '@/store/hooks';
import { useTrucksManifestsStream } from '@/store/streams/loads';
import moment from 'moment-timezone';
import { useMemo } from 'react';
import { useLocalStorage } from 'usehooks-ts';
import { PIN_TRUCKS_STORAGE_KEY, truckSorting } from '@/store/dispatch/scheduling/hooks';
import { useFilters } from '@/@core/components/filters/filter-button/hooks';
import { $Filter } from '@/@core/components/filters/utils';
import { GetTrucksLoadsReply_Truck } from '@proto/trucks';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';

export const default_map_trucks_filters = PAGES_FILTERS_CONFIG.MAP.TRUCKS.defaultFilters;

const filtersOrder = $Filter.order(default_map_trucks_filters)(
    'truck_status',
    'truck_type',
    'load_status',
    'trailer_type',
    'user',
    'truck_tags'
);

const compareTrucks = $Filter.compareMap({
    load_status: (target: GetTrucksLoadsReply_Truck, filter: string[]) =>
        !filter.length || filter.some((status) => target.loadStatuses.includes(status)),
    truck_type: (target: GetTrucksLoadsReply_Truck, filter: string[]) =>
        !filter.length || filter.includes(target.type),
    trailer_type: (target: GetTrucksLoadsReply_Truck, filter: string[]) =>
        !filter.length || filter.includes(target.trailerTypeId),
    user: (target: GetTrucksLoadsReply_Truck, filter: string[]) =>
        !filter.length || target.users.some((userId) => filter.includes(userId))
});

export const useMapTrucks = (only_with_drivers = false) => {
    const [pinTrucks] = useLocalStorage<string[]>(PIN_TRUCKS_STORAGE_KEY, []);
    const selected_load_id = useAppSelector((state) => state.map.selected.load_id);

    const data = useTrucksManifestsStream({
        from_date: moment().startOf('day').format('YYYY-MM-DD HH:mm:ss'),
        end_date : moment().endOf('day').format('YYYY-MM-DD HH:mm:ss'),
        only_with_drivers
    });
    const selected_filters = useFilters('map_trucks', default_map_trucks_filters);
    const filters = useMemo(
        () =>
            selected_load_id
                ? default_map_trucks_filters
                : { ...default_map_trucks_filters, ...selected_filters },
        [selected_filters, selected_load_id]
    );

    const trucksFull = useStableArray(data?.trucks);
    const availableFilters = useAppliedFilters(filtersOrder, data?.filters);

    const { rows } = useFilteredRows(trucksFull, filters, undefined, filtersOrder, compareTrucks);

    const trucks = useMemo(
        () => [...rows].sort((a, b) => truckSorting(a, b, pinTrucks)),
        [rows, pinTrucks]
    );

    return {
        trucks,
        filters,
        availableFilters,
        isLoading: data.isLoading
    };
};
