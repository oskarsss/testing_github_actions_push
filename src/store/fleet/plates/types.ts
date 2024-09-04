import Documents from '@/store/documents/types';
import TableTypes from '@/@core/components/table/types';
import { PlateStatus } from '@/models/fleet/plates/plate-status';
import { Country } from '@/models/country/country';
import {
    PlateCompanyGetReply_PlateCompany,
    PlateCompanyRetrieveReply_PlateCompany
} from '@proto/plate.company';
import type { PlateModel } from '@proto/models/model_plate';
import { APIRequestBody, APIResponse } from '../../types';

/** Plates */
namespace PlatesTypes {
    export type VehicleType = 'truck' | 'trailer';
    export interface Row extends TableTypes.Row, Omit<PlateModel, 'status'> {
        status: PlateStatus;
        truckRefId: string;
        trailerRefId: string;
        truckId: string;
        trailerId: string;
    }

    export type CustomColumns = {
        vehicle?: string;
    };
    export interface PlateCompanyRow extends TableTypes.Row, PlateCompanyGetReply_PlateCompany {}

    export type PlateCompany = PlateCompanyRetrieveReply_PlateCompany;

    type PlateTrailer = {
        trailer_id: number;
        make: string;
        model: string;
        ownership_type: string;
        reference_id: string;
        year: number;
    };

    type PlateTruck = {
        truck_id: number;
        make: string;
        model: string;
        type: string;
        reference_id: string;
        year: number;
    };

    export type Plate = {
        plate_id: string;
        owner_name: string;
        number: string;
        country: Country;
        state: string;
        vehicle_type: string;
        annual_cost: number;
        owned: boolean;
        status: PlateStatus;
        created_at: string;
        plate_company_id: string;
        documents: Documents.List;
        trailer: PlateTrailer | null;
        truck: PlateTruck | null;
    };

    export namespace API {
        export namespace Plate {
            export namespace UpdateStatus {
                export type Response = APIResponse;

                export type Request = {
                    id: Plate['plate_id'];
                } & APIRequestBody<{
                    status: PlateStatus;
                }>;
            }

            export namespace Delete {
                export type Response = APIResponse;

                export type Request = string;
            }
        }
    }
}

export default PlatesTypes;
