import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import Dispatch from '@/store/accounting/dispatchers/types';
import { formatCurrency } from '@/views/accounting/dispatchers/sections/content/stats/utils';
import { NumbersAfterDot } from '@/views/accounting/dispatchers/sections/content/stats/Chart';
import Driver from './custom-cells/Driver';
import Truck from './custom-cells/Truck';
import Trailer from './custom-cells/Trailer';

const minRPM = 1.9;
const minGross = 5000;

const columns: MiniTableColumnType<Dispatch.Truck>[] = [
    {
        headerName: 'entity:driver',
        field     : 'driver',
        minWidth  : 170,
        maxWidth  : 250,
        styles    : {
            width: 250
        },
        flex_start: true,
        renderCell: (row) => <Driver truck={row} />
    },
    {
        headerName: 'entity:truck',
        field     : 'truck',
        minWidth  : 120,
        flex_start: true,
        renderCell: (row) => <Truck truck={row} />
    },
    {
        headerName: 'entity:trailer',
        field     : 'trailer',
        minWidth  : 100,
        flex_start: true,
        renderCell: (row) => <Trailer truck={row} />
    },
    {
        headerName  : 'columns:loaded_miles',
        field       : 'loaded_miles',
        minWidth    : 140,
        flex_start  : false,
        getCellStyle: () => ({
            color: (theme) => `${theme.palette.semantic.text.secondary} !important`
        }),
        renderCell: (row) => `${row.loadedMiles} mi`
    },
    {
        headerName  : 'columns:empty_miles',
        field       : 'empty_miles',
        minWidth    : 140,
        flex_start  : false,
        getCellStyle: () => ({
            color: (theme) => `${theme.palette.semantic.text.secondary} !important`
        }),
        renderCell: (row) => `${row.emptyMiles} mi`
    },
    {
        headerName  : 'columns:rpm',
        field       : 'rpm',
        minWidth    : 140,
        flex_start  : false,
        isAmount    : true,
        getCellStyle: (row) =>
            row.rpm < minRPM
                ? {
                    background: (theme) => theme.palette.utility.foreground.error.secondary,
                    color     : (theme) => `${theme.palette.utility.text.error} !important`
                }
                : {
                    color: (theme) => `${theme.palette.semantic.text.secondary} !important`
                },
        renderCell: (row) => `${formatCurrency(row.rpm, NumbersAfterDot.TWO)}`
    },
    {
        headerName  : 'columns:gross',
        field       : 'gross',
        minWidth    : 150,
        flex_start  : false,
        isAmount    : true,
        getCellStyle: (row) =>
            row.gross < minGross
                ? {
                    background: (theme) => theme.palette.utility.foreground.error.secondary,
                    color     : (theme) => `${theme.palette.utility.text.error} !important`
                }
                : {
                    color: (theme) => `${theme.palette.semantic.text.secondary} !important`
                },
        renderCell: (row) => `${formatCurrency(row.gross, NumbersAfterDot.TWO)}`
    }
];

export default columns;
