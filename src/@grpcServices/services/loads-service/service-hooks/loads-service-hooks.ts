import { CSSProperties, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { LOADS_STORAGE_CONSTANTS } from '@/store/dispatch/loads/slice';
import { useSelectedFilters } from '@/@core/components/table/hooks/helpers';
import { IntlMessageKey } from '@/@types/next-intl';
import { LoadData_Load } from '@proto/loads';
import useOrdersPageStorage from '@/store/storage/orders/hooks/useOrderPageData';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import { useLoadsFilters } from './utils/useLoadsFilters';
import { default_loads_filters } from '../service-utils/loads-default-models';

export type LoadsTableTotals = {
    totalInvoiceAmountFormatted: string;
    totalGrossAmountFormatted: string;
    totalDriverNetFormatted: string;
    averageRatePerMileFormatted: string;
    totalLoadedMiles: number;
    totalEmptyMiles: number;
};

export namespace LoadTable {
    export type onClickType = (type: string, row: number, event: React.SyntheticEvent) => void;

    export type ColumnLoad = {
        header_name: IntlMessageKey;
        field_name?: string;
        style?: CSSProperties;
        headerStyle?: CSSProperties;
        sortable?: boolean;
        renderCell: (
            row: LoadData_Load,
            isSelectedRow: boolean,
            handleClick?: (row: number) => void
        ) => React.ReactNode;
        renderTotalCell?: (total: LoadsTableTotals) => React.ReactNode;
    };
}

export const useOrdersPageFilters = () => {
    const views = useAppSelector((state) => state.loads.views);
    const data = useLoadsFilters(
        LOADS_STORAGE_CONSTANTS.PAGE,
        views,
        LOADS_STORAGE_CONSTANTS.SELECTED_VIEW
    );
    const updateFilters = useUpdateFilters({ filter_id: data.filter_id });
    return { ...data, views, updateFilters };
};

export const useOrdersPageData = () => {
    const { selected_filters } = useOrdersPageFilters();

    const data = useOrdersPageStorage({ selectedFilters: selected_filters });

    return data;
};

export type FilterType = 'driver' | 'truck';
export type PageType = 'driver' | 'truck' | 'trailer';
type FleetLoadsQueryType = {
    filterType: FilterType;
    entityId: string;
    page: PageType;
};

export const useFleetLoadsQuery = ({
    filterType,
    entityId,
    page
}: FleetLoadsQueryType) => {
    const isLoading = useAppSelector((state) => state.ordersData.isLoading);
    const ordersRows = useAppSelector((state) => state.ordersData.rows);
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, default_loads_filters);

    const entityIdMap = {
        driver: filterType === 'driver' ? [entityId] : [],
        truck : filterType === 'truck' ? [entityId] : []
    };

    const {
        filters,
        rows,
        rowsTotalCounts
    } = useOrdersPageStorage({
        selectedFilters: {
            id                 : 'default',
            order              : 'asc',
            orderBy            : '',
            broker             : [],
            user               : [],
            driver             : entityIdMap.driver,
            end_at             : '',
            gps_inactive       : false,
            load_invoice_status: [],
            page               : selected_filters.page,
            per_page           : selected_filters.per_page,
            start_at           : '',
            load_status        : [],
            truck              : entityIdMap.truck,
            late_pickups       : false,
            late_dropoffs      : false,
            search             : '',
            sortBy             : 1
        }
    });

    const orders = useMemo(
        () => rows.map((idx) => ordersRows[idx], [ordersRows, rows]),
        [ordersRows, rows]
    );

    return {
        filter_id,
        selected_filters,
        filters,
        rows,
        rowsTotalCounts,
        orders,
        isLoading
    };
};
