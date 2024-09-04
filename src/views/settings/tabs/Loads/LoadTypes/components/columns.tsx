import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import LoadsTypes from '@/store/dispatch/loads/types';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import common_table_styles from '@/views/settings/common_table_styles';

const columns: MiniTableColumnType<LoadsTypes.LoadType>[] = [
    {
        field     : 'code',
        headerName: 'settings:loads.load_types.table.columns.code',
        minWidth  : 150,
        flex_start: true,
        renderCell: (row) => row.code,
        onClick   : (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field     : 'name',
        headerName: 'settings:loads.load_types.table.columns.name',
        minWidth  : 500,
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
