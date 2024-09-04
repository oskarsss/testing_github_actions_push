import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { SettlementEntityTransactionHistoryReply_Transaction } from '@proto/settlement_transactions';
import moment from 'moment-timezone';
import TransactionType from './cells/TransactionType';
import TransactionCategory from './cells/TransactionCategory';
import TransactionSettlement from './cells/TransactionSettlement';

function formatDate(inputDate: string | undefined) {
    if (!inputDate) return '';

    return moment(inputDate).format('MM/DD hh:mm A');
}

const columns: MiniTableColumnType<SettlementEntityTransactionHistoryReply_Transaction>[] = [
    {
        minWidth  : 100,
        headerName: 'common:profile.center.transactions_history.table.columns.category',
        field     : 'category',
        flex_start: true,
        styles    : {
            whiteSpace: 'nowrap'
        },
        renderCell: (row) => <TransactionCategory categoryId={row.categoryId} />,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        minWidth   : 100,
        headerName : 'common:profile.center.transactions_history.table.columns.description',
        field      : 'description',
        flex_start : true,
        hasMaxWidth: true,
        renderCell : (row) => row.description,
        onClick    : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        minWidth  : 50,
        headerName: 'common:type',
        field     : 'type',
        flex_start: true,
        renderCell: (row) => (
            <TransactionType
                type={row.type}
                recurringTransactionId={row.recurringTransactionId}
            />
        ),
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        minWidth  : 130,
        headerName: 'common:profile.center.transactions_history.table.columns.date',
        field     : 'date',
        flex_start: true,
        renderCell: (row) => formatDate(row.transactionCreatedAt),
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        minWidth  : 80,
        headerName: 'common:profile.center.transactions_history.table.columns.settlement',
        field     : 'settlement',
        flex_start: true,
        renderCell: (row) => (
            <TransactionSettlement
                friendlyId={row.settlementFriendlyId}
                status={row.settlementStatus}
            />
        ),
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction('edit_settlement', {
                row,
                event
            });
        }
    },
    {
        minWidth  : 50,
        headerName: 'common:amount',
        field     : 'amount',
        flex_start: false,
        styles    : {
            whiteSpace: 'nowrap'
        },
        renderCell: (row) => row.amount,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        }
    }
];

export default columns;
