/* eslint-disable max-len */

import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import { Stack } from '@mui/material';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import common_table_styles from '@/views/settings/common_table_styles';
import SettingsCheckbox from '@/views/settings/components/SettingsCheckbox';
import { DriverTypeModel } from '@proto/models/model_driver_type';

const columns: MiniTableColumnType<DriverTypeModel>[] = [
    {
        field     : 'name',
        headerName: 'settings:driver_types.table.columns.name',
        minWidth  : 120,
        flex_start: true,
        renderCell: (row) => (
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
            >
                {DRIVER_TYPE_ICONS[row.icon]}
                <span>{row.name}</span>
            </Stack>
        ),
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'is_default',
        headerName : 'settings:driver_types.table.columns.is_default',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => <SettingsCheckbox checked={row.isDefault} />,
        onClick    : (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'permission_settlements',
        headerName : 'settings:driver_types.table.columns.permission_settlements',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => (
            <SettingsCheckbox checked={row.permissions?.settlements?.settlements} />
        ),
        onClick: (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'permission_bank_accounts',
        headerName : 'settings:driver_types.table.columns.permission_bank_accounts',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => <SettingsCheckbox checked={row.permissions?.bank?.bankAccounts} />,
        onClick    : (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'permission_completed_loads',
        headerName : 'settings:driver_types.table.columns.permission_completed_loads',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => <SettingsCheckbox checked={row.permissions?.loads?.completedLoads} />,
        onClick    : (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'permission_loads_total_amount',
        headerName : 'settings:driver_types.table.columns.permission_loads_total_amount',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => <SettingsCheckbox checked={row.permissions?.loads?.totalAmount} />,
        onClick    : (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'permission_loads_driver_pay_amount',
        headerName : 'settings:driver_types.table.columns.permission_loads_driver_pay_amount',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => <SettingsCheckbox checked={row.permissions?.loads?.driverPayAmount} />,
        onClick    : (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'permission_loads_distance',
        headerName : 'settings:driver_types.table.columns.permission_loads_distance',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : (row) => <SettingsCheckbox checked={row.permissions?.loads?.distance} />,
        onClick    : (row, {
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
        renderCell : () => <ActionsSettingsTable.Edit />,
        onClick    : (row, {
            executeAction,
            event
        }) => {
            executeAction('edit', { row, event });
        }
    },
    {
        field      : 'delete',
        headerName : '',
        minWidth   : 60,
        hasMaxWidth: true,
        styles     : common_table_styles,
        renderCell : () => <ActionsSettingsTable.Delete />,
        onClick    : (row, {
            executeAction,
            event
        }) => {
            executeAction('delete', { row, event });
        }
    }
];

export default columns;
