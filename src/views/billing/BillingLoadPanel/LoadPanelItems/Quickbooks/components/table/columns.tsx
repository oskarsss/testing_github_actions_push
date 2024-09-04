import { IP_Quickbooks_Invoice_GetReply_QuickbooksInvoice } from '@proto/integration_provider_quickbooks';
import DownloadFileCell from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/components/table/custom-cell/DownloadFileCell';
import EmailCell from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/components/table/custom-cell/EmailCell';
import BalanceCell from '@/views/billing/BillingLoadPanel/LoadPanelItems/Quickbooks/components/table/custom-cell/BalanceCell';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';

const QuickbooksColumns: MiniTableColumnType<IP_Quickbooks_Invoice_GetReply_QuickbooksInvoice>[] = [
    {
        headerName: 'billing:panel.widget.quickbooks.table.header.id',
        minWidth  : 60,
        field     : 'id',
        styles    : { textAlign: 'left' },
        renderCell: (row) => row.quickbooksInvoiceId || '-'
    },
    {
        headerName: 'billing:panel.widget.quickbooks.table.header.email',
        minWidth  : 60,
        styles    : { textAlign: 'center' },
        field     : 'email',
        renderCell: (row) => (
            <EmailCell
                quickbooksInvoiceId={row.quickbooksInvoiceId}
                emailStatus={row.emailStatus}
            />
        )
    },
    {
        headerName: 'billing:panel.widget.quickbooks.table.header.pdf',
        minWidth  : 50,
        styles    : { textAlign: 'center' },
        field     : 'pdf',
        renderCell: (row) => (
            <DownloadFileCell
                file_url={row.invoicePdfPath}
                file_name={row.docNumber}
            />
        )
    },
    {
        headerName: 'billing:panel.widget.quickbooks.table.header.balance',
        minWidth  : 100,
        styles    : { textAlign: 'right' },
        field     : 'balance',
        renderCell: (row) => <BalanceCell balance={row.balance} />
    },
    {
        headerName  : 'billing:panel.widget.quickbooks.table.header.amount',
        minWidth    : 100,
        styles      : { textAlign: 'right' },
        field       : 'amount',
        getCellStyle: () => ({
            color: (theme) => theme.palette.semantic.text.primary
        }),
        renderCell: (row) => row.totalAmount || '-'
    }
];

export default QuickbooksColumns;
