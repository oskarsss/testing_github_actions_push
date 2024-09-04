import type { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import getFormattedAmountOfMoney from '@/utils/get-formatted-amount-of-money';
import { ServiceLogItemModel_ItemRead } from '@proto/models/model_service_log_item';
import Warranty from './custom-cell/Warranty';

const columns: MiniTableColumnType<ServiceLogItemModel_ItemRead & { itemTypeName: string }>[] = [
    {
        headerName:
            'maintenance:service_logs.panel.sections.service_items.table.columns.service_item',
        field      : 'service_item',
        minWidth   : 100,
        flex_start : true,
        hasMaxWidth: true,
        styles     : {
            overflow    : 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace  : 'nowrap'
        },
        renderCell: (row) => row.itemTypeName
    },
    {
        headerName: 'common:warranty',
        field     : 'warranty',
        minWidth  : 50,
        flex_start: true,
        renderCell: (row) => <Warranty warrantyCoverage={row.warrantyCoverage} />
    },
    {
        headerName: 'columns:units',
        field     : 'units',
        minWidth  : 60,
        flex_start: false,
        renderCell: (row) => row.quantity
    },
    {
        headerName: 'common:rate',
        field     : 'rate',
        minWidth  : 90,
        flex_start: false,
        renderCell: (row) => getFormattedAmountOfMoney(row.rate)
    },
    {
        headerName: 'common:total',
        field     : 'total',
        minWidth  : 120,
        flex_start: false,
        renderCell: (row) => getFormattedAmountOfMoney(row.amount)
    }
];

export default columns;
