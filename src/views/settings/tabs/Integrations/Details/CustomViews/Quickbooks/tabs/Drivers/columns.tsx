import { Columns } from '@/views/settings/components/Table/types';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import { DriverTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';

export const columns: Columns<DriverTabData>[] = [
    {
        field     : 'name',
        headerName: 'settings:integrations.details.right_side.quickbooks.table.columns.driver_name',
        minWidth  : 270,
        align     : 'left',
        renderCell: (row) => `${row.firstName} ${row.lastName || ''}`
    },
    {
        field: 'qb_name',
        headerName:
            'settings:integrations.details.right_side.quickbooks.table.columns.qb_company_name',
        minWidth  : 200,
        align     : 'left',
        renderCell: (row) => row.quickbooks_company_name
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
