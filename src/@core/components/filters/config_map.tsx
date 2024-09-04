import { FilterModel_FilterID as FilterID } from '@proto/models/model_filter_type';
import type { IntlMessageKey } from '@/@types/next-intl';
import { SERVICE_LOG_PROVIDER_FILTER_CONFIG } from '@/@core/components/filters/configs/service-log';
import {
    TRUCK_FILTER_CONFIG,
    TRUCK_STATUS_FILTER_CONFIG,
    TRUCK_TAGS_FILTER_CONFIG,
    TRUCK_TYPE_FILTER_CONFIG
} from './configs/truck';
import { PhpFilterTypeToPbMap } from './types';
import type { FilterConfigCallback } from './utils';
import {
    TRAILER_COMPANY_FILTER_CONFIG,
    TRAILER_FILTER_CONFIG,
    TRAILER_OWNERSHIP_TYPE_FILTER_CONFIG,
    TRAILER_STATUS_FILTER_CONFIG,
    TRAILER_TAGS_FILTER_CONFIG,
    TRAILER_TYPE_FILTER_CONFIG
} from './configs/trailer';
import {
    DRIVER_FILTER_CONFIG,
    DRIVER_STATUS_FILTER_CONFIG,
    DRIVER_SETTLEMENT_FILTER_CONFIG,
    DRIVER_TAGS_FILTER_CONFIG,
    DRIVER_TYPE_FILTER_CONFIG
} from './configs/driver';
import { VENDOR_FILTER_CONFIG, VENDOR_TYPE_FILTER_CONFIG } from './configs/vendor';
import { LOAD_INVOICE_STATUS_FILTER_CONFIG, LOAD_STATUS_FILTER_CONFIG } from './configs/load';
import { TRUCK_USERS_FILTER_CONFIG, USER_FILTER_CONFIG } from './configs/user';
import { BROKER_FILTER_CONFIG } from './configs/broker';
import {
    SETTLEMENT_DRIVER_NET_TYPE_FILTER_CONFIG,
    SETTLEMENT_STATUS_FILTER_CONFIG
} from './configs/settlement';
import { TOLL_SETTLEMENT_STATUS_FILTER_CONFIG } from './configs/toll';
import {
    PLATE_COMPANY_FILTER_CONFIG,
    PLATE_STATUS_FILTER_CONFIG,
    PLATE_VEHICLE_TYPE_FILTER_CONFIG
} from './configs/plate';
import { CUSTOMER_FILTER_CONFIG } from './configs/customer';
import { FUEL_TRANSACTION_VERIFIED_FILTER_CONFIG } from './configs/fuel';
import { PAYOUTS_STATUS_FILER_CONFIG } from './configs/payouts';
import { MANIFEST_STATUS_FILTER_CONFIG } from './configs/manifest';

const empty_filter = () => ({ filterItems: [], label: '' as IntlMessageKey });

