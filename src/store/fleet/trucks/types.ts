import { TruckType } from '@/models/fleet/trucks/truck-type';
import { TruckStatus } from '@/models/fleet/trucks/truck-status';
import TableTypes from '@/@core/components/table/types';
import { TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import { GetUsersReply_User } from '@proto/users';
import { DriverTypeModel } from '@proto/models/model_driver_type';
import { VendorModel_Vendor } from '@proto/models/model_vendor';
import type { PlateModel } from '@proto/models/model_plate';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { DriverModel_Driver } from '@proto/models/model_driver';

/** Trucks */
namespace TrucksTypes {
    export interface TruckRow extends TableTypes.Row, Omit<TruckModel_Truck, 'type' | 'status'> {
        status: TruckStatus;
        type: TruckType;
    }

    export type ConvertedTruckRow = TruckRow & {
        truck: string;
        trailer: TrailerModel_Trailer | null;
        trailerType: TrailerTypesGetReply_TrailerType | null;
        plate: PlateModel | null;
        vendor: VendorModel_Vendor | null;
        driver: DriverModel_Driver | null;
        secondDriver: DriverModel_Driver | null;
        driverType: DriverTypeModel | null;
        secondDriverType: DriverTypeModel | null;
    };
}

export default TrucksTypes;
