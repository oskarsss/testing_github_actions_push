import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import Driver from './custom-cells/Driver';

const columns: MiniTableColumnType<{ driverId: string }>[] = [
    {
        headerName: 'entity:driver',
        field     : 'driver',
        minWidth  : 100,
        flex_start: true,
        renderCell: (row) => <Driver driverId={row.driverId} />
    },
    {
        headerName: 'common:status',
        field     : 'status',
        minWidth  : 100,
        flex_start: true,
        renderCell: (row) => '-'
    },
    {
        headerName: 'common:type',
        field     : 'type',
        minWidth  : 100,
        flex_start: true,
        renderCell: (row) => '-'
    },
    {
        headerName: 'common:amount',
        field     : 'amount',
        minWidth  : 100,
        flex_start: false,
        renderCell: (row) => '-'
    }
];

export default columns;
