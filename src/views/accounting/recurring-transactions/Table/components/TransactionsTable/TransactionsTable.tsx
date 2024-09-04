import { MouseEvent, useCallback } from 'react';
import { useAppDispatch } from '@/store/hooks';
import { useRecurringTransactions } from '@/store/accounting/settlements/hooks/recurring-transactions';
import { updateFilters as _updateFilters } from '@/store/filters/actions';
import SettlementsTypes from '@/store/accounting/settlements/types';
import TableTypes from '@/@core/components/table/types';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import columns from './columns';
import Table from '../../../../../../@core/components/table/Table';
import { useCreateRecurringTransactionDialog } from '../../../menus/RecurringTransactionsMenu/Add/CreateRecurringTrasaction';
import { useTransactionsRecurringTransactionsOptionsMenu } from '../../../menus/TransactionsTableOptionsMenu';

type TablePropsType = TableTypes.TableProps<
    SettlementsTypes.RecurringTransactions.ConvertedRecurringTransactionRow,
    true
>;

type ExecuteActionProps = {
    row: SettlementsTypes.RecurringTransactions.ConvertedRecurringTransactionRow;
    event: MouseEvent<HTMLElement>;
    col?: TableTypes.ViewColumn;
};

export default function TransactionsTable() {
    const dispatch = useAppDispatch();
    const createRecurringTransactionDialog = useCreateRecurringTransactionDialog();

    const {
        isLoading,
        recurring_transactions_rows,
        recurring_transactions_headers,
        recurring_transactions_rows_total,
        recurring_transactions_view,
        selected_transaction_filter,
        transaction_filter_id,
        rt_totals
    } = useRecurringTransactions();

    const transactionsRecurringTransactionsOptionsMenu =
        useTransactionsRecurringTransactionsOptionsMenu();

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_transaction_filter;

    const updateFilters = useCallback(
        (filters: object) => dispatch(_updateFilters(transaction_filter_id, filters)),
        [transaction_filter_id]
    );

    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name: string, {
            event,
            row,
            col
        }: ExecuteActionProps) => {
            // const id = row[`${col?.column_id.replace('_amount', '_id')}`] as string;
            // if (id) {
            //     editRecurringTransactionsMenu.open({
            // id                   : row.recurring_transaction_id,
            // category_id          : row.category_id,
            // readOnlyCategoryField: true
            //     })(event);
            // } else {
            //     addRecurringTransactionsMenu.open({
            // driver: {
            //     id  : row.driver_id as string,
            //     name: row.driver_name
            // },
            // readOnlyCategoryField: true,
            // category_id          : row.category_id,
            // category_type        : row.category_type as 'debit' | 'credit'
            //     })(event);
            // }
            transactionsRecurringTransactionsOptionsMenu.open({
                row
            })(event);
        },
        []
    );

    const handleClickCreate = () =>
        createRecurringTransactionDialog.open({
            category_id      : '',
            category_type    : 'debit',
            enableChangeType : true,
            setDialogStyled  : true,
            setUpDriverSelect: true
        });

    return (
        <Table<SettlementsTypes.RecurringTransactions.ConvertedRecurringTransactionRow, true>
            rows={recurring_transactions_rows}
            columns={columns}
            view={recurring_transactions_view}
            defaultFilters={
                PAGES_FILTERS_CONFIG.ACCOUNTING.RECURRING_TRANSACTIONS.TRANSACTIONS.defaultFilters
            }
            isLoading={isLoading}
            order={order}
            filter_id={transaction_filter_id}
            onCreateItem={handleClickCreate}
            tableName="recurring_transactions"
            orderBy={orderBy}
            headers={recurring_transactions_headers}
            totals={rt_totals as TableTypes.Totals}
            rows_total={recurring_transactions_rows_total}
            page={page}
            executeAction={executeAction}
            per_page={per_page}
            updateFilters={updateFilters}
            pagination
            sticky_background_enabled={false}
        />
    );
}
