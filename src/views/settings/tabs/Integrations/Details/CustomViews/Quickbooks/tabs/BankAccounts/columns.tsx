import { Columns } from '@/views/settings/components/Table/types';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import { BankAccountTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';

export const columns: Columns<BankAccountTabData>[] = [
    {
        field     : 'name',
        headerName: 'settings:integrations.details.right_side.quickbooks.table.columns.bank_name',
        minWidth  : 270,
        align     : 'left',
        renderCell: (row) => row.bankName
    },
    {
        field: 'qb_name',
        headerName:
            'settings:integrations.details.right_side.quickbooks.table.columns.routing_number',
        minWidth  : 200,
        align     : 'left',
        renderCell: (row) => row.routingNumber
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
