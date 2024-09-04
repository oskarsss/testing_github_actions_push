import SettlementsTypes from '@/store/accounting/settlements/types';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import moment from 'moment-timezone';

const columns: MiniTableColumnType<SettlementsTypes.RecurringTransactions.Transaction>[] = [
    {
        headerName  : 'modals:recurring_transactions.table.columns.settlement',
        field       : 'settlement',
        minWidth    : 100,
        flex_start  : true,
        getCellStyle: (row) => ({
            color: (theme) => theme.palette.semantic.text.secondary
        }),
        onClick: (row, {
            event,
            executeAction
        }) => executeAction('edit_item', { row, event }),
        renderCell: (row) => row.settlementFriendlyId
    },
    {
        headerName  : 'modals:recurring_transactions.table.columns.date',
        field       : 'date',
        minWidth    : 150,
        flex_start  : true,
        getCellStyle: () => ({
            color: (theme) => theme.palette.semantic.text.secondary
        }),
        onClick: (row, {
            event,
            executeAction
        }) =>
            executeAction('edit_item', {
                row,
                event
            }),
        renderCell: (row) => {
            const periodStartDatetime = moment(row.periodStartDatetime).format('MM/DD/YYYY');
            const periodEndDatetime = moment(row.periodEndDatetime).format('MM/DD/YYYY');
            return `${periodStartDatetime} → ${periodEndDatetime}`;
        }
    },
    {
        headerName  : 'modals:recurring_transactions.table.columns.amount',
        field       : 'amount',
        minWidth    : 100,
        flex_start  : false,
        color       : 'semantic.text.secondary !important',
        getCellStyle: (row) => ({
            color: (theme) => theme.palette.semantic.text.secondary
        }),
        onClick: (row, {
            event,
            executeAction
        }) => executeAction('edit_item', { row, event }),
        renderCell: (row) => row.amountFormatted
    },
    {
        headerName  : 'modals:recurring_transactions.table.columns.total',
        field       : 'total',
        minWidth    : 100,
        flex_start  : false,
        getCellStyle: (row) => ({
            color: (theme) => theme.palette.semantic.text.secondary
        }),
        onClick: (row, {
            event,
            executeAction
        }) => executeAction('edit_item', { row, event }),
        renderCell: (row) => row.totalAmountFormatted
    }
];

export default columns;
