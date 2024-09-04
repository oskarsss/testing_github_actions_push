/* eslint-disable max-len */
import objectEntries from '@/utils/objectEntries';
import { FilterModel_FilterID as FilterTypeID } from 'proto/ts/v1/models/model_filter_type';
import EntityFilters from './filter-button/types';

export type FilterConfigMap<T> = Partial<Record<FilterTypeID, T>>;

export const PhpFilterTypeMap = {
    USER               : 'user',
    STATUS             : 'status',
    TYPE               : 'type',
    TEXT               : 'text',
    TRUCK_TYPE         : 'truck_type',
    DRIVER_TYPE        : 'driver_type',
    DRIVER             : 'driver',
    TRUCK              : 'truck',
    TRUCK_STATUS       : 'truck_status',
    TRAILER_TYPE       : 'trailer_type',
    VENDOR_TYPE        : 'vendor_type',
    BROKER             : 'broker',
    VENDOR             : 'vendor',
    CUSTOMER           : 'customer',
    LOAD_INVOICE_STATUS: 'load_invoice_status',
    LOAD_STATUS        : 'load_status',
    TRUCK_TAGS         : 'truck_tags',
    TRUCK_USERS        : 'truck_users',
    TRAILER_TAGS       : 'trailer_tags',
    DRIVER_TAGS        : 'driver_tags',
    DRIVER_STATUS      : 'driver_status',
    TRAILER            : 'trailer',
    TRAILER_COMPANY    : 'trailer_company',

    TRAILER_STATUS                : 'trailer_status',
    LOAD_FIRST_STOP_APT_DATE_START: 'stop_first_date',
    LOAD_LAST_STOP_APT_DATE_START : 'stop_end_date',

    USER_STATUS  : 'user_status',
    VENDOR_STATUS: 'vendor_status',

    PLATE_STATUS      : 'plate_status',
    PLATE_VEHICLE_TYPE: 'plate_vehicle_type',
    PLATE_COMPANY     : 'plate_company',

    SETTLEMENT_STATUS                : 'settlement_status',
    SETTLEMENT_DRIVER_PAY_AMOUNT_TYPE: 'settlement_driver_pay_amount_type',
    SETTLEMENT_REVENUE_TYPE          : 'settlement_revenue_type',

    FUEL_TRANSACTION_VERIFIED: 'fuel_transaction_verified',
    TRAILER_OWNERSHIP_TYPE   : 'trailer_ownership_type',

    TOLLS_SETTLEMENT_STATUS    : 'toll_settlement_status',
    FUEL_SETTLEMENT_STATUS     : 'fuel_settlement_status',
    FILTER_BROKER_CREATED_AT   : 'broker_created_at',
    FILTER_CUSTOMER_CREATED_AT : 'customer_created_at',
    FILTER_PAYOUT_STATUS       : 'payout_status',
    FILTER_SERVICE_LOG_TYPE    : 'service_log_type',
    FILTER_SERVICE_LOG_PROVIDER: 'service_log_provider'
} as const;

