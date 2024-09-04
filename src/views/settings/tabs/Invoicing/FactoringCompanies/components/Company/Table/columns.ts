import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import { StatsWithId } from './Table';

const period = 'settings:factoring_companies.company.table.period';

const columns: MiniTableColumnType<StatsWithId>[] = [
    {
        field     : 'period',
        headerName: 'settings:factoring_companies.company.table.columns.period',
        minWidth  : 100,
        flex_start: true,
        renderCell: (row, t) => t(period)
    },
    {
        field     : 'loads',
        headerName: 'settings:factoring_companies.company.table.columns.loads',
        minWidth  : 100,
        flex_start: true,
        renderCell: (row) => row.count
    },
    {
        field     : 'gross',
        headerName: 'settings:factoring_companies.company.table.columns.gross',
        minWidth  : 100,
        flex_start: false,
        isAmount  : true,
        color     : '#095A38',
        renderCell: (row) => row.brokerAmountFormatted
    },
    {
        field     : 'factoring',
        headerName: 'settings:factoring_companies.company.table.columns.factoring',
        minWidth  : 100,
        flex_start: false,
        isAmount  : true,
        color     : '#5C1017',
        renderCell: (row) => row.factoringFeeFormatted
    },
    {
        field     : 'pending',
        headerName: 'settings:factoring_companies.company.table.columns.pending',
        minWidth  : 100,
        flex_start: false,
        isAmount  : true,
        color     : '#BC8700',
        renderCell: (row) => row.pendingFormatted
    },
    {
        field     : 'received',
        headerName: 'settings:factoring_companies.company.table.columns.received',
        minWidth  : 100,
        flex_start: false,
        isAmount  : true,
        renderCell: (row) => row.paidFormatted
    }
];

export default columns;
