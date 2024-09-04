import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { ServiceLogModel_ServiceLogRead } from '@proto/models/model_service_log';
import { IconButton } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import moment from 'moment-timezone';
import Equipment from '@/@core/components/service-log-equipment';
import Driver from './custom-cell/Driver';
import TypeChip from '../../../ui-elements/TypeChip';
import ServiceProvider from './custom-cell/ServiceProvider';
import Files from './custom-cell/Files';

const columns: MiniTableColumnType<ServiceLogModel_ServiceLogRead>[] = [
    {
        headerName: 'common:id',
        field     : 'id',
        minWidth  : 50,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => row.friendlyId
    },
    {
        headerName : 'maintenance:service_logs.table.columns.order_number',
        field      : 'order_number',
        minWidth   : 140,
        flex_start : true,
        hasMaxWidth: true,
        styles     : {
            overflow    : 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace  : 'nowrap'
        },
        onClick: (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => row.orderNumber
    },
    {
        headerName: 'common:equipment',
        field     : 'equipment',
        minWidth  : 150,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => (
            <Equipment
                vehicleType={row.vehicleType}
                truckId={row.truckId}
                trailerId={row.trailerId}
            />
        )
    },
    {
        headerName: 'entity:driver',
        field     : 'driver',
        minWidth  : 130,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => <Driver driverId={row.driverId} />
    },
    {
        headerName: 'common:type',
        field     : 'type',
        minWidth  : 100,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => <TypeChip type={row.type} />
    },
    {
        headerName: 'maintenance:service_logs.table.columns.completed_date',
        field     : 'completed_date',
        minWidth  : 110,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => (row.endDate ? moment(row.endDate).format('MM/DD/YYYY') : '-')
    },
    {
        headerName: 'common:provider',
        field     : 'provider',
        minWidth  : 100,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        styles: {
            whiteSpace: 'nowrap'
        },
        renderCell: (row) => <ServiceProvider serviceProviderId={row.serviceProviderId} />
    },
    {
        headerName: 'maintenance:service_logs.common.engine_hours',
        field     : 'engine_hours',
        minWidth  : 100,
        flex_start: false,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => row.engineHours
    },
    {
        headerName: 'maintenance:service_logs.common.odometer',
        field     : 'odometer',
        minWidth  : 100,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row, t) =>
            row.odometerMiles
                ? `${row.odometerMiles.toLocaleString('en-US')} ${t('common:mi')}`
                : '-'
    },
    {
        headerName: 'common:last_service',
        field     : 'last_service',
        minWidth  : 100,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => ''
    },
    {
        headerName: 'maintenance:service_logs.table.columns.total_amount',
        field     : 'total_amount',
        minWidth  : 100,
        flex_start: false,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) =>
            row.totalAmount.toLocaleString('en-US', {
                style                : 'currency',
                currency             : 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            })
    },
    {
        headerName: 'maintenance:service_logs.common.solved_defects',
        field     : 'solved_defects',
        minWidth  : 110,
        flex_start: false,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => ''
    },
    {
        headerName: 'maintenance:service_logs.table.columns.files',
        field     : 'files',
        minWidth  : 50,
        flex_start: true,
        onClick   : (row, {
            executeAction,
            event
        }) => executeAction('open_panel', { row, event }),
        renderCell: (row) => <Files serviceLogId={row.serviceLogId} />
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
    },
    {
        headerName : '',
        field      : 'delete',
        minWidth   : 50,
        hasMaxWidth: true,
        flex_start : true,
        onClick    : (row, {
            executeAction,
            event
        }) => executeAction('delete', { row, event }),
        renderCell: () => (
            <IconButton>
                <VectorIcons.TrashIcon
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
