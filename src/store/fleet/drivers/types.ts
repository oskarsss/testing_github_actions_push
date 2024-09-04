import type { DriverStatus } from '@/models/fleet/drivers/driver-status';
import type TableTypes from '@/@core/components/table/types';
import type { StatsFilter } from '@/store/dispatch/loads/hooks';
import type { TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import type SettlementsTypes from '@/store/accounting/settlements/types';
import { DriverDeviceGetReply_DriverDevice, DriverStatsRetrieveReply_Stats } from '@proto/drivers';
import type { GetUsersReply_User } from '@proto/users';
import type { DocumentModel_DocumentEntityType } from '@proto/models/model_document';
import { DriverTypeModel } from '@proto/models/model_driver_type';
import { VendorModel_Vendor } from '@proto/models/model_vendor';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { DriverModel_Driver } from '@proto/models/model_driver';
import type { APIRequestBody, APIRequestParams, APIResponse } from '../../types';

/** Drivers */
namespace DriversTypes {
    export type DriverDevice = DriverDeviceGetReply_DriverDevice;

    export interface DriverRow extends TableTypes.Row, Omit<DriverModel_Driver, 'status'> {
        status: DriverStatus;
    }

    export type ConvertedDriverRow = DriverRow & {
        truckId: string;
        truck: TruckModel_Truck | null;
        trailer: TrailerModel_Trailer | null;
        trailerType: TrailerTypesGetReply_TrailerType | null;
        driverType: DriverTypeModel | null;
        vendor: VendorModel_Vendor | null;
        revenueType: SettlementsTypes.RevenueTypes.RevenueType | null;
        cycle: SettlementsTypes.Cycles.Cycle | null;
    };

    export type Stats = DriverStatsRetrieveReply_Stats;

    export type Driver = DriverModel_Driver;

    // export type ConvertedDriver = Driver & {
    //     driverType: DriverTypeModel | null;
    //     trailerType: TrailerTypesGetReply_TrailerType | null;
    //     vendor: VendorModel_Vendor | null;
    //     truckData: TruckModel_Truck | null;
    //     truckDrivers: DriverModel_Driver[];
    //     trailer: TrailerModel_Trailer | null;
    //     settlementCycle: SettlementsTypes.Cycles.Cycle | null;
    //     settlementRevenueType: SettlementsTypes.RevenueTypes.RevenueType | null;
    //     convertedStatus: DriverStatus;
    //     usersList: GetUsersReply_User[];
    // };

    export type ScheduledDebit = {
        entity_id: string;
        entity_type: DocumentModel_DocumentEntityType | '';
        category_id: string;
        amount: number;
        start_date: string;
        max_total_amount: number | null;
    };

    export namespace API {
        export namespace Drivers {
            export namespace Get {
                export type Request = null;

                export type Response = APIResponse<{
                    drivers: DriverRow[];
                    filters: StatsFilter[];
                    page: TableTypes.Page;
                }>;
            }
        }

        export namespace Driver {
            export namespace Status {
                export namespace Update {
                    export type Request = APIRequestBody<{
                        status: DriverStatus;
                    }> &
                        APIRequestParams<{
                            driver_id: string;
                        }>;

                    export type Response = APIResponse;
                }
            }

            export namespace Update {
                export type Request = {
                    id: string;
                    data: {
                        first_name?: string;
                        middle_name?: string;
                        last_name?: string;
                        phone_number?: string;
                        email?: string;
                        address_line_1?: string;
                        address_line_2?: string;
                        address_city?: string;
                        address_state?: string;
                        address_zipcode?: string;
                        dob_date?: string;
                        hire_date?: string;
                        settlement_revenue_type_id?: string;
                        settlement_cycle_id?: string;
                        payout_receiver?: string;
                        type?: string;
                        status?: string;
                        vendor_id?: string;
                        insurance_endorsed?: boolean;
                    };
                };

                export type Response = APIResponse;
            }
        }

        export namespace ScheduledDebit {
            export namespace Add {
                export type Request = {
                    id: string;
                    data: ScheduledDebit;
                };

                export type Response = APIResponse<{
                    id: string;
                }>;
            }

            export namespace Update {
                export type Request = {
                    id: string;
                    scheduled_debit_id: string;
                    data: ScheduledDebit;
                };

                export type Response = APIResponse<{
                    id: string;
                }>;
            }

            export namespace Delete {
                export type Request = {
                    id: string;
                    scheduled_debit_id: string;
                };

                export type Response = APIResponse;
            }
        }

        export namespace Documents {
            export namespace Download {
                export type Request = number;

                export type Response = APIResponse<{
                    url: string;
                }>;
            }
        }

        export namespace Bank {
            export namespace Add {
                export type Request = {
                    id: string;
                    data: {
                        routing_number: string;
                        account_number: string;
                        account_holder_name: string;
                    };
                };

                export type Response = APIResponse;
            }

            export namespace Delete {
                export type Request = {
                    id: string;
                    account_id: string;
                };

                export type Response = APIResponse;
            }

            export namespace ShowAccountNumber {
                export type Response = APIResponse<{
                    account_number: string;
                }>;

                export type Request = {
                    driver_id: string;
                    bank_account_id: string;
                };
            }
        }
    }
}

export default DriversTypes;
