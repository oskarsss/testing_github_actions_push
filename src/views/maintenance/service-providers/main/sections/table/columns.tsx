import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { ServiceProviderModel_ServiceProvider } from '@proto/models/model_service_provider';
import VectorIcons from '@/@core/icons/vector_icons';
import { IconButton } from '@mui/material';
import { formatPhoneNumber } from '@/utils/formatting';

const columns: MiniTableColumnType<ServiceProviderModel_ServiceProvider>[] = [
    {
        headerName: 'maintenance:service_providers.table.columns.name',
        field     : 'name',
        minWidth  : 100,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => row.name
    },
    {
        headerName: 'maintenance:service_providers.table.columns.city_state',
        field     : 'city_state',
        minWidth  : 100,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) =>
            `${row.addressCity && `${row.addressCity}, `}${row.addressState && row.addressState}`
    },
    {
        headerName: 'maintenance:service_providers.table.columns.fax',
        field     : 'fax',
        minWidth  : 100,
        flex_start: true,
        styles    : {
            whiteSpace: 'nowrap'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => (row.fax ? formatPhoneNumber(row.fax) : '-')
    },
    {
        headerName: 'maintenance:service_providers.table.columns.zip',
        field     : 'zip',
        minWidth  : 100,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => row.addressPostalCode
    },
    {
        headerName: 'maintenance:service_providers.table.columns.total_services',
        field     : 'total_services',
        minWidth  : 110,
        flex_start: false,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: () => ''
    },
    {
        headerName: 'maintenance:service_providers.table.columns.total_cost',
        field     : 'total_cost',
        minWidth  : 100,
        flex_start: false,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: () => ''
    },
    {
        headerName: 'maintenance:service_providers.table.columns.added_date',
        field     : 'added_date',
        minWidth  : 100,
        flex_start: true,
        styles    : {
            whiteSpace: 'nowrap'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => row.createdAt
    },
    {
        headerName : '',
        field      : 'edit',
        minWidth   : 50,
        hasMaxWidth: true,
        flex_start : true,
        onClick    : (row, {
            executeAction,
            event
        }) => executeAction('edit', { row, event }),
        renderCell: () => (
            <IconButton>
                <VectorIcons.EditIcon
                    sx={{
                        fontSize: 16,
                        path    : {
                            fill: (theme) => theme.palette.semantic.foreground.primary
                        }
                    }}
                />
            </IconButton>
        )
    }
];

export default columns;
