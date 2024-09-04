import * as yup from 'yup';
import { TrailerOwnershipType } from '@/models/fleet/trailers/trailer-type';
import { EditTrailerDefaultValues } from './EditTrailerForm';

export const maxTrailerYear = new Date().getFullYear() + 2;
export const minTrailerYear = 1969;

export const edit_trailer_schema: yup.ObjectSchema<EditTrailerDefaultValues> = yup.object().shape({
    ownership_type    : yup.string<TrailerOwnershipType>().required(),
    trailer_type_id   : yup.string().required(),
    reference_id      : yup.string().defined(),
    plate_id          : yup.string().defined(),
    trailer_company_id: yup.string().defined(),
    vin               : yup.string().defined(),
    make              : yup.string().defined(),
    model             : yup.string().defined(),
    year              : yup
        .number()
        .nullable()
        .notRequired()
        .min(minTrailerYear, `Year must be equal or greater than ${minTrailerYear}`)
        .max(maxTrailerYear, `Max year is ${maxTrailerYear}`),
    tags                  : yup.array().defined(),
    company_rent_amount   : yup.number().defined(),
    company_deposit_amount: yup.number().defined(),
    driver_rent_amount    : yup.number().defined(),
    vendor_id             : yup.string().defined()
});
