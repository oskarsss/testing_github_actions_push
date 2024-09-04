/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';
import { FormValues } from '@/views/fleet/plates/dialogs/EditPlate/EditPlateForm';
import { Country } from '@/models/country/country';

export const edit_plate_schema: yup.ObjectSchema<FormValues> = yup.object().shape({
    plate_id        : yup.string().required(),
    plate_company_id: yup.string().defined(),
    number          : yup.string().required(),
    country         : yup.string<Country>().required(),
    state           : yup.string().required(),
    vehicle_type    : yup.string().required(),
    owner_name      : yup.string().defined(),
    annual_cost     : yup.number().defined(),
    owned           : yup.boolean().required()
});
