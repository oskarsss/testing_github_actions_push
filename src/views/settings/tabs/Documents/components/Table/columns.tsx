import Documents from '@/store/documents/types';
import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import common_table_styles from '@/views/settings/common_table_styles';
import SettingsCheckbox from '@/views/settings/components/SettingsCheckbox';

const columns: MiniTableColumnType<Documents.DocumentType>[] = [
    {
        field     : 'title',
        headerName: 'settings:document_types.table.columns.title',
        minWidth  : 240,
        flex_start: true,
        onClick   : (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => row.title
    },
    {
        field      : 'expirable',
        headerName : 'settings:document_types.table.columns.expirable',
        minWidth   : 100,
        hasMaxWidth: true,
        styles     : common_table_styles,
        onClick    : (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => <SettingsCheckbox checked={row.expirable} />
    },
    {
        field      : 'number_supported',
        headerName : 'settings:document_types.table.columns.number_supported',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        onClick    : (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => <SettingsCheckbox checked={row.numberSupported} />
    },
    {
        field      : 'state_supported',
        headerName : 'settings:document_types.table.columns.state_supported',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        onClick    : (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => <SettingsCheckbox checked={row.state?.supported || false} />
    },
    {
        field      : 'required',
        headerName : 'settings:document_types.table.columns.required',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        onClick    : (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => <SettingsCheckbox checked={row.required} />
    },
    {
        field      : 'status_supported',
        headerName : 'settings:document_types.table.columns.status_supported',
        minWidth   : 80,
        hasMaxWidth: true,
        styles     : common_table_styles,
        onClick    : (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => <SettingsCheckbox checked={row.statusSupported} />
    },
    {
        field      : 'can_driver_view',
        headerName : 'settings:document_types.table.columns.can_driver_view',
        minWidth   : 115,
        hasMaxWidth: true,
        styles     : common_table_styles,
        onClick    : (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => <SettingsCheckbox checked={row.canDriverView} />
    },
    {
        field      : 'can_driver_update',
        headerName : 'settings:document_types.table.columns.can_driver_update',
        minWidth   : 120,
        hasMaxWidth: true,
        styles     : common_table_styles,
        onClick    : (row, {
            event,
            executeAction
        }) =>
            executeAction('edit', {
                row,
                event
            }),
        renderCell: (row) => <SettingsCheckbox checked={row.canDriverUpdate} />
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
        }) =>
            executeAction('edit', {
                row,
                event
            })
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
        }) =>
            executeAction('delete', {
                row,
                event
            })
    }
];

export default columns;
