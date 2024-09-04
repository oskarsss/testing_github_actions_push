import { FILTER_SWITCH_KEY } from '@/@core/components/filters/constants';
import createFilters from '@/utils/create-filters';
import { $Filter } from '@/@core/components/filters/utils';
import { LoadInvoiceStatus, LoadStatus, LoadStatuses } from '@/models/loads/load';
import TableTypes from '@/@core/components/table/types';
import { DriverStatus } from '@/models/fleet/drivers/driver-status';
import { TrailerStatus } from '@/models/fleet/trailers/trailer-status';
import { TruckStatus } from '@/models/fleet/trucks/truck-status';
import { TruckType } from '@/models/fleet/trucks/truck-type';
import { TrailerOwnershipType } from '@/models/fleet/trailers/trailer-type';
import { PlateStatus } from '@/models/fleet/plates/plate-status';
import PlatesTypes from '@/store/fleet/plates/types';
import VendorsTypes from '@/store/fleet/vendors/types';
import { PayoutStatus } from '@/models/payouts/payout-status';
import { SettlementStatus } from '@/models/settlements/settlement-status';
import { ManifestGetRequest_SortType } from '@proto/manifests';
import type { ManifestFilterStatus } from '@/models/manifests/manifest';
import { ServiceLogGetRequest_SortType } from '@proto/service_log';
import { ServiceLogModel_ServiceLogType } from '@proto/models/model_service_log';
import { GetLoadsRequest_SortBy } from '@proto/loads';

const ORDERS_FILTERS = createFilters({
    order   : 'asc' as TableTypes.Order,
    orderBy : '',
    page    : 0,
    per_page: 50,
    search  : '',

    end_at                              : '',
    start_at                            : new Date(new Date().setMonth(new Date().getMonth() - 1)).toISOString().split('T')[0],
    id                                  : 'default',
    [$Filter.key('user')]               : [] as string[],
    [$Filter.key('broker')]             : [] as string[],
    [$Filter.key('driver')]             : [] as string[],
    [$Filter.key('load_invoice_status')]: [] as LoadInvoiceStatus[],
    [$Filter.key('load_status')]        : [] as LoadStatus[],
    [$Filter.key('truck')]              : [] as string[],
    late_dropoffs                       : false,
    late_pickups                        : false,
    gps_inactive                        : false,
    sortBy                              : GetLoadsRequest_SortBy.LATEST
});