export const PhpFilterTypeToPbMap: Record<string, FilterTypeID> = {
    unspecified                   : FilterTypeID.FILTER_UNSPECIFIED,
    [PhpFilterTypeMap.USER]       : FilterTypeID.FILTER_USER,
    [PhpFilterTypeMap.USER_STATUS]: FilterTypeID.FILTER_USER_STATUS,
    [PhpFilterTypeMap.LOAD_FIRST_STOP_APT_DATE_START]:
        FilterTypeID.FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_START,
    [PhpFilterTypeMap.LOAD_LAST_STOP_APT_DATE_START]:
        FilterTypeID.FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_END,

    // add for new filters
    [PhpFilterTypeMap.FILTER_SERVICE_LOG_TYPE]    : FilterTypeID.FILTER_SERVICE_LOG_TYPE,
    [PhpFilterTypeMap.FILTER_SERVICE_LOG_PROVIDER]: FilterTypeID.FILTER_SERVICE_LOG_PROVIDER,

    [PhpFilterTypeMap.FILTER_PAYOUT_STATUS]: FilterTypeID.FILTER_PAYOUT_STATUS,

    [PhpFilterTypeMap.LOAD_STATUS]        : FilterTypeID.FILTER_LOAD_STATUS,
    [PhpFilterTypeMap.LOAD_INVOICE_STATUS]: FilterTypeID.FILTER_LOAD_INVOICE_STATUS,

    [PhpFilterTypeMap.TRUCK]       : FilterTypeID.FILTER_TRUCK,
    [PhpFilterTypeMap.TRUCK_STATUS]: FilterTypeID.FILTER_TRUCK_STATUS,
    [PhpFilterTypeMap.TRUCK_TYPE]  : FilterTypeID.FILTER_TRUCK_TYPE,
    [PhpFilterTypeMap.TRUCK_TAGS]  : FilterTypeID.FILTER_TRUCK_TAGS,
    [PhpFilterTypeMap.TRUCK_USERS] : FilterTypeID.FILTER_TRUCK_USERS,

    [PhpFilterTypeMap.TRAILER]               : FilterTypeID.FILTER_TRAILER,
    [PhpFilterTypeMap.TRAILER_STATUS]        : FilterTypeID.FILTER_TRAILER_STATUS,
    [PhpFilterTypeMap.TRAILER_TYPE]          : FilterTypeID.FILTER_TRAILER_TYPE,
    [PhpFilterTypeMap.TRAILER_OWNERSHIP_TYPE]: FilterTypeID.FILTER_TRAILER_OWNERSHIP_TYPE,
    [PhpFilterTypeMap.TRAILER_TAGS]          : FilterTypeID.FILTER_TRAILER_TAGS,

    [PhpFilterTypeMap.PLATE_STATUS]      : FilterTypeID.FILTER_PLATE_STATUS,
    [PhpFilterTypeMap.PLATE_VEHICLE_TYPE]: FilterTypeID.FILTER_PLATE_VEHICLE_TYPE,
    [PhpFilterTypeMap.PLATE_COMPANY]     : FilterTypeID.FILTER_PLATE_COMPANY,

    [PhpFilterTypeMap.TRAILER_COMPANY]: FilterTypeID.FILTER_TRAILER_COMPANY,

    [PhpFilterTypeMap.DRIVER]       : FilterTypeID.FILTER_DRIVER,
    [PhpFilterTypeMap.DRIVER_STATUS]: FilterTypeID.FILTER_DRIVER_STATUS,
    [PhpFilterTypeMap.DRIVER_TYPE]  : FilterTypeID.FILTER_DRIVER_TYPE,
    [PhpFilterTypeMap.DRIVER_TAGS]  : FilterTypeID.FILTER_DRIVER_TAGS,

    [PhpFilterTypeMap.VENDOR]       : FilterTypeID.FILTER_VENDOR,
    [PhpFilterTypeMap.VENDOR_STATUS]: FilterTypeID.FILTER_VENDOR_STATUS,
    [PhpFilterTypeMap.VENDOR_TYPE]  : FilterTypeID.FILTER_VENDOR_TYPE,

    [PhpFilterTypeMap.SETTLEMENT_STATUS]: FilterTypeID.FILTER_SETTLEMENT_STATUS,
    [PhpFilterTypeMap.SETTLEMENT_DRIVER_PAY_AMOUNT_TYPE]:
        FilterTypeID.FILTER_SETTLEMENT_DRIVER_PAY_AMOUNT_TYPE,
    [PhpFilterTypeMap.SETTLEMENT_REVENUE_TYPE]: FilterTypeID.FILTER_SETTLEMENT_REVENUE_TYPE,

    [PhpFilterTypeMap.BROKER]  : FilterTypeID.FILTER_BROKER,
    [PhpFilterTypeMap.CUSTOMER]: FilterTypeID.FILTER_CUSTOMER,

    [PhpFilterTypeMap.FUEL_TRANSACTION_VERIFIED] : FilterTypeID.FILTER_FUEL_TRANSACTION_VERIFIED,
    [PhpFilterTypeMap.TOLLS_SETTLEMENT_STATUS]   : FilterTypeID.FILTER_TOLL_SETTLEMENT_STATUS,
    [PhpFilterTypeMap.FUEL_SETTLEMENT_STATUS]    : FilterTypeID.FILTER_FUEL_SETTLEMENT_STATUS,
    [PhpFilterTypeMap.FILTER_BROKER_CREATED_AT]  : FilterTypeID.FILTER_BROKER_CREATED_AT,
    [PhpFilterTypeMap.FILTER_CUSTOMER_CREATED_AT]: FilterTypeID.FILTER_CUSTOMER_CREATED_AT
};

