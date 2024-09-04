import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { LoadDraftFields_InvoiceItem } from '@proto/load_drafts';
import DeleteItemButton from '../components/EditableTable/DeleteItemButton';
import InvoicePayItemSelect from './cells/InvoicePayItemSelect';
import InvoiceUnitsInput from './cells/InvoiceItemUnitsInput';
import InvoiceRateInput from './cells/InvoiceItemRateInput';
import InvoiceItemTotal from './cells/InvoiceItemTotal';

const columns: MiniTableColumnType<LoadDraftFields_InvoiceItem>[] = [
    {
        headerName: 'new_loads:draft.form.invoicing.header.labels.pay_item',
        field     : 'pay_item',
        minWidth  : 200,
        flex_start: true,
        renderCell: (row) => <InvoicePayItemSelect invoiceItemId={row.invoiceItemId} />
    },
    {
        headerName : 'new_loads:draft.form.invoicing.header.labels.units',
        field      : 'units',
        minWidth   : 90,
        hasMaxWidth: true,
        flex_start : false,
        renderCell : (row) => <InvoiceUnitsInput invoiceItemId={row.invoiceItemId} />
    },
    {
        headerName : 'new_loads:draft.form.invoicing.header.labels.rate',
        field      : 'rate',
        minWidth   : 90,
        flex_start : false,
        hasMaxWidth: true,
        renderCell : (row) => <InvoiceRateInput invoiceItemId={row.invoiceItemId} />
    },
    {
        headerName: 'common:total',
        field     : 'total_amount',
        minWidth  : 120,
        flex_start: false,
        renderCell: (row) => <InvoiceItemTotal invoiceItemId={row.invoiceItemId} />
    },
    {
        headerName : '',
        field      : 'delete',
        minWidth   : 50,
        hasMaxWidth: true,
        onClick    : (row, {
            event,
            executeAction
        }) => {
            executeAction('delete', {
                row,
                event
            });
        },
        renderCell: () => <DeleteItemButton />
    }
];

export default columns;
