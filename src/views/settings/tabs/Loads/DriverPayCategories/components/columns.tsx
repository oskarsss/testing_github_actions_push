import React from 'react';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import LoadsTypes from '@/store/dispatch/loads/types';
import { Stack } from '@mui/material';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import common_table_styles from '@/views/settings/common_table_styles';

const columns: MiniTableColumnType<LoadsTypes.DriverPayItemCategory>[] = [
    {
        field     : 'title',
        headerName: 'settings:loads.driver_pay_categories.table.columns.title',
        minWidth  : 650,
        flex_start: true,
        renderCell: (row) => (
            <Stack
                direction="row"
                justifyContent="space-between"
                spacing={1}
            >
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
            if (row.deleted) {
                return <ActionsSettingsTable.Restore />;
            }
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
