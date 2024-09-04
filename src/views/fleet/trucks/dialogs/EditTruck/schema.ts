import * as yup from 'yup';
import { TruckModel_Type } from '@proto/models/model_truck';
import { EditTruckDefaultValues } from './EditTruckForm';

export const maxTruckYear = new Date().getFullYear() + 2;
export const minTruckYear = 1969;

export const edit_truck_schema: yup.ObjectSchema<EditTruckDefaultValues> = yup.object().shape({
    type: yup
        .number<TruckModel_Type>()
        .notOneOf([TruckModel_Type.UNSPECIFIED], 'Value must not be zero')
        .required('Type is required'),
    truckId: yup.string().defined(),
    vin    : yup.string().defined(),
    make   : yup.string().defined(),
    model  : yup.string().defined(),
    year   : yup
        .number()
        .nullable()
        .notRequired()
        .min(minTruckYear, `Year must be equal or greater than ${minTruckYear}`)
        .max(maxTruckYear, `Max year is ${maxTruckYear}`),
    plateId             : yup.string().defined(),
    referenceId         : yup.string().defined(),
    tollTransponder     : yup.string().defined(),
    color               : yup.string().defined(),
    vendorId            : yup.string().defined(),
    tags                : yup.array().defined(),
    fuelDiscountsEnabled: yup.boolean().defined()
});