type filterTypeConfig = {
    column_key: string;
    column_data_type?: 'date' | 'year' | 'tags' | 'users';

    //     // trans_key: string;

    // add more !IF! needed
};

export const PbFilterTypeConfigMap: Record<FilterTypeID, filterTypeConfig> = {
    [FilterTypeID.FILTER_PAYOUT_STATUS]: {
        column_key: 'payout_status'
    },
    [FilterTypeID.FILTER_SERVICE_LOG_PROVIDER]: {
        column_key: 'service_log_provider'
    },
    [FilterTypeID.FILTER_SERVICE_LOG_TYPE]: {
        column_key: 'service_log_type'
    },
    [FilterTypeID.FILTER_UNSPECIFIED]: {
        column_key: 'na'
    },
    [FilterTypeID.FILTER_BROKER_CREATED_AT]: {
        column_data_type: 'date',
        column_key      : 'created_at'
    },
    [FilterTypeID.FILTER_CUSTOMER_CREATED_AT]: {
        column_data_type: 'date',
        column_key      : 'created_at'
    },
    [FilterTypeID.FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_END]: {
        column_data_type: 'date',
        column_key      : ''
    },
    [FilterTypeID.FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_START]: {
        column_data_type: 'date',
        column_key      : ''
    },
    [FilterTypeID.FILTER_USER]: {
        column_key: 'user_id'
    },
    [FilterTypeID.FILTER_USER_STATUS]: {
        column_key: 'status'
    },

    [FilterTypeID.FILTER_LOAD_STATUS]: {
        column_key: 'status'
    },
    [FilterTypeID.FILTER_LOAD_INVOICE_STATUS]: {
        column_key: 'invoice_status'
    },

    [FilterTypeID.FILTER_TRUCK_STATUS]: {
        column_key: 'status'
    },
    [FilterTypeID.FILTER_TRUCK_TYPE]: {
        column_key: 'type'
    },
    [FilterTypeID.FILTER_TRUCK_TAGS]: {
        column_key      : 'tags',
        column_data_type: 'tags'
    },
    [FilterTypeID.FILTER_TRUCK_USERS]: {
        column_key      : 'users',
        column_data_type: 'users'
    },

    [FilterTypeID.FILTER_TRAILER_STATUS]: {
        column_key: 'status'
    },
    [FilterTypeID.FILTER_TRAILER_TYPE]: {
        column_key: 'trailerTypeId'
    },
    [FilterTypeID.FILTER_TRAILER_OWNERSHIP_TYPE]: {
        column_key: 'ownershipType'
    },
    [FilterTypeID.FILTER_TRAILER_TAGS]: {
        column_key      : 'tags',
        column_data_type: 'tags'
    },

    [FilterTypeID.FILTER_PLATE_STATUS]: {
        column_key: 'status'
    },
    [FilterTypeID.FILTER_PLATE_VEHICLE_TYPE]: {
        column_key: 'vehicle_type'
    },
    [FilterTypeID.FILTER_PLATE_COMPANY]: {
        column_key: 'plateCompanyId'
    },

    [FilterTypeID.FILTER_TRAILER_COMPANY]: {
        column_key: 'trailerCompanyId'
    },

    [FilterTypeID.FILTER_DRIVER_STATUS]: {
        column_key: 'status'
    },
    [FilterTypeID.FILTER_DRIVER_TYPE]: {
        column_key: 'type_id'
    },
    [FilterTypeID.FILTER_DRIVER_TAGS]: {
        column_key      : 'tags',
        column_data_type: 'tags'
    },
    [FilterTypeID.FILTER_DRIVER_AGE]: {
        column_key      : 'age',
        column_data_type: 'year'
    },
    [FilterTypeID.FILTER_DRIVER_HIRE_DATE]: {
        column_key      : 'hire_date',
        column_data_type: 'date'
    },

    [FilterTypeID.FILTER_VENDOR]: {
        column_key: 'vendorId'
    },
    [FilterTypeID.FILTER_VENDOR_STATUS]: {
        column_key: 'status'
    },
    [FilterTypeID.FILTER_VENDOR_TYPE]: {
        column_key: 'type'
    },

    [FilterTypeID.FILTER_SETTLEMENT_STATUS]: {
        column_key: 'status'
    },
    [FilterTypeID.FILTER_SETTLEMENT_DRIVER_PAY_AMOUNT_TYPE]: {
        column_key: 'settlement_driver_pay_amount_type'
    },
    [FilterTypeID.FILTER_SETTLEMENT_REVENUE_TYPE]: {
        column_key: 'settlement_revenue_type_id'
    },

    [FilterTypeID.FILTER_BROKER]: {
        column_key: 'broker_id'
    },
    [FilterTypeID.FILTER_CUSTOMER]: {
        column_key: 'customer_id'
    },

    [FilterTypeID.FILTER_FUEL_TRANSACTION_VERIFIED]: {
        column_key: 'verified'
    },
    [FilterTypeID.FILTER_TRUCK_YEAR]: {
        column_key      : 'year',
        column_data_type: 'year'
    },
    [FilterTypeID.FILTER_TRAILER_YEAR]: {
        column_key      : 'year',
        column_data_type: 'year'
    },
    [FilterTypeID.FILTER_DRIVER]: {
        column_key: 'driver_id'
    },
    [FilterTypeID.FILTER_TRUCK]: {
        column_key: 'truck_id'
    },
    [FilterTypeID.FILTER_TRAILER]: {
        column_key: 'trailer_id'
    },
    [FilterTypeID.FILTER_PLATE]: {
        column_key: 'plate_id'
    },

    [FilterTypeID.FILTER_TOLL_SETTLEMENT_STATUS]: {
        column_key: 'settlement_status'
    },
    [FilterTypeID.FILTER_FUEL_SETTLEMENT_STATUS]: {
        column_key: 'settlement_status'
    },
    [FilterTypeID.FILTER_MANIFEST_STATUS]: {
        column_key: 'status'
    }
};