export const filter_config_map: Record<FilterID, FilterConfigCallback> = {
    [FilterID.FILTER_UNSPECIFIED]                           : empty_filter,
    [FilterID.FILTER_SERVICE_LOG_PROVIDER]                  : SERVICE_LOG_PROVIDER_FILTER_CONFIG,
    [FilterID.FILTER_SERVICE_LOG_TYPE]                      : empty_filter,
    [FilterID.FILTER_TRUCK_YEAR]                            : empty_filter,
    [FilterID.FILTER_TRAILER_YEAR]                          : empty_filter,
    [FilterID.FILTER_DRIVER_AGE]                            : empty_filter,
    [FilterID.FILTER_DRIVER_HIRE_DATE]                      : empty_filter,
    [FilterID.FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_END]  : empty_filter,
    [FilterID.FILTER_LOAD_FIRST_STOP_APPOINTMENT_DATE_START]: empty_filter,
    [FilterID.FILTER_BROKER_CREATED_AT]                     : empty_filter,
    [FilterID.FILTER_CUSTOMER_CREATED_AT]                   : empty_filter,
    [FilterID.FILTER_PAYOUT_STATUS]                         : PAYOUTS_STATUS_FILER_CONFIG,

    [FilterID.FILTER_TRUCK]       : TRUCK_FILTER_CONFIG,
    [FilterID.FILTER_TRUCK_TYPE]  : TRUCK_TYPE_FILTER_CONFIG,
    [FilterID.FILTER_TRUCK_STATUS]: TRUCK_STATUS_FILTER_CONFIG,
    [FilterID.FILTER_TRUCK_TAGS]  : TRUCK_TAGS_FILTER_CONFIG,

    [FilterID.FILTER_TRAILER]               : TRAILER_FILTER_CONFIG,
    [FilterID.FILTER_TRAILER_TYPE]          : TRAILER_TYPE_FILTER_CONFIG,
    [FilterID.FILTER_TRAILER_STATUS]        : TRAILER_STATUS_FILTER_CONFIG,
    [FilterID.FILTER_TRAILER_OWNERSHIP_TYPE]: TRAILER_OWNERSHIP_TYPE_FILTER_CONFIG,
    [FilterID.FILTER_TRAILER_TAGS]          : TRAILER_TAGS_FILTER_CONFIG,
    [FilterID.FILTER_TRAILER_COMPANY]       : TRAILER_COMPANY_FILTER_CONFIG,

    [FilterID.FILTER_DRIVER]                 : DRIVER_FILTER_CONFIG,
    [FilterID.FILTER_DRIVER_STATUS]          : DRIVER_STATUS_FILTER_CONFIG,
    [FilterID.FILTER_DRIVER_TYPE]            : DRIVER_TYPE_FILTER_CONFIG,
    [FilterID.FILTER_SETTLEMENT_REVENUE_TYPE]: DRIVER_SETTLEMENT_FILTER_CONFIG,
    [FilterID.FILTER_DRIVER_TAGS]            : DRIVER_TAGS_FILTER_CONFIG,

    [FilterID.FILTER_PLATE]             : empty_filter,
    [FilterID.FILTER_PLATE_STATUS]      : PLATE_STATUS_FILTER_CONFIG,
    [FilterID.FILTER_PLATE_VEHICLE_TYPE]: PLATE_VEHICLE_TYPE_FILTER_CONFIG,
    [FilterID.FILTER_PLATE_COMPANY]     : PLATE_COMPANY_FILTER_CONFIG,

    [FilterID.FILTER_VENDOR]       : VENDOR_FILTER_CONFIG,
    [FilterID.FILTER_VENDOR_STATUS]: empty_filter,
    [FilterID.FILTER_VENDOR_TYPE]  : VENDOR_TYPE_FILTER_CONFIG,

    [FilterID.FILTER_LOAD_STATUS]        : LOAD_STATUS_FILTER_CONFIG,
    [FilterID.FILTER_LOAD_INVOICE_STATUS]: LOAD_INVOICE_STATUS_FILTER_CONFIG,

    [FilterID.FILTER_USER]       : USER_FILTER_CONFIG,
    [FilterID.FILTER_USER_STATUS]: empty_filter,
    [FilterID.FILTER_BROKER]     : BROKER_FILTER_CONFIG,
    [FilterID.FILTER_CUSTOMER]   : CUSTOMER_FILTER_CONFIG,

    [FilterID.FILTER_SETTLEMENT_STATUS]                : SETTLEMENT_STATUS_FILTER_CONFIG,
    [FilterID.FILTER_SETTLEMENT_DRIVER_PAY_AMOUNT_TYPE]: SETTLEMENT_DRIVER_NET_TYPE_FILTER_CONFIG,

    [FilterID.FILTER_FUEL_TRANSACTION_VERIFIED]: FUEL_TRANSACTION_VERIFIED_FILTER_CONFIG,

    [FilterID.FILTER_TOLL_SETTLEMENT_STATUS]: TOLL_SETTLEMENT_STATUS_FILTER_CONFIG,
    [FilterID.FILTER_FUEL_SETTLEMENT_STATUS]: TOLL_SETTLEMENT_STATUS_FILTER_CONFIG,
    [FilterID.FILTER_TRUCK_USERS]           : TRUCK_USERS_FILTER_CONFIG,

    // manifests
    [FilterID.FILTER_MANIFEST_STATUS]: MANIFEST_STATUS_FILTER_CONFIG
};

export function getPbFilterId(filter_id: string) {
    return PhpFilterTypeToPbMap[filter_id];
}
