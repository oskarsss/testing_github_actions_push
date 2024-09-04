import { ObjectSchema } from 'yup';
import * as yup from 'yup';
import { VehicleWarrantyModel_ItemWrite } from '@proto/models/model_vehicle_warranty';

export type DefaultCoverageItemValues = Omit<
    VehicleWarrantyModel_ItemWrite,
    'distanceKilometersRange'
>;

export const defaultValues: DefaultCoverageItemValues = {
    name              : '',
    periodMonthsRange : 0,
    distanceMilesRange: 0
};

export const coverageItemSchema: ObjectSchema<DefaultCoverageItemValues> = yup.object().shape({
    name              : yup.string().required(),
    periodMonthsRange : yup.number().defined(),
    distanceMilesRange: yup.number().defined()
});
