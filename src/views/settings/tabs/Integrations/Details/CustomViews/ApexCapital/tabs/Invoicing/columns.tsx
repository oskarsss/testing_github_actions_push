import { Columns } from '@/views/settings/components/Table/types';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import { InvoiceTabData } from '@/views/settings/tabs/Integrations/Details/CustomViews/ApexCapital/types';

export const columns: Columns<InvoiceTabData>[] = [
    {
        field     : 'name',
        headerName: 'settings:integrations.details.invoicing.table.columns.name',
        minWidth  : 200,
        align     : 'left',
        renderCell: (row) => row.name
    },
    {
        field     : 'apex_name',
        headerName: 'settings:integrations.details.invoicing.table.columns.apex_name',
        minWidth  : 200,
        align     : 'left',
        renderCell: (row) => row.apex_capital_name
    },
    {
        field     : 'category',
        headerName: '',
        minWidth  : 170,
        align     : 'left',
        renderCell: (row, t) => (
            <IntegrationDetailsComponents.TableConnectButton connected={!!row.apex_capital_id}>
                {row.apex_capital_id
                    ? row.apex_capital_name
                    : t('settings:integrations.details.link')}
            </IntegrationDetailsComponents.TableConnectButton>
        )
    }
];
