import type TableTypes from '@/@core/components/table/types';
import type { TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import type { DriverTypeModel } from '@proto/models/model_driver_type';
import type { TollGetReply_Toll } from '@proto/tolls';
import type { TruckModel_Truck } from '@proto/models/model_truck';
import type { TrailerModel_Trailer } from '@proto/models/model_trailer';
import type { DriverModel_Driver } from '@proto/models/model_driver';

/** Tolls */
namespace TollsTypes {
    export type TollRow = TollGetReply_Toll & TableTypes.Row;

    // {
    // toll_transaction_id: string;
    // transponder_number: string;
    // plate_number: string;
    // agency: string;
    // entry_plaza: string;
    // entry_datetime: string;
    // exit_plaza: string;
    // exit_datetime: string;
    // source: string;
    // posting_date: string;
    // amount: number;
    // settlement_id: string;
    // truck_id: string;
    // trailer_id: string;
    // driver_id: null | string;
    // unique_key: string;
    // truck_status: string;
    // settlement_status: string;
    // amount_formatted: string;
    // }

    export type ConvertedTollRow = TollRow & {
        driver: DriverModel_Driver | null;
        truck: TruckModel_Truck | null;
        trailer: TrailerModel_Trailer | null;
        trailerType: TrailerTypesGetReply_TrailerType | null;
        driverType: DriverTypeModel | null;
    };

    export type CustomColumns = {
        multi_select_checkbox?: boolean;
        equipment?: boolean;
        driver?: string;
    };
}

export default TollsTypes;