export { FilterTypeID };

// export const FilterNameMap: Record<FilterTypeID, string> = {
//     [FilterTypeID.FILTER_UNSPECIFIED]                      : 'Unspecified',
//     [FilterTypeID.FILTER_USER]                             : 'User',
//     [FilterTypeID.FILTER_USER_STATUS]                      : 'User Status',
//     [FilterTypeID.FILTER_LOAD_STATUS]                      : 'Load Status',
//     [FilterTypeID.FILTER_LOAD_INVOICE_STATUS]              : 'Load Invoice Status',
//     [FilterTypeID.FILTER_TRUCK_STATUS]                     : 'Truck Status',
//     [FilterTypeID.FILTER_TRUCK_TYPE]                       : 'Truck Type',
//     [FilterTypeID.FILTER_TRUCK_TAGS]                       : 'Truck Tags',
//     [FilterTypeID.FILTER_TRAILER_STATUS]                   : 'Trailer Status',
//     [FilterTypeID.FILTER_TRAILER_TYPE]                     : 'Trailer Type',
//     [FilterTypeID.FILTER_TRAILER_OWNERSHIP_TYPE]           : 'Trailer Ownership Type',
//     [FilterTypeID.FILTER_TRAILER_TAGS]                     : 'Trailer Tags',
//     [FilterTypeID.FILTER_PLATE_STATUS]                     : 'Plate Status',
//     [FilterTypeID.FILTER_PLATE_VEHICLE_TYPE]               : 'Plate Vehicle Type',
//     [FilterTypeID.FILTER_PLATE_COMPANY]                    : 'Plate Company',
//     [FilterTypeID.FILTER_TRAILER_COMPANY]                  : 'Trailer Company',
//     [FilterTypeID.FILTER_DRIVER_STATUS]                    : 'Driver Status',
//     [FilterTypeID.FILTER_DRIVER_TYPE]                      : 'Driver Type',
//     [FilterTypeID.FILTER_DRIVER_TAGS]                      : 'Driver Tags',
//     [FilterTypeID.FILTER_DRIVER_AGE]                       : 'Driver Age',
//     [FilterTypeID.FILTER_DRIVER_HIRE_DATE]                 : 'Driver Hire Date',
//     [FilterTypeID.FILTER_VENDOR]                           : 'Vendor',
//     [FilterTypeID.FILTER_VENDOR_STATUS]                    : 'Vendor Status',
//     [FilterTypeID.FILTER_VENDOR_TYPE]                      : 'Vendor Type',
//     [FilterTypeID.FILTER_SETTLEMENT_STATUS]                : 'Settlement Status',
//     [FilterTypeID.FILTER_SETTLEMENT_DRIVER_PAY_AMOUNT_TYPE]: 'Settlement Driver Pay Amount Type',
//     [FilterTypeID.FILTER_SETTLEMENT_REVENUE_TYPE]          : 'Settlement Revenue Type',
//     [FilterTypeID.FILTER_BROKER]                           : 'Broker',
//     [FilterTypeID.FILTER_CUSTOMER]                         : 'Customer',
//     [FilterTypeID.FILTER_FUEL_TRANSACTION_VERIFIED]        : 'Fuel Transaction Verified',
//     [FilterTypeID.FILTER_TRUCK_YEAR]                       : 'Truck Year',
//     [FilterTypeID.FILTER_TRAILER_YEAR]                     : 'Trailer Year'
// };

