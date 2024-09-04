/* eslint-disable react/jsx-props-no-multi-spaces */
import Table from '@/@core/components/table/Table';
import { useGetPayoutsQuery } from '@/@grpcServices/services/payouts/payouts-service-hooks';
import { useSelectedTableIds } from '@/store/table/hooks';
import SendIcon from '@mui/icons-material/Send';
import IosShareIcon from '@mui/icons-material/IosShare';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import columns from './columns';

function PayoutsTable() {
    const {
        filter_id,
        rows,
        rows_total,
        selected_filters,
        isLoading,
        payoutsList,
        page,
        view
    } =
        useGetPayoutsQuery();

    const selectedItemsIds = useSelectedTableIds(page);
    const payoutIdsList = payoutsList.map((item) => item.payoutId);

    return (
        <Table
            executeAction={() => {}}
            updateFilters={() => {}}
            columns={columns}
            filter_id={filter_id}
            rows={rows}
            onCreateItem={() => {}}
            defaultFilters={PAGES_FILTERS_CONFIG.ACCOUNTING.PAYOUTS.defaultFilters}
            headers={[]}
            isLoading={isLoading}
            pagination
            orderBy={selected_filters.orderBy}
            per_page={selected_filters.per_page}
            rows_total={rows_total}
            order={selected_filters.order}
            page={selected_filters.page}
            tableName={page}
            view={view}
            sticky_background_enabled={false}
            tableActionsConfig={{
                totalSelected: selectedItemsIds.length,
                customActions: [
                    {
                        label  : 'common:button.export',
                        action : () => {},
                        tooltip: 'payouts:table.custom_action.export.tooltip',
                        icon   : <IosShareIcon />
                    },
                    {
                        label  : 'common:button.send',
                        action : () => {},
                        tooltip: 'payouts:table.custom_action.send.tooltip',
                        icon   : <SendIcon />
                    }
                ]
            }}
            tableHeaderActionsConfig={{
                tableName: page,
                idsList  : payoutIdsList
            }}
        />
    );
}

export default PayoutsTable;
