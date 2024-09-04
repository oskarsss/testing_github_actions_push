import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import type { RoleGetReply_Role } from '@proto/roles';
import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';

const columns: MiniTableColumnType<RoleGetReply_Role>[] = [
    {
        field     : 'name',
        headerName: 'settings:roles.table.columns.name',
        minWidth  : 370,
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
        field     : 'assignedPermissions',
        headerName: 'settings:roles.table.columns.assigned_permissions',
        minWidth  : 370,
        flex_start: true,
        renderCell: (row, t) =>
            `${Object.keys(row.permissions).length} ${t(
                'settings:roles.table.permissions'
            ).toLowerCase()}`,
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field     : 'edit',
        headerName: '',
        minWidth  : 60,
        renderCell: (row) =>
            row.deleted ? <ActionsSettingsTable.Restore /> : <ActionsSettingsTable.Edit />,
        onClick: (row, {
            event,
            executeAction
        }) => {
            executeAction(row.deleted ? 'restore' : 'edit', {
                row,
                event
            });
        }
    }
];

export default columns;