const PAGES_FILTERS_CONFIG = Object.freeze({
    FLEET: {
        TRUCKS: {
            page          : 'trucks',
            defaultFilters: createFilters({
                orderBy                      : 'reference_id',
                [$Filter.key('truck_year')]  : [] as string[],
                [$Filter.key('truck_status')]: [] as TruckStatus[],
                [$Filter.key('truck_tags')]  : [] as string[],
                [$Filter.key('trailer_type')]: [] as string[],
                [$Filter.key('truck_type')]  : [] as TruckType[],
                [$Filter.key('truck_users')] : [] as string[],
                [$Filter.key('vendor')]      : [] as string[]
            })
        },
        TRAILERS: {
            page          : 'trailers',
            defaultFilters: createFilters({
                orderBy                                : 'reference_id',
                [$Filter.key('trailer_ownership_type')]: [] as TrailerOwnershipType[],
                [$Filter.key('trailer_status')]        : [] as TrailerStatus[],
                [$Filter.key('trailer_tags')]          : [] as string[],
                [$Filter.key('trailer_company')]       : [] as string[],
                [$Filter.key('trailer_type')]          : [] as string[],
                [$Filter.key('vendor')]                : [] as string[],
                year                                   : [] as number[]
            })
        },
        PLATES: {
            page          : 'plates',
            defaultFilters: createFilters({
                orderBy                            : 'reference_id',
                [$Filter.key('plate_company')]     : [] as string[],
                [$Filter.key('plate_status')]      : [] as PlateStatus[],
                [$Filter.key('plate_vehicle_type')]: [] as PlatesTypes.VehicleType[],
                [FILTER_SWITCH_KEY]                : {
                    equipment_inactive: false
                }
            })
        },
        VENDORS: {
            page          : 'vendors',
            defaultFilters: createFilters({
                orderBy                     : 'reference_id',
                [$Filter.key('vendor_type')]: [] as VendorsTypes.VendorType[],
                [FILTER_SWITCH_KEY]         : {
                    hasNoTaxId: false
                }
            })
        },
        DRIVERS: {
            page          : 'drivers',
            defaultFilters: createFilters({
                orderBy                                 : 'truck_reference_id',
                [$Filter.key('driver_status')]          : [] as DriverStatus[],
                [$Filter.key('vendor')]                 : [] as string[],
                [$Filter.key('driver_type')]            : [] as string[],
                [$Filter.key('settlement_revenue_type')]: [] as string[],
                [$Filter.key('driver_tags')]            : [] as string[],
                [$Filter.key('driver_hire_date')]       : [] as string[],
                [$Filter.key('driver_age')]             : [] as string[],
                [FILTER_SWITCH_KEY]                     : {
                    uninsured: false
                }
            })
        },
        TRAILER_COMPANIES: {
            page          : 'trailer_companies',
            defaultFilters: createFilters({
                orderBy: 'company_name'
            })
        },
        PLATES_COMPANIES: {
            page          : 'plate_companies',
            defaultFilters: createFilters({
                orderBy: 'reference_id'
            })
        }
    },
    DISPATCH: {
        LOADS: {
            page          : 'loads',
            defaultFilters: ORDERS_FILTERS
        },
        MANIFEST: {
            page          : 'manifest',
            defaultFilters: createFilters({
                orderBy : 'reference_id',
                per_page: 50,
                page    : 0,
                end_at  : '',
                start_at: new Date(new Date().setMonth(new Date().getMonth() - 1))
                    .toISOString()
                    .split('T')[0],
                [$Filter.key('manifest_status')]: [],
                [$Filter.key('driver')]         : [],
                [$Filter.key('truck')]          : [],
                [$Filter.key('trailer')]        : [],
                // eslint-disable-next-line max-len
                sortBy                          : ManifestGetRequest_SortType.FIRST_STOP_APPOINTMENT_START_AT_DESC
            })
        },
        SCHEDULE: {
            page          : 'scheduling',
            defaultFilters: createFilters({
                orderBy                         : 'manifests',
                order                           : 'desc',
                per_page                        : 1000,
                [$Filter.key('truck_status')]   : [] as TruckStatus[],
                [$Filter.key('truck_type')]     : [] as TruckType[],
                [$Filter.key('manifest_status')]: [] as ManifestFilterStatus[],
                [$Filter.key('trailer_type')]   : [] as string[],
                [$Filter.key('user')]           : [] as string[],
                [$Filter.key('truck_tags')]     : [] as string[],

                [FILTER_SWITCH_KEY]: {
                    online: false
                }
            })
        },
        BROKERS: {
            page          : 'brokers',
            defaultFilters: createFilters({
                orderBy            : 'mc',
                broker_created_at  : [] as string[],
                [FILTER_SWITCH_KEY]: {
                    unpaid_loads: false,
                    unassigned  : false
                }
            })
        },
        CUSTOMERS: {
            page          : 'customers',
            defaultFilters: createFilters({
                orderBy            : 'id',
                customer_created_at: [] as string[],
                [FILTER_SWITCH_KEY]: {
                    unpaid_loads: false,
                    unassigned  : false
                }
            })
        }
    },
    ACCOUNTING: {
        TOLLS: {
            page          : 'tolls',
            defaultFilters: createFilters({
                orderBy                                : 'tolls_transactions.transaction_datetime',
                start_at                               : '',
                end_at                                 : '',
                [$Filter.key('toll_settlement_status')]: [] as string[],
                [$Filter.key('truck_status')]          : [] as TruckStatus[],
                [$Filter.key('truck_type')]            : [] as TruckType[],
                [$Filter.key('truck')]                 : [] as string[],
                [$Filter.key('trailer')]               : [] as string[],
                unassigned                             : false,
                created_at                             : [] as string[]
            })
        },
        PAYOUTS: {
            page          : 'payouts',
            defaultFilters: createFilters({
                orderBy                       : '',
                [$Filter.key('payout_status')]: [] as PayoutStatus[],
                [$Filter.key('driver')]       : [] as string[],
                [$Filter.key('vendor')]       : [] as string[]
            })
        },
        FUEL: {
            page          : 'fuel',
            defaultFilters: createFilters({
                orderBy                                   : 'datetime',
                order                                     : 'desc',
                start_at                                  : '',
                end_at                                    : '',
                [$Filter.key('fuel_settlement_status')]   : [] as string[],
                [$Filter.key('fuel_transaction_verified')]: [], // TODO: fix this
                [$Filter.key('truck_status')]             : [] as TruckStatus[],
                [$Filter.key('truck_type')]               : [] as TruckType[],
                [$Filter.key('truck')]                    : [] as string[],
                verified                                  : '',
                created_at                                : [] as string[],
                [FILTER_SWITCH_KEY]                       : {
                    unassigned: false
                }
            })
        },
        RECURRING_TRANSACTIONS: {
            TRANSACTIONS: {
                page          : 'recurring_transactions',
                defaultFilters: createFilters({
                    orderBy                       : 'id',
                    [$Filter.key('driver_status')]: [] as DriverStatus[]
                })
            },
            DRIVERS: {
                page          : 'recurring_transactions_drivers',
                defaultFilters: createFilters({
                    [$Filter.key('driver_status')]: [] as DriverStatus[],
                    [$Filter.key('driver_type')]  : [] as string[],
                    orderBy                       : 'id',
                    [FILTER_SWITCH_KEY]           : {
                        uninsured: false
                    }
                })
            }
        },

        SETTLEMENTS: {
            page          : 'settlements',
            defaultFilters: createFilters({
                order                                             : ['asc', 'asc', 'asc'],
                orderBy                                           : ['truck.type', 'trailerType.name', 'truck.reference_id'],
                [$Filter.key('driver_type')]                      : [] as string[],
                [$Filter.key('settlement_driver_pay_amount_type')]: [] as string[],
                [$Filter.key('settlement_status')]                : [] as SettlementStatus[],
                [$Filter.key('truck_type')]                       : [] as TruckType[],
                [FILTER_SWITCH_KEY]                               : {
                    percentage: false
                }
            })
        }
    },
    BILLING: {
        ALL: {
            page          : 'billing.all.stats',
            defaultFilters: ORDERS_FILTERS
        },
        AMAZON: {
            page          : 'billing.amazon.stats',
            defaultFilters: ORDERS_FILTERS
        },
        DIRECT: {
            page: 'billing.direct',

            defaultFilters: ORDERS_FILTERS
        },
        FACTORING: {
            page          : 'billing.factoring',
            defaultFilters: ORDERS_FILTERS
        }
    },
    MAP: {
        DRIVERS: {
            page          : 'map',
            defaultFilters: createFilters({
                orderBy                                 : 'truck_reference_id',
                per_page                                : 5000,
                [$Filter.key('driver_status')]          : [] as DriverStatus[],
                [$Filter.key('vendor')]                 : [] as string[],
                [$Filter.key('driver_type')]            : [] as string[],
                [$Filter.key('settlement_revenue_type')]: [] as string[],
                [$Filter.key('driver_tags')]            : [] as string[]
            })
        },
        LOADS: {
            page          : 'map',
            defaultFilters: {
                order   : 'asc' as TableTypes.Order,
                orderBy : '',
                page    : 0,
                per_page: 5000,
                search  : '',

                end_at  : '',
                start_at: new Date(new Date().setMonth(new Date().getMonth() - 2))
                    .toISOString()
                    .split('T')[0],
                id                                  : 'default',
                [$Filter.key('user')]               : [] as string[],
                [$Filter.key('broker')]             : [] as string[],
                [$Filter.key('driver')]             : [] as string[],
                [$Filter.key('load_invoice_status')]: [] as LoadInvoiceStatus[],
                [$Filter.key('truck')]              : [] as string[],
                late_dropoffs                       : false,
                late_pickups                        : false,
                gps_inactive                        : false,
                sortBy                              : 1,

                [$Filter.key('load_status')]: [
                    LoadStatuses.PENDING,
                    LoadStatuses.ASSIGNED,
                    LoadStatuses.IN_PROGRESS
                ]
            }
        },
        TRAILERS: {
            page          : 'map',
            defaultFilters: createFilters({
                orderBy                                : 'reference_id',
                per_page                               : 5000,
                [$Filter.key('trailer_ownership_type')]: [] as TrailerOwnershipType[],
                [$Filter.key('trailer_status')]        : [] as TrailerStatus[],
                [$Filter.key('trailer_tags')]          : [] as string[],
                [$Filter.key('trailer_company')]       : [] as string[],
                [$Filter.key('trailer_type')]          : [] as string[],
                [$Filter.key('vendor')]                : [] as string[]
            })
        },
        TRUCKS: {
            page          : 'map',
            defaultFilters: createFilters({
                orderBy                      : 'reference_id',
                per_page                     : 5000,
                [$Filter.key('truck_status')]: [] as TruckStatus[],
                [$Filter.key('load_status')] : [] as LoadStatus[],
                [$Filter.key('truck_tags')]  : [] as string[],
                [$Filter.key('trailer_type')]: [] as string[],
                [$Filter.key('truck_type')]  : [] as TruckType[],
                [$Filter.key('user')]        : [] as string[]
            })
        }
    },
    SETTINGS: {
        MEMBERS: {
            page          : 'members',
            defaultFilters: createFilters({
                orderBy : 'id',
                per_page: 25
            })
        },
        INTEGRATIONS: {
            MAIN: {
                page          : 'integration_providers' as const,
                defaultFilters: createFilters({
                    orderBy : 'reference_id',
                    per_page: 1000
                })
            },
            FLEET_PROVIDER: {
                page          : 'integrations.fleet_provider',
                defaultFilters: createFilters({
                    orderBy: 'reference_id'
                })
            }
        }
    },
    REPORTS: {
        IFTA: {
            page          : 'ifta',
            defaultFilters: createFilters({
                orderBy               : '',
                [$Filter.key('truck')]: [] as string[]
            })
        }
    },
    MAINTENANCE: {
        SERVICE_LOGS: {
            page          : 'service_logs',
            defaultFilters: createFilters({
                page    : 0,
                per_page: 50,
                sortBy  : ServiceLogGetRequest_SortType.LATEST,
                search  : '',
                orderBy : 'friendlyId',
                end_at  : '',
                start_at: new Date(new Date().setMonth(new Date().getMonth() - 1))
                    .toISOString()
                    .split('T')[0],

                [$Filter.key('service_log_type')]    : [] as ServiceLogModel_ServiceLogType[],
                [$Filter.key('service_log_provider')]: [] as string[],
                [$Filter.key('driver')]              : [] as string[],
                [$Filter.key('trailer')]             : [] as string[],
                [$Filter.key('truck')]               : [] as string[]
            })
        }
    }
});

export default PAGES_FILTERS_CONFIG;
