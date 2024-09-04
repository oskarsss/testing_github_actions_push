import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import LoadsTypes from '@/store/dispatch/loads/types';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import common_table_styles from '@/views/settings/common_table_styles';
import SettingsCheckbox from '@/views/settings/components/SettingsCheckbox';

const columns: MiniTableColumnType<LoadsTypes.InvoiceItemCategory>[] = [
    {
        field     : 'title',
        headerName: 'settings:loads.invoice_item_categories.table.columns.title',
        minWidth  : 600,
        flex_start: true,
        renderCell: (row) => row.name,
        onClick   : (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'in_driver_gross',
        headerName : 'settings:loads.invoice_item_categories.table.columns.in_driver_gross',
        minWidth   : 150,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => (
            <SettingsCheckbox
                checked={Boolean(row.includeInGrossAmount)}
                disabled={row.deleted}
            />
        ),
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'required',
        headerName : 'common:required',
        minWidth   : 85,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => (
            <SettingsCheckbox
                checked={Boolean(row.required)}
                disabled={row.deleted}
            />
        ),
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'edit',
        headerName : '',
        minWidth   : 50,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => <ActionsSettingsTable.Edit disabled={row.deleted} />,
        onClick    : (row, {
            event,
            executeAction
        }) => {
            if (row.deleted) return;
            executeAction('edit', {
                row,
                event
            });
        }
    },
    {
        field      : 'delete',
        headerName : '',
        minWidth   : 60,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => {
            if (row.deleted) return <ActionsSettingsTable.Restore />;
            return <ActionsSettingsTable.Delete />;
        },
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction(row.deleted ? 'restore' : 'delete', {
                row,
                event
            });
        }
    }
];

export default columns;
