import { Settlements_RevenueType_Item_Type } from '@proto/models/model_settlement';
import { IntlMessageKey } from '@/@types/next-intl';

export default Object.freeze({
    TYPE_ITEMS: {
        per_total_mile             : 'per_total_mile',
        per_loaded_mile            : 'per_loaded_mile',
        per_empty_mile             : 'per_empty_mile',
        percentage_from_load       : 'percentage_from_load',
        percentage_from_company_net: 'percentage_from_company_net',
        flat                       : 'flat',
        hourly                     : 'hourly'
    } as const,
    TYPE_ITEMS_GRPC: {
        [Settlements_RevenueType_Item_Type.PER_TOTAL_MILE]      : 'per_total_mile',
        [Settlements_RevenueType_Item_Type.PER_LOADED_MILE]     : 'per_loaded_mile',
        [Settlements_RevenueType_Item_Type.PER_EMPTY_MILE]      : 'per_empty_mile',
        [Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_LOAD]: 'percentage_from_load',
        [Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_COMPANY_NET]:
            'percentage_from_company_net',
        [Settlements_RevenueType_Item_Type.FLAT]       : 'flat',
        [Settlements_RevenueType_Item_Type.HOURLY]     : 'hourly',
        [Settlements_RevenueType_Item_Type.UNSPECIFIED]: 'per_total_mile'
    } as const
});

type CloseDay = {
    id: number;
    name: IntlMessageKey;
    label: IntlMessageKey;
};

export const CLOSE_DAYS: CloseDay[] = [
    {
        id   : 1,
        name : 'common:days.short.monday',
        label: 'common:days.full.monday'
    },
    {
        id   : 2,
        name : 'common:days.short.tuesday',
        label: 'common:days.full.tuesday'
    },
    {
        id   : 3,
        name : 'common:days.short.wednesday',
        label: 'common:days.full.wednesday'
    },
    {
        id   : 4,
        name : 'common:days.short.thursday',
        label: 'common:days.full.thursday'
    },
    {
        id   : 5,
        name : 'common:days.short.friday',
        label: 'common:days.full.friday'
    },
    {
        id   : 6,
        name : 'common:days.short.saturday',
        label: 'common:days.full.saturday'
    },
    {
        id   : 7,
        name : 'common:days.short.sunday',
        label: 'common:days.full.sunday'
    }
];