export const FilterIdMap = {
    [FilterTypeID.FILTER_UNSPECIFIED]                           : 'unspecified',
    [FilterTypeID.FILTER_USER]                                  : 'user',
    [FilterTypeID.FILTER_USER_STATUS]                           : 'user_status',
    [FilterTypeID.FILTER_LOAD_STATUS]                           : 'load_status',
    [FilterTypeID.FILTER_LOAD_INVOICE_STATUS]                   : 'load_invoice_status',
    [FilterTypeID.FILTER_TRUCK]                                 : 'truck',
    [FilterTypeID.FILTER_TRUCK_STATUS]                          : 'truck_status',
    [FilterTypeID.FILTER_TRUCK_TYPE]                            : 'truck_type',
    [FilterTypeID.FILTER_TRUCK_TAGS]                            : 'truck_tags',
    [FilterTypeID.FILTER_TRAILER]                               : 'trailer',
    [FilterTypeID.FILTER_TRAILER_STATUS]                        : 'trailer_status',
    [FilterTypeID.FILTER_TRAILER_TYPE]                          : 'trailer_type',
    [FilterTypeID.FILTER_TRAILER_OWNERSHIP_TYPE]                : 'trailer_ownership_type',
    [FilterTypeID.FILTER_TRAILER_TAGS]                          : 'trailer_tags',
    [FilterTypeID.FILTER_PLATE]                                 : 'plate',
    [FilterTypeID.FILTER_PLATE_STATUS]                          : 'plate_status',
    [FilterTypeID.FILTER_PLATE_VEHICLE_TYPE]                    : 'plate_vehicle_type',
    [FilterTypeID.FILTER_PLATE_COMPANY]                         : 'plate_company',
    [FilterTypeID.FILTER_TRAILER_COMPANY]                       : 'trailer_company',
    [FilterTypeID.FILTER_DRIVER]                                : 'driver',
    [FilterTypeID.FILTER_DRIVER_STATUS]                         : 'driver_status',
    [FilterTypeID.FILTER_DRIVER_TYPE]                           : 'driver_type',
    [FilterTypeID.FILTER_DRIVER_TAGS]                           : 'driver_tags',
    [FilterTypeID.FILTER_DRIVER_AGE]                            : 'driver_age',
    [FilterTypeID.FILTER_DRIVER_HIRE_DATE]                      : 'driver_hire_date',
    [FilterTypeID.FILTER_VENDOR]                                : 'vendor',
    [FilterTypeID.FILTER_VENDOR_STATUS]                         : 'vendor_status',
    [FilterTypeID.FILTER_VENDOR_TYPE]                           : 'vendor_type',
    [FilterTypeID.FILTER_SETTLEMENT_STATUS]                     : 'settlement_status',
    [FilterTypeID.FILTER_SETTLEMENT_DRIVER_PAY_AMOUNT_TYPE]     : 'settlement_driver_pay_amount_type',
    [FilterTypeID.FILTER_SETTLEMENT_REVENUE_TYPE]               : 'settlement_revenue_type',
    [FilterTypeID.FILTER_BROKER]                                : 'broker',
    [FilterTypeID.FILTER_CUSTOMER]                              : 'customer',
    [FilterTypeID.FILTER_FUEL_TRANSACTION_VERIFIED]             : 'fuel_transaction_verified',
    [FilterTypeID.FILTER_TRUCK_YEAR]                            : 'truck_year',
    [FilterTypeID.FILTER_TRAILER_YEAR]                          : 'trailer_year',
    [FilterTypeID.FILTER_TOLL_SETTLEMENT_STATUS]                : 'toll_settlement_status',
    [FilterTypeID.FILTER_FUEL_SETTLEMENT_STATUS]                : 'fuel_settlement_status',
    [FilterTypeID.FILTER_TRUCK_USERS]                           : 'truck_users',
    [FilterTypeID.FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_END]  : 'end_at',
    [FilterTypeID.FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_START]: 'start_at',
    [FilterTypeID.FILTER_BROKER_CREATED_AT]                     : 'broker_created_at',
    [FilterTypeID.FILTER_CUSTOMER_CREATED_AT]                   : 'customer_created_at',
    [FilterTypeID.FILTER_PAYOUT_STATUS]                         : 'payout_status',
    [FilterTypeID.FILTER_MANIFEST_STATUS]                       : 'manifest_status',
    [FilterTypeID.FILTER_SERVICE_LOG_TYPE]                      : 'service_log_type',
    [FilterTypeID.FILTER_SERVICE_LOG_PROVIDER]                  : 'service_log_provider'
} as const;

type FilterKeysToEnumMap = { [P in (typeof FilterIdMap)[keyof typeof FilterIdMap]]: FilterTypeID };

export type FilterKeys = keyof FilterKeysToEnumMap;

export type CompareFunctionsMap = Partial<
    Record<FilterKeys, (target: never, filter: never) => boolean>
>;

export const IdToFilterEnumMap = objectEntries(FilterIdMap).reduce((acc, [key, value]) => {
    acc[value] = Number(key);
    return acc;
}, {} as FilterKeysToEnumMap);

export type FilterComponentsMap = Partial<Record<FilterKeys, EntityFilters.FilterComponent>>;
