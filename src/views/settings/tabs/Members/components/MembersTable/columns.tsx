import { formatPhoneNumber } from '@/utils/formatting';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import MembersStatusChip from '@/views/settings/tabs/Members/components/MembersTable/custom-cell/MembersStatusChip';
import MembersNameCell from '@/views/settings/tabs/Members/components/MembersTable/custom-cell/MembersNameCell';
import MembersRoleCell from '@/views/settings/tabs/Members/components/MembersTable/custom-cell/MembersRoleCell';
import { FormattedRow } from '@/@grpcServices/services/users-service/hooks';
import SettingsCheckbox from '@/views/settings/components/SettingsCheckbox';

export const columns: MiniTableColumnType<FormattedRow>[] = [
    {
        field      : 'fullName',
        headerName : 'settings:members.table.columns.full_name',
        minWidth   : 230,
        flex_start : true,
        hasMaxWidth: true,
        onClick    : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => <MembersNameCell row={row} />
    },
    {
        field      : 'title',
        headerName : 'settings:members.table.columns.title',
        minWidth   : 130,
        flex_start : true,
        hasMaxWidth: true,
        onClick    : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => `${row.title ? row.title : ''}`
    },
    {
        field      : 'roleId',
        headerName : 'settings:members.table.columns.role_id',
        minWidth   : 105,
        flex_start : true,
        hasMaxWidth: true,
        onClick    : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => <MembersRoleCell role_id={row.roleId} />
    },
    {
        field      : 'email',
        headerName : 'settings:members.table.columns.email',
        minWidth   : 240,
        flex_start : true,
        hasMaxWidth: true,
        onClick    : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => `${row.email}`
    },
    {
        field      : 'phone',
        headerName : 'settings:members.table.columns.phone',
        minWidth   : 160,
        flex_start : true,
        hasMaxWidth: true,
        onClick    : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => formatPhoneNumber(row.phone)
    },
    {
        field      : '2fa',
        headerName : 'settings:members.table.columns.2fa',
        minWidth   : 47,
        flex_start : true,
        hasMaxWidth: true,
        onClick    : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => <SettingsCheckbox checked={row.secondStepAuthEnabled} />
    },
    {
        field      : 'status',
        headerName : 'settings:members.table.columns.status',
        minWidth   : 100,
        flex_start : true,
        hasMaxWidth: true,
        onClick    : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: (row) => <MembersStatusChip status={row.status} />
    }
];
