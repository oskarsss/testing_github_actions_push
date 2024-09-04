import TableTypes from '@/@core/components/table/types';
import { TrailerStatus } from '@/models/fleet/trailers/trailer-status';
import { TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import { DriverTypeModel } from '@proto/models/model_driver_type';
import { TrailerOwnershipType } from '@/models/fleet/trailers/trailer-type';
import { VendorModel_Vendor } from '@proto/models/model_vendor';
import type { DriverModel_Driver } from '@proto/models/model_driver';

import {
    TrailerCompanyGetReply_TrailerCompany,
    TrailerCompanyRetrieveReply_TrailerCompany
} from '@proto/trailer.company';
import type { PlateModel } from '@proto/models/model_plate';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';

namespace TrailersTypes {
    export type Type = {
        trailer_type_id: string;
        name: string;
        code: string;
        icon: string | null;
    };

    export type Trailer = TrailerModel_Trailer;

    export interface TrailerRow
        extends TableTypes.Row,
            Omit<TrailerModel_Trailer, 'ownershipType' | 'status'> {
        ownershipType: TrailerOwnershipType;
        status: TrailerStatus;
        reference_id: string;
    }

    export type ConvertedTrailerRow = TrailerRow & {
        truckId: string;
        truck: TruckModel_Truck | null;
        trailerType: TrailerTypesGetReply_TrailerType | null;
        plate: PlateModel | null;
        driver: DriverModel_Driver | null;
        driverId: string;
        driverType: DriverTypeModel | null;
        vendor: VendorModel_Vendor | null;
    };

    export type TrailerCustomColumns = {
        truck?: string;
    };

    export interface TrailerCompanyRow
        extends TableTypes.Row,
            TrailerCompanyGetReply_TrailerCompany {}

    export type TrailerCompany = TrailerCompanyRetrieveReply_TrailerCompany;
}

export default TrailersTypes;
