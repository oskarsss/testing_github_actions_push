import type {
    MiniTableClickHandler,
    MiniTableColumnType
} from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import type { CommodityModel } from '@proto/models/model_commodity';
import { COMMODITY_PACKAGE_UNIT } from './config';
import Dimensions from './custom-cell/Dimensions';

const createClick: MiniTableClickHandler<CommodityModel> = (row, {
    event,
    executeAction
}) => {
    executeAction('edit', { row, event });
};

const columns: MiniTableColumnType<CommodityModel>[] = [
    {
        field     : 'commodityName',
        headerName: 'core:basic.load.commodities.header.name',
        minWidth  : 120,
        flex_start: true,
        styles    : {
            whiteSpace: 'nowrap'
        },
        renderCell: (row) => row.description || '-',
        onClick   : createClick
    },

    // {
    //     field     : 'stops',
    //     headerName: 'core:basic.load.commodities.header.stops',
    //     minWidth  : 100,
    //     renderCell: (row) => row.quantity || '-'
    // },
    {
        field     : 'qtv',
        headerName: 'core:basic.load.commodities.header.qtv',
        minWidth  : 60,
        renderCell: (row) => row.quantity || '-',
        flex_start: false,
        onClick   : createClick
    },
    {
        field     : 'type',
        headerName: 'core:basic.load.commodities.header.type',
        minWidth  : 70,
        renderCell: (row, t) =>
            COMMODITY_PACKAGE_UNIT[row.packagingUnit]
                ? t(COMMODITY_PACKAGE_UNIT[row.packagingUnit])
                : '-',
        styles: {
            whiteSpace: 'nowrap'
        },
        flex_start: true,
        onClick   : createClick
    },
    {
        field     : 'dimensions',
        headerName: 'core:basic.load.commodities.header.dimensions',
        minWidth  : 190,
        styles    : {
            whiteSpace: 'nowrap'
        },
        renderCell: (row) => <Dimensions row={row} />,
        flex_start: false,
        onClick   : createClick
    },
    {
        field     : 'weight',
        headerName: 'core:basic.load.commodities.header.weight',
        minWidth  : 140,
        flex_start: false,
        styles    : {
            whiteSpace: 'nowrap'
        },
        renderCell: (row) => row.weightFormatted,
        onClick   : createClick
    }
];

export default columns;
