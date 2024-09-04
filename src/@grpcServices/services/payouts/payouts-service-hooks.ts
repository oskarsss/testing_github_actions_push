import {
    useAppliedFilters,
    useFilteredRows,
    useSelectedFilters
} from '@/@core/components/table/hooks/helpers';
import { $Filter } from '@/@core/components/filters/utils';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useMemo } from 'react';
import TableTypes from '@/@core/components/table/types';
import { PayoutModel } from '@proto/models/model_payout';
import { useStableArray } from '@/hooks/useStable';
import { PayoutStatus } from '@/models/payouts/payout-status';
import { PAYOUT_STATUS_GRPC_ENUM } from '@/models/payouts/payout-mappings';
import PAYOUTS_VIEW_COLUMNS from '@/views/accounting/payouts/Table/components/Table/view-columns';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import useSelectSearchView from '@/hooks/search-params-filters/useSelectSearchView';
import { PageModel_View } from '@proto/models/model_page';
import PayoutsGrpcService from './payouts.service';

const filtersOrder = $Filter.order(PAGES_FILTERS_CONFIG.ACCOUNTING.PAYOUTS.defaultFilters)(
    'driver',
    'payout_status',
    'vendor'
);

const customFilterFunc = $Filter.compareMap({
    driver: (row: PayoutModel, filter: string[]) =>
        !filter.length || (row.entityType === 'driver' && filter.includes(row.entityId)),
    vendor: (row: PayoutModel, filter: string[]) =>
        !filter.length || (row.entityType === 'vendor' && filter.includes(row.entityId)),
    payout_status: (row: PayoutModel, filter: string[]) =>
        filter.length && row.status ? filter.includes(PAYOUT_STATUS_GRPC_ENUM[row.status]) : true
});

export const useFiltersPayouts = () => {
    const { t } = useAppTranslation();
    const {
        page,
        defaultFilters
    } = PAGES_FILTERS_CONFIG.ACCOUNTING.PAYOUTS;

    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, defaultFilters);

    const views: PageModel_View[] = useMemo(
        () => [
            {
                viewId   : 'payouts',
                name     : t('pages:payouts'),
                sequence : 0,
                columns  : PAYOUTS_VIEW_COLUMNS(t),
                rowHeight: 32
            }
        ],
        [t]
    );

    const {
        selectView,
        defaultViewId,
        selectedViewId
    } = useSelectSearchView({
        page,
        defaultFilters,
        views
    });

    return {
        selected_filters,
        filter_id,
        selectView,
        defaultViewId,
        selectedViewId,
        views,
        view: views[0],
        page,
        defaultFilters
    };
};

export const useGetPayoutsQuery = () => {
    const filterHelper = useFiltersPayouts();
    const {
        data,
        ...rest
    } = PayoutsGrpcService.useGetPayoutsQuery({});
    const payoutsList = useStableArray(data?.payouts);

    const statusesCounts = useMemo(
        () =>
            payoutsList.reduce((acc, item) => {
                acc[PAYOUT_STATUS_GRPC_ENUM[item.status]] =
                    (acc[PAYOUT_STATUS_GRPC_ENUM[item.status]] || 0) + 1;
                return acc;
            }, {} as Record<PayoutStatus, number>),
        [payoutsList]
    );

    const entitiesCounts = useMemo(
        () =>
            payoutsList.reduce((acc, item) => {
                acc[item.entityId] = (acc[item.entityId] || 0) + 1;
                return acc;
            }, {} as Record<string, number>),
        [payoutsList]
    );

    const payoutsFormatted = useMemo(
        () =>
            payoutsList.map((item) => ({
                ...item,
                payout_status: PAYOUT_STATUS_GRPC_ENUM[item.status],
                driver_id    : item.entityType === 'driver' ? item.entityId : '',
                vendor_id    : item.entityType === 'vendor' ? item.entityId : ''
            })),
        [payoutsList]
    );

    const dataFilters = useMemo(
        () => [
            {
                filter_id: 'driver',
                counts   : entitiesCounts
            },
            {
                filter_id: 'vendor',
                counts   : entitiesCounts
            },
            {
                filter_id: 'payout_status',
                counts   : statusesCounts
            }
        ],
        [entitiesCounts, statusesCounts]
    );

    const rowsData = useFilteredRows(
        payoutsFormatted,
        filterHelper.selected_filters,
        undefined,
        filtersOrder,
        customFilterFunc
    );

    const rows: TableTypes.Rows<PayoutModel> = useMemo(
        () =>
            rowsData.rows.map((row) => ({
                unique_key: row.payoutId,
                documents : {} as { [key: string]: TableTypes.RowDocument },
                ...row
            })),
        [rowsData.rows]
    );

    const filters = useAppliedFilters(filtersOrder, dataFilters);

    return {
        ...rowsData,
        ...rest,
        ...filterHelper,
        rows,
        filters,
        payoutsList
    };
};

export const useGetPayoutQueryState = () => {};
