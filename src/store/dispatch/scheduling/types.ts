import { APIResponse } from '@/store/types';
import {
    GetTrucksLoadsReply_Truck,
    GetTrucksLoadsReply_Truck_Driver,
    GetTrucksLoadsReply_Truck_Load,
    GetTrucksLoadsReply_Truck_TimeOff,
    TrucksManifestsGetReply_Truck
} from '@proto/trucks';
import type { TrailerModel_Status, TrailerModel_Type_Icon } from '@proto/models/model_trailer';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';
import { DriverModel_Status } from '@proto/models/model_driver';

namespace Scheduling {
    export type TimeOffType = GetTrucksLoadsReply_Truck_TimeOff;

    export type TruckLoad = GetTrucksLoadsReply_Truck_Load;

    export type TruckDriver = GetTrucksLoadsReply_Truck_Driver;

    export type Driver = {
        driver_id: string;
        first_name: string;
        last_name: string;
        full_name: string;
        phone_number: string;
        status: DriverModel_Status;
        type_icon: DriverTypeModel_Icon;
        type_name: string;
        driver_friendly_id: number | string;
        selfie_thumb_url: string;
        dutyStatus:
            | 'on_duty'
            | 'off_duty'
            | 'driving'
            | 'sleeper'
            | 'yard_move'
            | 'personal_conveyance';
    } & GetTrucksLoadsReply_Truck_Driver;

    export type Trailer = {
        model: string;
        make: string;
        reference_id: string;
        trailer_id: string;
        status: TrailerModel_Status;
        type_name: string;
        type_icon: TrailerModel_Type_Icon;
        year: number;
    };

    export interface TruckRow extends Omit<GetTrucksLoadsReply_Truck, 'drivers'> {
        drivers: Driver[];
        trailer: Trailer | null;
    }

    export type TruckManifestRow = TrucksManifestsGetReply_Truck;

    export namespace Redux {
        export type SearchOptions = {
            period_id?: string;
            periodDays?: number;
            from_date?: string;
            end_date?: string;
        };

        export type InitialState = {
            search_options: Required<SearchOptions>;
            truck_online: { truck_id: string; online: boolean };
        };
    }
}

export default Scheduling;
