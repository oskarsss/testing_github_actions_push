import { useAppSelector } from '@/store/hooks';
import {
    default_loads_filters,
    loads_filter_order
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { connectFilters, filterByDate } from '@/store/dispatch/manifests/utils/filters';
import { useMemo } from 'react';
import { mergeFilters } from '@/@core/components/filters/filter-button/filter_helpers';
import { BillingStoreKey } from '@/store/billing/slice';
import { useBrokersMap, useCustomersMap } from '@/store/hash_maps/hooks';
import { selectOrdersDataIndexes } from '../selectors';
import {
    filterByHashMaps,
    filterOnlyInvoice,
    generatePaginatedIndexMap,
    filterInvoicesByType
} from '../utils/filters';
import { makeStats } from '../utils/stats';
import { sortByFilter } from '../utils/sort';
import { searchFilter } from '../utils/search';
import { useTrucksMap } from '../../trucks/hooks/common';
import { useDriversMap } from '../../drivers/hooks/common';

interface Params {
    selectedFilters: typeof default_loads_filters;
    invoiceType: BillingStoreKey;
}

const useInvoicesPageData = ({
    selectedFilters,
    invoiceType
}: Params) => {
    const indexes = useAppSelector(selectOrdersDataIndexes);
    const driversMap = useDriversMap();
    const brokersMap = useBrokersMap();
    const customersMap = useCustomersMap();
    const trucksMap = useTrucksMap();
    const isLoading = useAppSelector((state) => state.ordersData.isLoading);
    const {
        filteredIndexes,
        paginatedIndexes,
        filters
    } = useMemo(() => {
        if (!selectedFilters || isLoading) {
            return {
                paginatedIndexes: [],
                filteredIndexes : [],
                filters         : mergeFilters(loads_filter_order, [])
            };
        }
        const filteredIndexes = connectFilters(indexes.defaultIndexes || [], [
            filterInvoicesByType(invoiceType, indexes),
            filterByDate(selectedFilters, indexes.firstStopDate),
            filterByHashMaps(selectedFilters, indexes),
            filterOnlyInvoice(selectedFilters.load_status, indexes.loadStatus),
            sortByFilter(selectedFilters, indexes, trucksMap),
            searchFilter(
                selectedFilters.search,
                indexes.rows,
                trucksMap,
                driversMap,
                brokersMap,
                customersMap
            )
        ]);

        const stats = makeStats({
            indexes,
            filteredIndexes
        });

        const filters = mergeFilters(loads_filter_order, stats);

        const paginatedIndexes = generatePaginatedIndexMap(
            filteredIndexes,
            selectedFilters.page,
            selectedFilters.per_page
        );

        return {
            filteredIndexes,
            paginatedIndexes,
            filters
        };
    }, [
        brokersMap,
        customersMap,
        driversMap,
        indexes,
        invoiceType,
        isLoading,
        selectedFilters,
        trucksMap
    ]);

    return {
        rows           : paginatedIndexes,
        rowsTotalCounts: filteredIndexes.length,
        filters
    };
};

export default useInvoicesPageData;
