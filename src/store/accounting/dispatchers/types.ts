import DriversTypes from '@/store/fleet/drivers/types';
import TrailersTypes from '@/store/fleet/trailers/types';
import { TrailerModel_Type_Icon } from '@proto/models/model_trailer';
import { DriverTypeModel_Icon } from '@proto/models/model_driver_type';
import { TruckModel_Status, TruckModel_Type } from '@proto/models/model_truck';

namespace Dispatch {
    type Driver = {
        type_icon: DriverTypeModel_Icon;
        fullName: string;
        selfie_thumb_url: DriversTypes.DriverRow['selfieThumbUrl'];
    };

    type Trailer = {
        type_icon: TrailerModel_Type_Icon;
        referenceId: TrailersTypes.TrailerRow['referenceId'];
    };

    export type Truck = {
        truck_id: string;
        type: TruckModel_Type;
        status: TruckModel_Status;
        referenceId: string;
        year: number;
        model: string;
        driver?: Driver | null;
        trailer?: Trailer | null;
        emptyMiles: number;
        loadedMiles: number;
        rpm: number;
        gross: number;
    };

    export type Stats = {
        avgGross: number;
        avgRpm: number;
        grossAmount: number;
        emptyMiles: number;
        loadedMiles: number;
    };

    export type ConverterDispatcher = {
        dispatcherId: string;
        fullName: string | null;
        selfieThumbUrl: string | null;
        amountOfTrucks: number | null;
        activeTrucks: number;
        trucks: Truck[] | null;
        stats: Stats;
    };

    export namespace Redux {
        export type InitialState = {
            cycle_id: string;
            period_id: string;
            default_cycle_id: string;
            default_period_id: string;
        };

        export type RequestDataPayload = {
            cycle_id?: string;
            period_id?: string;
        };
    }
}

export default Dispatch;
