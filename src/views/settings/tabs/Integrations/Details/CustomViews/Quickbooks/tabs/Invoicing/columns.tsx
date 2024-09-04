import { Columns } from '@/views/settings/components/Table/types';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import { InvoiceTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';

export const columns: Columns<InvoiceTabData>[] = [
    {
        field: 'name',
        headerName:
            'settings:integrations.details.right_side.quickbooks.table.columns.category_name',
        minWidth  : 140,
        align     : 'left',
        renderCell: (row) => row.name
    },
    {
        field     : 'qb_name',
        headerName: 'settings:integrations.details.right_side.quickbooks.table.columns.qb_name',
        minWidth  : 140,
        align     : 'left',
        renderCell: (row) => row.quickbooks_name
    },
    {
        field: 'qb_desc',
        headerName:
            'settings:integrations.details.right_side.quickbooks.table.columns.qb_description',
        minWidth  : 200,
        align     : 'left',
        style     : { height: '42px' },
        renderCell: (row) => row.quickbooks_desc
    },
    {
        field     : 'category',
        headerName: '',
        minWidth  : 180,
        align     : 'left',
        renderCell: (row) => (
            <IntegrationDetailsComponents.TableConnectButton connected={!!row.quickbooks_id}>
                {row.quickbooks_id ? row.quickbooks_name : 'Link QuickBooks'}
            </IntegrationDetailsComponents.TableConnectButton>
        )
    }
];
