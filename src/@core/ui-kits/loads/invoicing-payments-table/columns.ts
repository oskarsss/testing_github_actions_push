import LoadsTypes from '@/store/dispatch/loads/types';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { IntlMessageKey } from '@/@types/next-intl';

const receiver_entity_type_options = (type: string): IntlMessageKey => {
    switch (type) {
    case 'driver':
        return 'state_info:loads.invoicing_payments_type.driver';
    case 'company':
        return 'state_info:loads.invoicing_payments_type.company';
    default:
        return '';
    }
};

const columns: MiniTableColumnType<LoadsTypes.InvoicePaymentItem>[] = [
    {
        headerName  : 'core:basic.load.invoicing_payments_table.header.description',
        minWidth    : 250,
        hasMaxWidth : true,
        flex_start  : true,
        field       : 'description',
        getCellStyle: (row) => ({
            textOverflow: 'ellipsis',
            whiteSpace  : 'nowrap',
            color       : (theme) => `${theme.palette.semantic.text.secondary} !important`
        }),
        onClick: (row, {
            event,
            executeAction
        }) => executeAction('edit_item', { row, event }),
        renderCell: (row) => row.description
    },
    {
        headerName  : 'core:basic.load.invoicing_payments_table.header.rec_type',
        minWidth    : 120,
        flex_start  : true,
        field       : 'receiver_entity_type',
        getCellStyle: (row) => ({
            color: (theme) => `${theme.palette.semantic.text.secondary} !important`
        }),
        onClick: (row, {
            event,
            executeAction
        }) => executeAction('edit_item', { row, event }),
        renderCell: (row, t) => t(receiver_entity_type_options(row.receiverEntityType))
    },
    {
        headerName: 'core:basic.load.invoicing_payments_table.header.amount',
        minWidth  : 120,
        flex_start: false,
        field     : 'amount',
        isAmount  : true,
        styles    : {
            whiteSpace: 'nowrap'
        },
        onClick: (row, {
            event,
            executeAction
        }) => executeAction('edit_item', { row, event }),
        renderCell: (row) => row.amount
    }
];

export default columns;
