/* eslint-disable @typescript-eslint/no-namespace */
/* eslint-disable max-len */
import TableTypes from '@/@core/components/table/types';
import { LoadInvoiceStatus, LoadStatus } from '@/models/loads/load';
import {
    RetrieveSettlementReply_DriverRecurringTransaction,
    RetrieveSettlementReply_Fuel,
    RetrieveSettlementReply_Manifest,
    RetrieveSettlementReply_Settlement,
    RetrieveSettlementReply_Tolls,
    RetrieveSettlementReply_Transaction,
    SettlementGetReply_Settlement,
    SettlementGetReply_Settlement_Trend
} from '@proto/settlements';
import { StatsFilter } from '@/store/dispatch/loads/hooks';
import { TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import { DriverTypeModel } from '@proto/models/model_driver_type';
import {
    RevenueTypesGetReply_RevenueType,
    RevenueTypesGetReply_RevenueType_Item
} from '@proto/revenue_types';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import type { DriverModel_Driver } from '@proto/models/model_driver';

import { DriverModel_Status } from '@proto/models/model_driver';
import {
    Settlements_Cycle_Period_Period,
    Settlements_Cycle_Period_Settlement_Trend_Entity
} from '@proto/models/model_settlement';
import { SettlementCycleGetReply_SettlementCycle } from '@proto/settlement.cycle';
import {
    SettlementRecurringTransactionModel_DriverDetails,
    SettlementRecurringTransactionModel_DriverDetails_DriverRecurringTransaction,
    SettlementRecurringTransactionModel_RecurringTransaction,
    SettlementRecurringTransactionModel_Transaction
} from '@proto/models/model_settlement.recurring_transaction';
import { SettlementStatus } from '@/models/settlements/settlement-status';
import { TruckType } from '@/models/fleet/trucks/truck-type';
import { TruckModel_Type, TruckModel_Truck } from '@proto/models/model_truck';
import { DriverStatus } from '@/models/fleet/drivers/driver-status';
import { SettlementTransactionCategoryModel_Type } from '@proto/models/model_settlement.transaction_category';
import { APIRequestBody, APIResponse } from '../../types';

namespace SettlementsTypes {
    export namespace Cycles {
        export type DriverRevenueType = {
            driver_id: string;
            first_name: string;
            last_name: string;
            selfie_thumb_url?: string;
            settlement_cycle_id: string;
        };
        export type Drivers = {
            total: number;
            total_assigned: number;
            rows: DriverRevenueType[];
        };

        export type Cycle = SettlementCycleGetReply_SettlementCycle;

        export enum PeriodStatus {
            OPEN = 'open',
            CLOSED = 'closed'
        }

        export namespace Periods {
            export type Period = Settlements_Cycle_Period_Period;

            export namespace Settlements {
                export type MapType = 'Owned' | 'Leased' | 'Owner Op';
                export type TrendType = 'up' | 'down' | 'unchanged';

                export type CustomColumns = {
                    multi_select_checkbox?: boolean;
                    truck?: string;
                    trailer?: string;
                };

                export interface SettlementsRow
                    extends Omit<TableTypes.Row, 'recurringTransactions'>,
                        SettlementGetReply_Settlement {}

                export type ConvertedSettlementRow = Omit<SettlementsRow, 'trends'> & {
                    driver: DriverModel_Driver | null;
                    truck: TruckModel_Truck | null;
                    trailer: TrailerModel_Trailer | null;
                    driverType: DriverTypeModel | null;
                    trailerType: TrailerTypesGetReply_TrailerType | null;
                    driverRevenueType: SettlementsTypes.RevenueTypes.RevenueType | null;
                    settlementLocalStatus: SettlementStatus;
                    truckType: TruckType | null;
                    trends: Record<
                        Settlements_Cycle_Period_Settlement_Trend_Entity,
                        SettlementGetReply_Settlement_Trend
                    >;
                };

                export type StatusItem = {
                    broker_amount: string;
                    status: string;
                    invoice_status: LoadInvoiceStatus;
                };

                export type Status = {
                    status: LoadStatus;
                    items: StatusItem[];
                    broker_amount: number;
                };
            }
        }
    }

    export namespace CycleSettlementDetails {
        export type LoadStatus = 'assigned' | 'in_progress' | 'tonu' | 'delivered';

        export type Manifests = RetrieveSettlementReply_Manifest;

        export type RecurringTransaction = RetrieveSettlementReply_DriverRecurringTransaction;

        export type Transaction = RetrieveSettlementReply_Transaction;

        export type TransactionType = 'debit' | 'credit';

        export type OtherSettlement = SettlementGetReply_Settlement;

        export type FuelTransaction = RetrieveSettlementReply_Fuel;

        export type TollsTransaction = RetrieveSettlementReply_Tolls;

        export type Settlement = RetrieveSettlementReply_Settlement;
    }

    export namespace TransactionCategories {
        export type DriverType = 'owner_operator' | 'company_driver' | 'lease_driver' | 'all';
        export type EntityType = 'driver' | 'truck' | 'trailer';
        export type CategoryType = 'debit' | 'credit';
        export type CyclePeriodFrequency = 'monthly' | 'every_period';

        export type Category = {
            transaction_category_id: string;
            name: string;
            type: CategoryType;
            entity_type?: EntityType;
            driver_types: DriverType[];
            required: boolean;
            recurring: boolean;
            deleted: boolean;
            recurring_transaction_cycle_period_frequency: CyclePeriodFrequency;
        };
    }

    export namespace RecurringTransactions {
        export interface RecurringTransactionRow
            extends TableTypes.Row,
                SettlementRecurringTransactionModel_RecurringTransaction {}

        export type ConvertedRecurringTransactionRow = RecurringTransactionRow & {
            selfieThumbUrl: string;
            fullName: string;
            firstName: string;
            lastName: string;
            truckReferenceId: string;
            truckType: TruckModel_Type | null;
            trailerReferenceId: string;
            trailerType: TrailerTypesGetReply_TrailerType | null;
            driverType: DriverTypeModel | null;
            driverStatus: DriverStatus;
            categoryName: string;
            categoryType: SettlementTransactionCategoryModel_Type;
        };

        export type Item = {
            label: string;
            value: string;
            count: number;
        };

        export type Tag = {
            value: number;
            label: string;
        };

        export interface DriverTransactionRow
            extends Omit<TableTypes.Row, 'transactions'>,
                SettlementRecurringTransactionModel_DriverDetails {}

        export type ConvertedDriverTransactionRow = Omit<DriverTransactionRow, 'transactions'> & {
            selfieThumbUrl: string;
            fullName: string;
            firstName: string;
            lastName: string;
            driverInsuranceEndorsed?: boolean;
            truckReferenceId: string;
            truckType: TruckModel_Type | null;
            trailerReferenceId: string;
            trailerTypeId: string;
            driverType: DriverTypeModel | null;
            status: DriverStatus;
            transactions: {
                [
                    key: string
                ]: SettlementRecurringTransactionModel_DriverDetails_DriverRecurringTransaction & {
                    note: string;
                };
            };
        };

        export type CustomColumns = {
            driver_type?: string;
            driver_name?: string;
            recurring_transaction?: string;
            type?: string;
        };

        export type Transaction = SettlementRecurringTransactionModel_Transaction;
        export type RecurringTransaction = SettlementRecurringTransactionModel_RecurringTransaction;
    }

    export namespace RevenueTypes {
        export type Item = RevenueTypesGetReply_RevenueType_Item;

        export type Row = {
            id: string;
            first_name: string;
            last_name: string;
            selfie_thumb_url: string;
        };

        export type Drivers = {
            total_assigned: number;
            total: number;
            rows: Row[];
        };

        export type RevenueType = RevenueTypesGetReply_RevenueType;
    }

    export namespace API {
        export namespace Cycles {
            type CycleId = {
                cycle_id: SettlementsTypes.Cycles.Cycle['cycleId'];
            };
            export namespace Get {
                export type Response = APIResponse<{
                    cycles: SettlementsTypes.Cycles.Cycle[];
                }>;
                export type Request = null;
            }
            export namespace Create {
                export type Request = APIRequestBody<{
                    name: string;
                    description?: string | null;
                    period_weeks: number;
                    closing_day: number;
                    closing_time: string;
                    auto_create_periods: boolean;
                    auto_create_period_settlements: boolean;
                }>;
                export type Response = APIResponse<CycleId>;
            }
            export namespace Update {
                export type Request = CycleId &
                    APIRequestBody<{
                        name: string;
                        description?: string | null;
                        period_weeks: number;
                        closing_day: number;
                        closing_time: string;
                        default: boolean;
                        pay_date_days_after_closing: number;
                        auto_create_periods: boolean;
                        auto_create_period_settlements: boolean;
                    }>;

                export type Response = APIResponse<CycleId>;
            }
            export namespace Deactivate {
                export type Request = CycleId;
                export type Response = APIResponse<CycleId>;
            }

            export namespace Activate {
                export type Request = CycleId;
                export type Response = APIResponse<CycleId>;
            }
        }

        export namespace TransactionCategories {
            type TransactionCategoryID = {
                id: SettlementsTypes.TransactionCategories.Category['transaction_category_id'];
            };

            export namespace Get {
                export type Request = null;
                export type Response = APIResponse<{
                    transaction_categories: SettlementsTypes.TransactionCategories.Category[];
                }>;
            }

            export namespace Create {
                type Category = {
                    name: string;
                    required: boolean;
                    recurring: boolean;
                    driver_types: string[];
                    entity_type: string;
                    type: string;
                };

                export type Request = APIRequestBody<Category>;
                export type Response = APIResponse<{
                    category: Category & {
                        transaction_category_id: string;
                    };
                }>;
            }

            export namespace Update {
                export type Request = TransactionCategoryID &
                    APIRequestBody<{
                        name: string;
                        required: boolean;
                        recurring: boolean;
                        driver_types: string[];
                        entity_type: string;
                        type: string;
                    }>;
                export type Response = APIResponse<{
                    category: TransactionCategoryID & {
                        name: SettlementsTypes.TransactionCategories.Category['name'];
                        type: SettlementsTypes.TransactionCategories.Category['type'];
                        entity_type: SettlementsTypes.TransactionCategories.Category['entity_type'];
                        driver_types: SettlementsTypes.TransactionCategories.Category['driver_types'];
                        required: SettlementsTypes.TransactionCategories.Category['required'];
                        recurring: SettlementsTypes.TransactionCategories.Category['recurring'];
                    };
                }>;
            }

            export namespace Delete {
                export type Request = TransactionCategoryID;
                export type Response = APIResponse<{
                    category: TransactionCategoryID;
                }>;
            }
        }

        export namespace RevenueTypes {
            type RevenueTypeID = {
                revenue_type_id: string;
            };
            type RevenueTypePostResponse = APIResponse<RevenueTypeID>;

            export namespace UpdateItem {
                export type Request = RevenueTypeID & { item_id: string } & APIRequestBody<{
                        type: string;
                        amount: number;
                    }>;
                export type Response = RevenueTypePostResponse;
            }

            export namespace DeleteItem {
                export type Request = RevenueTypeID & { item_id: string };
                export type Response = RevenueTypePostResponse;
            }
        }
    }
}

export default SettlementsTypes;
