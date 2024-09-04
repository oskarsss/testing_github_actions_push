import TableTypes from '@/@core/components/table/types';
import { StatsFilter } from '@/store/dispatch/loads/hooks';
import { FuelGetReply_Fuel } from '@proto/fuel';
import { TruckModel_Truck } from '@proto/models/model_truck';

/** All Fuel Types */
namespace Fuel {
    export type Plate = {
        id: string;
        number: string;
        state: string;
        owned: number;
    };

    export type Driver = {
        id: string;
        first_name: string;
        last_name: string;
        phone_number: string;
        selfie_thumb_url: string;
        last_ping_at: string;
    };

    export type TruckType = 'owned' | 'leased' | 'owner_operator';

    export type FuelTransactionRow = TableTypes.Row &
        FuelGetReply_Fuel & {
            truck: TruckModel_Truck;
            truck_reference_id: string;
            truck_type: TruckType;
            reference_id: string;
            unit_number: string;
            driver_name: string;
            truck_stop: string;
            in_network: boolean;
            settlement_id: string;
            created_at: string;
            truck_status: string;
            settlement_status: string;
            total_amount_formatted: string;
            discount_amount_formatted: string;
            total_discounted_amount_formatted: string;
            total_amount: string;
            discount_amount: string;
            total_discounted_amount: string;
        };

    // {
    // fuel_transaction_id: string;
    // unique_key: string;
    // truck_id: string;
    // truck_reference_id: string;
    // truck_type: TruckType;
    // reference_id: string;
    // datetime: string;
    // unit_number: string;
    // driver_name: string;
    // truck_stop: string;
    // city: string;
    // state: string;
    // address: string;
    // chain: string;
    // in_network: boolean;
    // quantity: string;
    // total_amount: number;
    // discount_amount: number;
    // total_discounted_amount: number;
    // settlement_id: string;
    // verified: boolean;
    // created_at: string;
    // truck_status: string;
    // settlement_status: string;
    // location: string;
    // total_amount_formatted: string;
    // discount_amount_formatted: string;
    // total_discounted_amount_formatted: string;
    // product: string | null;
    // }

    export type CustomColumns = {
        multi_select_checkbox?: boolean;
        status?: string;
        settlement?: string;
        truck?: string;
    };

    // export namespace API {
    //     export namespace Transactions {
    //         export namespace Get {
    //             export type Request = {
    //                 end_date: string;
    //                 orderBy: string;
    //                 unassigned: boolean;
    //                 start_date: string;
    //             } & {
    //                 per_page: number;
    //                 search: string;
    //                 page: number;
    //                 order: 'asc' | 'desc';
    //                 truck_status: string[];
    //                 truck_type: string[];
    //                 fuel_settlement_status: string[];
    //                 fuel_transaction_verified: string[];
    //                 verified: string;
    //             };

    //             export type Response = APIResponse<{
    //                 page: TableTypes.Page;
    //                 transactions: FuelTransactionRow[];
    //             }>;
    //         }
    //     }
    //     export namespace Transaction {
    //         export namespace Update {
    //             export type Request = {
    //                 id: string;
    //                 body: any;
    //                 without_toast?: boolean;
    //             };

    //             export type Response = APIResponse;
    //         }
    //     }
    //     export namespace TransactionsStats {
    //         export namespace Get {
    //             export type Request = {
    //                 end_date: string;
    //                 orderBy: string;
    //                 unassigned: boolean;
    //                 start_date: string;
    //             } & {
    //                 per_page: number;
    //                 search: string;
    //                 page: number;
    //                 order: 'asc' | 'desc';
    //                 truck_status: string[];
    //                 truck_type: string[];
    //                 fuel_settlement_status: string[];
    //                 fuel_transaction_verified: string[];
    //                 verified: string;
    //             };

    //             export type Response = APIResponse<{
    //                 filters: StatsFilter[];
    //                 total: number;
    //             }>;
    //         }
    //     }
    // }
}

export default Fuel;
