import { Columns } from '@/views/settings/components/Table/types';
import IntegrationDetailsComponents from '@/views/settings/tabs/Integrations/Details/components/IntegrationDetailsComponents';
import {
    SettlementRevenueTabData,
    SettlementTabData
} from '@/views/settings/tabs/Integrations/Details/CustomViews/Quickbooks/types';
import { TRANSACTION_CATEGORY_ENTITY } from '@/models/settlements/settlements-mappings';

export const columns: Columns<SettlementTabData>[] = [
    {
        field: 'name',
        headerName:
            'settings:integrations.details.right_side.quickbooks.table.columns.category_name',
        minWidth  : 270,
        align     : 'left',
        renderCell: (row) => row.name
    },
    {
        field     : 'entity',
        headerName: 'settings:integrations.details.right_side.quickbooks.table.columns.entity_type',
        minWidth  : 120,
        align     : 'left',
        renderCell: (row) => TRANSACTION_CATEGORY_ENTITY[row.entityType] ?? ''
    },
    {
        field     : 'category',
        headerName: '',
        minWidth  : 170,
        align     : 'left',
        renderCell: (row) => (
            <IntegrationDetailsComponents.TableConnectButton connected={!!row.quickbooks_id}>
                {row.quickbooks_id ? row.quickbooks_name : 'Link QuickBooks'}
            </IntegrationDetailsComponents.TableConnectButton>
        )
    }
];

export const revenueColumns: Columns<SettlementRevenueTabData>[] = [
    {
        field: 'name',
        headerName:
            'settings:integrations.details.right_side.quickbooks.table.columns.revenue_type_name',
        minWidth  : 170,
        align     : 'left',
        renderCell: (row) => row.name
    },
    {
        field     : 'linkedToTotalLoadsAmount',
        headerName: 'common:gross',
        minWidth  : 150,
        align     : 'left',
        renderCell: (row) => (
            <IntegrationDetailsComponents.TableConnectButton
                connected={!!row.linkedToTotalLoadsAmount?.quickbooks_id}
            >
                {row.linkedToTotalLoadsAmount?.quickbooks_id
                    ? row.linkedToTotalLoadsAmount.quickbooks_name
                    : 'Link QuickBooks'}
            </IntegrationDetailsComponents.TableConnectButton>
        )
    },
    {
        field     : 'linkedToFuelAmount',
        headerName: 'entity:fuel',
        minWidth  : 150,
        align     : 'left',
        renderCell: (row) => (
            <IntegrationDetailsComponents.TableConnectButton
                connected={!!row.linkedToFuelAmount?.quickbooks_id}
            >
                {row.linkedToFuelAmount?.quickbooks_id
                    ? row.linkedToFuelAmount.quickbooks_name
                    : 'Link QuickBooks'}
            </IntegrationDetailsComponents.TableConnectButton>
        )
    },
    {
        field     : 'linkedToTollsAmount',
        headerName: 'entity:tolls',
        minWidth  : 150,
        align     : 'left',
        renderCell: (row) => (
            <IntegrationDetailsComponents.TableConnectButton
                connected={!!row.linkedToTollsAmount?.quickbooks_id}
            >
                {row.linkedToTollsAmount?.quickbooks_id
                    ? row.linkedToTollsAmount.quickbooks_name
                    : 'Link QuickBooks'}
            </IntegrationDetailsComponents.TableConnectButton>
        )
    }
];
