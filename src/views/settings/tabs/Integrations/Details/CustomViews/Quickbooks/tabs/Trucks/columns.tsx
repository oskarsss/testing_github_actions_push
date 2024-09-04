import { Columns } from '@/views/settings/components/Table/types';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import { TruckTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';

export const columns: Columns<TruckTabData>[] = [
    {
        field     : 'unitNumber',
        headerName: 'settings:integrations.details.right_side.quickbooks.table.columns.unit_number',
        minWidth  : 70,
        align     : 'left',
        renderCell: (row) => row.referenceId || '-'
    },
    {
        field     : 'make',
        headerName: 'common:make',
        minWidth  : 120,
        align     : 'left',
        renderCell: (row) => row.make || '-'
    },
    {
        field     : 'model',
        headerName: 'common:model',
        minWidth  : 120,
        align     : 'left',
        renderCell: (row) => row.model || '-'
    },
    {
        field     : 'year',
        headerName: 'common:year',
        minWidth  : 70,
        align     : 'left',
        renderCell: (row) => row.year || '-'
    },
    {
        field: 'entity',
        headerName:
            'settings:integrations.details.right_side.quickbooks.table.columns.fully_qb_name',
        minWidth  : 200,
        align     : 'left',
        renderCell: (row) => row.fullyQualifiedName
    },
    {
        field     : 'category',
        headerName: '',
        minWidth  : 150,
        align     : 'left',
        renderCell: (row) => (
            <IntegrationDetailsComponents.TableConnectButton connected={!!row.quickbooksId}>
                {row.quickbooksId ? row.quickbooksName : 'Link QuickBooks'}
            </IntegrationDetailsComponents.TableConnectButton>
        )
    }
];
