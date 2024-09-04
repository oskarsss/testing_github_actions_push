import { TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import { getTrailerTypeIcon } from '@/@core/theme/entities/trailer/type';
import { Stack } from '@mui/material';
import common_table_styles from '@/views/settings/common_table_styles';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';

const columns: MiniTableColumnType<TrailerTypesGetReply_TrailerType>[] = [
    {
        field     : 'code',
        headerName: 'settings:trailer_types.table.columns.code',
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
        headerName: 'settings:trailer_types.table.columns.name',
        minWidth  : 500,
        flex_start: true,
        renderCell: (row) => (
            <Stack
                direction="row"
                alignItems="center"
                spacing={2}
            >
                {getTrailerTypeIcon(row.icon)}
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
        renderCell : () => <ActionsSettingsTable.Edit />,
        onClick    : (row, {
            event,
            executeAction
        }) => {
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
        renderCell : () => <ActionsSettingsTable.Delete />,
        onClick    : (row, {
            event,
            executeAction
        }) => {
            executeAction('delete', {
                row,
                event
            });
        }
    }
];

export default columns;
