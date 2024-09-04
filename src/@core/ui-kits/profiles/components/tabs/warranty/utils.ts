import { WarrantyCreateRequest } from '@proto/vehicle_warranty';
import { ObjectSchema } from 'yup';
import * as yup from 'yup';
import { VehicleWarrantyModel_WarrantyPeriodUnitsEnum } from '@proto/models/model_vehicle_warranty';

export type DefaultWarrantyValues = Pick<
    WarrantyCreateRequest,
    'startedAt' | 'periodUnits' | 'distanceMiles' | 'period'
>;

export const warrantySchema: ObjectSchema<DefaultWarrantyValues> = yup.object().shape({
    startedAt    : yup.string().defined(),
    periodUnits  : yup.number<VehicleWarrantyModel_WarrantyPeriodUnitsEnum>().defined(),
    distanceMiles: yup.number().defined(),
    period       : yup.number().defined()
});

export const kindOfWarrantyPeriod = VehicleWarrantyModel_WarrantyPeriodUnitsEnum;
