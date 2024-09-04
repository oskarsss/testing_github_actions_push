import ActionsSettingsTable from '@/views/settings/components/Table/components/Actions';
import SettlementsTypes from '@/store/accounting/settlements/types';
import { MiniTableColumnType } from '@/@core/ui-kits/basic/mini-table/MiniTable.types';
import CONSTS from '@/views/settings/tabs/Settlements/constants';
import type { TFunction } from '@/@types/next-intl';
import { Settlements_RevenueType_Item_Type } from '@proto/models/model_settlement';

const displayPercent = (percent: number) => `${(percent * 100).toFixed(0)}%`;

const formatRate = (row: SettlementsTypes.RevenueTypes.Item, t: TFunction) => {
    switch (row.type) {
    case Settlements_RevenueType_Item_Type.FLAT:
        return `$${row.amount}`;
    case Settlements_RevenueType_Item_Type.PER_LOADED_MILE:
        return `$${row.amount} / ${t(
            'settings:settlements.revenue_types.type.table.quantity.loaded_mile'
        )}`;
    case Settlements_RevenueType_Item_Type.PER_EMPTY_MILE:
        return `$${row.amount} / ${t(
            'settings:settlements.revenue_types.type.table.quantity.empty_mile'
        )}`;
    case Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_LOAD:
        return `${displayPercent(row.amount)} ${t(
            'settings:settlements.revenue_types.type.table.quantity.from_load'
        )}`;
    case Settlements_RevenueType_Item_Type.PER_TOTAL_MILE:
        return `$${row.amount} / ${t(
            'settings:settlements.revenue_types.type.table.quantity.total_mile'
        )}`;
    case Settlements_RevenueType_Item_Type.HOURLY:
        return `$${row.amount} / ${t(
            'settings:settlements.revenue_types.type.table.quantity.hour'
        )}`;
    case Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_COMPANY_NET:
        return `${displayPercent(row.amount)} ${t(
            'settings:settlements.revenue_types.type.table.quantity.from_company_net'
        )}`;
    default:
        return `$${row.amount}`;
    }
};

const columns: MiniTableColumnType<SettlementsTypes.RevenueTypes.Item>[] = [
    {
        headerName: 'settings:settlements.revenue_types.type.table.columns.pay_item_name',
        field     : 'pay_item_name',
        minWidth  : 270,
        flex_start: true,
        renderCell: (row, t) =>
            t(`settings:settlements.revenue_types.item.types.${CONSTS.TYPE_ITEMS_GRPC[row.type]}`)
    },
    {
        headerName: 'settings:settlements.revenue_types.type.table.columns.rate',
        field     : 'rate',
        minWidth  : 270,
        flex_start: true,
        renderCell: (row, t) => `${formatRate(row, t)}`
    },
    {
        headerName: '',
        field     : 'edit',
        minWidth  : 50,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('edit', {
                row,
                event
            });
        },
        renderCell: () => <ActionsSettingsTable.Edit />
    },
    {
        headerName: '',
        field     : 'delete',
        minWidth  : 50,
        onClick   : (row, {
            event,
            executeAction
        }) => {
            executeAction('delete', {
                row,
                event
            });
        },
        renderCell: () => <ActionsSettingsTable.Delete />
    }
];

export default columns;
