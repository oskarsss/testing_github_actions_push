import { type MouseEvent, useCallback } from 'react';
import {
    getCategoryIdFromColumnId,
    useRecurringTransactions
} from '@/store/accounting/settlements/hooks/recurring-transactions';
import { useAppDispatch } from '@/store/hooks';
import { updateFilters as _updateFilters } from '@/store/filters/actions';
import Table from '@/@core/components/table/Table';
import SettlementsTypes from '@/store/accounting/settlements/types';
import TableTypes from '@/@core/components/table/types';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { useDriverOptionsMenu } from '@/views/fleet/drivers/menus/DriverOptionsMenu';
import { useTruckOptionsMenu } from '@/views/fleet/trucks/menus/TruckOptionsMenu';
import { useTrailerOptionsMenu } from '@/views/fleet/trailers/menus/TrailerOptionsMenu';
import { useSettlementTransactionCategoriesMap } from '@/store/hash_maps/hooks';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import columns from './columns';
import {
    useAddRecurringTransactionsMenu,
    useCreateRecurringTransactionDialog
} from '../../../menus/RecurringTransactionsMenu/Add/CreateRecurringTrasaction';
import { useEditRecurringTransactionsMenu } from '../../../menus/RecurringTransactionsMenu/Edit/hooks';
import { useDriversRecurringTransactionsOptionsMenu } from '../../../menus/DriversTableOptionsMenu';

type TablePropsType = TableTypes.TableProps<
    SettlementsTypes.RecurringTransactions.ConvertedDriverTransactionRow,
    true
>;

type ExecuteActionProps = {
    event: MouseEvent<HTMLElement>;
    row: SettlementsTypes.RecurringTransactions.ConvertedDriverTransactionRow;
    col?: TableTypes.ViewColumn;
};

export default function DriversTable() {
    const dispatch = useAppDispatch();
    const createRecurringTransactionDialog = useCreateRecurringTransactionDialog();
    const addRecurringTransactionsMenu = useAddRecurringTransactionsMenu();
    const editRecurringTransactionsMenu = useEditRecurringTransactionsMenu();
    const driverDetailsMenu = useDriverOptionsMenu();
    const truckDetailsMenu = useTruckOptionsMenu();
    const trailerDetailsMenu = useTrailerOptionsMenu();
    const settlementTransactionCategoriesMap = useSettlementTransactionCategoriesMap();

    const {
        drivers_filter_id: filter_id,
        selected_drivers_filter,
        isLoading,
        drivers_rows,
        drivers_rows_total,
        drivers_view,
        drivers_totals,
        drivers_headers
    } = useRecurringTransactions();

    const transactionsOptionMenu = useDriversRecurringTransactionsOptionsMenu();

    const {
        page,
        per_page,
        order,
        orderBy
    } = selected_drivers_filter;

    const updateFilters = useCallback(
        (filters: object) => dispatch(_updateFilters(filter_id, filters)),
        []
    );

    const handleCreateTransaction = (categoryType = 'debit' as 'debit' | 'credit') =>
        createRecurringTransactionDialog.open({
            category_id      : '',
            category_type    : categoryType,
            enableChangeType : true,
            setDialogStyled  : true,
            setUpDriverSelect: true
        });

    const executeAction: TablePropsType['executeAction'] = useCallback(
        (name: string, {
            event,
            row,
            col
        }: ExecuteActionProps) => {
            const {
                driverId,
                truckId,
                trailerId,
                truckReferenceId,
                fullName
            } = row;

            if (name === 'recurring_transaction') {
                const transaction = row.transactions[col?.columnId || ''];

                if (transaction?.recurringTransactionId) {
                    editRecurringTransactionsMenu.open({
                        id                   : transaction.recurringTransactionId,
                        category_id          : transaction.categoryId,
                        readOnlyCategoryField: true
                    })(event);

                    return;
                }

                const categoryId = getCategoryIdFromColumnId(col?.columnId || '');
                const categoryType = settlementTransactionCategoriesMap[categoryId]?.type;
                addRecurringTransactionsMenu.open({
                    readOnlyCategoryField: true,
                    category_id          : categoryId,
                    category_type:
                        categoryType === SettlementTransactionCategoryModel_Type.CREDIT
                            ? 'credit'
                            : 'debit',

                    driver: {
                        id  : driverId,
                        name: fullName
                    }
                })(event);

                return;
            }

            if (name === 'driverDetails') {
                driverDetailsMenu.open({ driver_id: driverId, truck_id: truckId })(event);

                return;
            }

            if (name === 'truckDetails' && truckId) {
                truckDetailsMenu.open({
                    truck_id  : truckId,
                    driver_id : driverId,
                    copy_value: truckReferenceId
                })(event);

                return;
            }

            if (name === 'trailerDetails' && trailerId) {
                trailerDetailsMenu.open({
                    trailer_id: trailerId,
                    truck_id  : truckId
                })(event);

                return;
            }

            const columnId = `${col?.columnId}`;

            if (
                name === 'options' &&
                ['total_debit_amount', 'total_credit_amount'].includes(columnId)
            ) {
                handleCreateTransaction(columnId === 'total_debit_amount' ? 'debit' : 'credit');

                return;
            }

            transactionsOptionMenu.open({
                row
            })(event);
        },
        [settlementTransactionCategoriesMap]
    );

    return (
        <Table<SettlementsTypes.RecurringTransactions.ConvertedDriverTransactionRow, true>
            headers={drivers_headers}
            view={drivers_view}
            filter_id={filter_id}
            onCreateItem={() => handleCreateTransaction()}
            tableName="recurring_transactions"
            columns={columns}
            defaultFilters={
                PAGES_FILTERS_CONFIG.ACCOUNTING.RECURRING_TRANSACTIONS.DRIVERS.defaultFilters
            }
            rows={drivers_rows}
            rows_total={drivers_rows_total}
            order={order}
            orderBy={orderBy}
            page={page}
            per_page={per_page}
            executeAction={executeAction}
            updateFilters={updateFilters}
            isLoading={isLoading}
            pagination
            totals={drivers_totals as TableTypes.Totals}
            sticky_background_enabled={false}
        />
    );
}
