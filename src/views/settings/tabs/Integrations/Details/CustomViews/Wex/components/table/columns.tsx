import { Columns } from '@/views/settings/components/Table/types';
import { WexTransactionType } from '@proto/integration_provider_wex';
import WevViewTableTransactionCheckbox from '@/views/settings/tabs/Integrations/Details/CustomViews/Wex/components/table/WevViewTableTransactionCheckbox';

export const columns: Columns<WexTransactionType>[] = [
    {
        field     : 'name',
        headerName: 'settings:integrations.details.right_side.wex.table.columns.transaction_name',
        minWidth  : 300,
        align     : 'left',
        renderCell: (row) => row.name
    },
    {
        field     : 'category',
        headerName: 'settings:integrations.details.right_side.wex.table.columns.auto_import',
        minWidth  : 60,
        align     : 'center',
        sx        : { textAlign: 'center' },
        renderCell: (row) => <WevViewTableTransactionCheckbox row={row} />
    }
];
