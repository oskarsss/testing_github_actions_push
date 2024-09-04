import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { GetPeriodReply_Total } from '@proto/ifta';

const IFTA_TOTALS_COLUMNS: MiniTableColumnType<GetPeriodReply_Total>[] = [
    {
        field     : 'country',
        headerName: 'ifta:details.totals.table.columns.country',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.country
    },
    {
        field     : 'state',
        headerName: 'ifta:details.totals.table.columns.state',
        flex_start: true,
        minWidth  : 170,
        renderCell: (row) => row.state
    },
    {
        field     : 'totalDistance',
        headerName: 'ifta:details.totals.table.columns.total_distance',
        flex_start: false,
        minWidth  : 170,
        renderCell: (row) => row.totalDistance
    },
    {
        field     : 'totalFuelQuantity',
        headerName: 'ifta:details.totals.table.columns.total_fuel_quantity',
        flex_start: false,
        minWidth  : 170,
        renderCell: (row) => row.totalFuelQuantity
    }
];

export default IFTA_TOTALS_COLUMNS;
