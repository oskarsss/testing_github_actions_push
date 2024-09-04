import { Settlements_RevenueType_Item_Type } from '@proto/models/model_settlement';

export type RevenueTypeLocale =
    | 'per_total_mile'
    | 'per_loaded_mile'
    | 'per_empty_mile'
    | 'percentage_from_load'
    | 'percentage_from_company_net'
    | 'flat'
    | 'hourly'
    | '';

export const REVENUE_TYPE_TO_GRPC: Record<RevenueTypeLocale, Settlements_RevenueType_Item_Type> = {
    per_total_mile             : Settlements_RevenueType_Item_Type.PER_TOTAL_MILE,
    per_loaded_mile            : Settlements_RevenueType_Item_Type.PER_LOADED_MILE,
    per_empty_mile             : Settlements_RevenueType_Item_Type.PER_EMPTY_MILE,
    percentage_from_load       : Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_LOAD,
    percentage_from_company_net: Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_COMPANY_NET,
    flat                       : Settlements_RevenueType_Item_Type.FLAT,
    hourly                     : Settlements_RevenueType_Item_Type.HOURLY,
    ''                         : Settlements_RevenueType_Item_Type.UNSPECIFIED
};

export const REVENUE_TYPE_GRPC: Record<Settlements_RevenueType_Item_Type, RevenueTypeLocale> = {
    [Settlements_RevenueType_Item_Type.PER_TOTAL_MILE]             : 'per_total_mile',
    [Settlements_RevenueType_Item_Type.PER_LOADED_MILE]            : 'per_loaded_mile',
    [Settlements_RevenueType_Item_Type.PER_EMPTY_MILE]             : 'per_empty_mile',
    [Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_LOAD]       : 'percentage_from_load',
    [Settlements_RevenueType_Item_Type.PERCENTAGE_FROM_COMPANY_NET]: 'percentage_from_company_net',
    [Settlements_RevenueType_Item_Type.FLAT]                       : 'flat',
    [Settlements_RevenueType_Item_Type.HOURLY]                     : 'hourly',
    [Settlements_RevenueType_Item_Type.UNSPECIFIED]                : ''
};
