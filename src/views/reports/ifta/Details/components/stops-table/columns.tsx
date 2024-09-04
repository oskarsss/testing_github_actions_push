import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { GetPeriodReply_Stop } from '@proto/ifta';

const IFTA_STOPS_COLUMNS: MiniTableColumnType<GetPeriodReply_Stop>[] = [
    {
        field     : 'truckReferenceId',
        headerName: 'ifta:details.stops.table.columns.truck_reference_id',
        flex_start: true,
        minWidth  : 100,
        renderCell: (row) => row.truckReferenceId
    },
    {
        field     : 'fromLoadId',
        headerName: 'ifta:details.stops.table.columns.from_load_id',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.fromLoadId
    },
    {
        field     : 'fromCity',
        headerName: 'ifta:details.stops.table.columns.from_city',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.fromStopCity
    },
    {
        field     : 'fromState',
        headerName: 'ifta:details.stops.table.columns.from_state',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.fromStopState
    },
    {
        field     : 'fromAt',
        headerName: 'ifta:details.stops.table.columns.from_at',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.fromStopAt
    },
    {
        field     : 'endLoadId',
        headerName: 'ifta:details.stops.table.columns.end_load_id',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.endLoadId
    },
    {
        field     : 'endCity',
        headerName: 'ifta:details.stops.table.columns.end_city',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.endStopCity
    },
    {
        field     : 'endState',
        headerName: 'ifta:details.stops.table.columns.end_state',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.endStopState
    },
    {
        field     : 'endAt',
        headerName: 'ifta:details.stops.table.columns.end_at',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.endStopAt
    },
    {
        field     : 'state',
        headerName: 'ifta:details.stops.table.columns.state',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.state
    },
    {
        field     : 'miles',
        headerName: 'ifta:details.stops.table.columns.miles',
        flex_start: false,

        // flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.distance
    }
];

export default IFTA_STOPS_COLUMNS;
