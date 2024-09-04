import moment from 'moment-timezone';

import { numberWithCommas } from '@/utils/formatting';
import TextCell from './custom-cells/TextCell';
import EquipmentCell from './custom-cells/EquipmentCell';
import AmountCell from './custom-cells/AmountCell';
import AgeCell from './custom-cells/AgeCell';
import FavoriteLoadCell from './custom-cells/FavoriteLoadCell';
import { FormattedLoadboardRow } from './LoadboardTableContainer';

type ColumnsType = {
    minWidth: number;
    headerName: string;
    field: string;
    align: 'center' | 'left' | 'right' | 'justify' | 'char' | undefined;
    sortable: boolean;
    isAmount?: boolean;
    renderCell: (row: FormattedLoadboardRow) => React.ReactNode;
}[];

/*
  Move styles to classes to improve rendering
 */
const columns: ColumnsType = [
    {
        minWidth  : 50,
        headerName: '',
        field     : 'favorite',
        align     : 'left',
        sortable  : true,
        renderCell: (row) => <FavoriteLoadCell resultId={row.resultId} />
    },
    {
        minWidth  : 75,
        headerName: 'Age',
        field     : 'age',
        align     : 'left',
        sortable  : true,
        renderCell: (row) =>
            row.age?.supported ? (
                <AgeCell
                    age={row.age.age}
                    updatedAt={row.age.updatedAt}
                />
            ) : (
                ''
            )
    },
    {
        minWidth  : 115,
        headerName: 'Rate',
        field     : 'rate',
        align     : 'left',
        isAmount  : true,
        sortable  : true,
        renderCell: (row) =>
            row.broker ? <AmountCell amount={`$${numberWithCommas(row.rate?.amount || '')}`} /> : ''
    },
    {
        minWidth  : 100,
        headerName: 'RPM',
        field     : 'rpm',
        align     : 'left',
        sortable  : true,
        isAmount  : true,
        renderCell: (row) => (row.rate?.rpm ? <AmountCell amount={`$${row.rate?.rpm}`} /> : '')
    },
    {
        minWidth  : 150,
        headerName: 'Broker',
        field     : 'broker',
        align     : 'left',
        sortable  : true,
        renderCell: (row) => (
            <TextCell
                text={row.broker?.name.substr(0, 13) || ''}
                sx={{
                    color: ({ palette }) => palette.utility.text.warning
                }}
            />
        )
    },
    {
        minWidth  : 85,
        headerName: 'EQ',
        field     : 'equipment',
        align     : 'left',
        sortable  : true,
        renderCell: (row) => <EquipmentCell code={row.equipment?.equipmentId} />
    },
    {
        align     : 'left',
        minWidth  : 100,
        field     : 'date',
        headerName: 'Date',
        sortable  : false,
        renderCell: (row) => (
            <TextCell
                text={row.origin?.startAt ? moment(row.origin?.startAt).format('MM/DD') : ''}
            />
        )
    },
    {
        minWidth  : 70,
        headerName: 'DH-O',
        field     : 'origin_deadhead',
        align     : 'left',
        sortable  : true,
        renderCell: (row) => <TextCell text={row.origin?.deadhead || ''} />
    },

    {
        minWidth  : 130,
        headerName: 'Origin',
        field     : 'origin',
        align     : 'left',
        sortable  : true,
        renderCell: (row) => (
            <TextCell text={`${row.origin?.city.substr(0, 12)}, ${row.origin?.state}`} />
        )
    },

    {
        minWidth  : 130,
        headerName: 'Miles',
        field     : 'distance',
        align     : 'left',
        sortable  : true,
        renderCell: (row) => <TextCell text={row.distance ? row.distance.miles : ''} />
    },
    {
        minWidth  : 130,
        headerName: 'Destination',
        field     : 'destination',
        align     : 'left',
        sortable  : true,
        renderCell: (row) => (
            <TextCell text={`${row.destination?.city.substr(0, 12)}, ${row.destination?.state}`} />
        )
    },
    {
        minWidth  : 70,
        headerName: 'DH-O',
        field     : 'destination_deadhead',
        align     : 'left',
        sortable  : true,
        renderCell: (row) => <TextCell text={row.destination?.deadhead || ''} />
    }
];

export default columns;
