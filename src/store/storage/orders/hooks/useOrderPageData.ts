import {
    connectFilters,
    filterByDate,
    generatePaginatedIndexMap
} from '@/store/dispatch/manifests/utils/filters';
import { useAppSelector } from '@/store/hooks';
import { FilterModel_Filter } from '@proto/models/model_filter_type';
import { useMemo } from 'react';
import {
    default_loads_filters,
    loads_filter_order
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { mergeFilters } from '@/@core/components/filters/filter-button/filter_helpers';
import { GetLoadsRequest_SortBy } from '@proto/loads';
import { useBrokersMap, useCustomersMap } from '@/store/hash_maps/hooks';
import { selectOrdersDataIndexes } from '../selectors';
import {
    filterByHashMaps,
    filterByLateDropoff,
    filterByLatePickups,
    filterByStatus
} from '../utils/filters';
import { sortByFilter } from '../utils/sort';
import { searchFilter } from '../utils/search';
import { makeStats } from '../utils/stats';
import { useTrucksMap } from '../../trucks/hooks/common';
import { useDriversMap } from '../../drivers/hooks/common';
import { OrdersDataSelectors } from '../slice';

interface Params {
    selectedFilters: typeof default_loads_filters;
}

const useOrdersPageStorage = ({ selectedFilters }: Params) => {
    const indexes = useAppSelector(selectOrdersDataIndexes);
    const rows = useAppSelector(OrdersDataSelectors.getOrdersRows);
    const driversMap = useDriversMap();
    const brokersMap = useBrokersMap();
    const customersMap = useCustomersMap();
    const trucksMap = useTrucksMap();

    const filteredByDate = useMemo(
        () => filterByDate(selectedFilters, indexes.firstStopDate)(indexes.defaultIndexes),
        [selectedFilters, indexes.firstStopDate, indexes.defaultIndexes]
    );
    const {
        filteredIndexes,
        paginatedIndexes,
        dynamicRowsIndexesByDay
    } = useMemo(() => {
        if (!selectedFilters) {
            return {
                paginatedIndexes       : [],
                filteredIndexes        : [],
                dynamicRowsIndexesByDay: {}
            };
        }
        const filteredIndexes = connectFilters(filteredByDate, [
            filterByDate(selectedFilters, indexes.firstStopDate),
            filterByHashMaps(selectedFilters, indexes),
            filterByStatus(selectedFilters.load_status, indexes.loadStatus),
            sortByFilter(selectedFilters, indexes, trucksMap),
            searchFilter(
                selectedFilters.search,
                indexes.rows,
                trucksMap,
                driversMap,
                brokersMap,
                customersMap
            ),
            filterByLatePickups(selectedFilters.late_pickups, indexes),
            filterByLateDropoff(selectedFilters.late_dropoffs, indexes)
        ]);

        const paginatedIndexes = generatePaginatedIndexMap(
            filteredIndexes,
            selectedFilters.page,
            selectedFilters.per_page
        );

        const dynamicRowsIndexesByDay = paginatedIndexes.reduce<Record<string, string[]>>(
            (acc, row) => {
                const rowItem = rows[row];
                const stops = rowItem.manifests?.flatMap((manifest) =>
                    manifest.stops.filter((stop) => stop.loadId === rowItem.loadId));
                const day = stops[0]?.appointmentStartAtLocal?.split(' ')[0];
                if (!day) {
                    return acc;
                }
                if (!acc[day]) {
                    acc[day] = [];
                }
                acc[day].push(rowItem.loadId);
                return acc;
            },
            {}
        );

        return {
            filteredIndexes,
            paginatedIndexes,
            dynamicRowsIndexesByDay
        };
    }, [
        selectedFilters,
        filteredByDate,
        indexes,
        trucksMap,
        driversMap,
        brokersMap,
        customersMap,
        rows
    ]);

    const statsFilters: FilterModel_Filter[] = useMemo(
        () =>
            makeStats({
                indexes,
                filteredIndexes
            }),
        [indexes, filteredIndexes]
    );

    const filters = useMemo(() => mergeFilters(loads_filter_order, statsFilters), [statsFilters]);

    return {
        rows           : paginatedIndexes,
        rowsTotalCounts: filteredIndexes.length,
        filters,
        dynamicRowsIndexesByDay,
        filteredIndexes
    };
};

export default useOrdersPageStorage;
