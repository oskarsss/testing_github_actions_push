/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
import SettlementsTypes from '@/store/accounting/settlements/types';
import RecurringTransactionStatusItem from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/RecurringTransaction/RecurringTransactionStatusItem';
import TransactionTypeCell from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/RecurringTransaction/custom-cell/TransactionTypeCell';
import AmountCell from '@/views/accounting/settlements/dialogs/edit-settlement/components/edit-settlement-tables/RecurringTransaction/custom-cell/AmountCell';
import { SettlementRecurringTransactionModel_RecurringTransaction } from '@proto/models/model_settlement.recurring_transaction';
import createMap from '@/utils/create-map';
import TransactionCategoryName from '../Transactions/components/TransactionCategoryName';
import { ColumnsConfig } from '../../../ui-elements/edit-settlement-table/types';

const generateField = (prefix: string) => (field: string) => prefix + field;

const recurring_transactions_fields = generateField('recurring_transactions:');

type RecurringTransaction =
    | SettlementsTypes.CycleSettlementDetails.RecurringTransaction
    | (SettlementRecurringTransactionModel_RecurringTransaction & { chargedAmount: string });

const recurring_transactions_columns: ColumnsConfig<RecurringTransaction> = {
    getItems: (settlement, rt) => {
        const list = settlement?.driverRecurringTransactionsInfo?.recurringTransactions || [];
        if (rt) {
            const rtMap = createMap(rt, 'recurringTransactionId');
            return list?.filter((item) => !rtMap[item.recurringTransactionId]?.deleted) || [];
        }
        return list;
    },
    withAssignRow           : true,
    is_recurring_transaction: true,
    assigned_columns        : (item) => ({
        amount: item.driverRecurringTransactionsInfo?.totalAmount || ''
    }),
    unassigned_columns: (item) => ({
        amount: item.driverRecurringTransactionsInfo?.totalAmount || ''
    }),
    columns: [
        {
            minWidth      : 130,
            headerName    : 'entity:category',
            field         : recurring_transactions_fields('category'),
            withEditButton: true,
            flex_start    : true,
            color         : 'secondary',
            renderCell    : (row) => <TransactionCategoryName id={row.categoryId} />
        },
        {
            minWidth      : 120,
            headerName    : 'common:status',
            field         : recurring_transactions_fields('status'),
            withEditButton: false,
            flex_start    : true,
            onClick       : (row, {
                event,
                executeAction
            }) => executeAction('edit', { row, event }),
            renderCell: (row) => <RecurringTransactionStatusItem status={row.status} />
        },
        {
            withEditButton: false,
            minWidth      : 90,
            headerName    : 'common:type',
            field         : 'type',
            hasMaxWidth   : true,
            renderCell    : (row) => <TransactionTypeCell categoryId={row.categoryId} />
        },
        {
            minWidth      : 150,
            headerName    : 'common:amount',
            flex_start    : false,
            field         : 'amount',
            withEditButton: false,
            hasMaxWidth   : true,
            renderCell    : (row) => (
                <AmountCell
                    amountFormatted={row.amountFormatted}
                    maxTotalAmountFormatted={row.maxTotalAmountFormatted}
                    chargedAmount={row.chargedAmount}
                />
            )
        }
    ]
};

export default recurring_transactions_columns;
