import * as yup from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';

export type CreateNewCompanyDefaultValues = {
    phone_number: string;
    email: string;
    dot: number;
    company_name: string;
    location_id_city: string;
    location_id_line1: string;
    location_id_line2: string;
    location_id_postal_code: string;
    location_id_state: string;
};

export const schema: yup.ObjectSchema<CreateNewCompanyDefaultValues> = yup.object().shape({
    phone_number           : PhoneNumberValidation(true),
    email                  : EmailValidation(true),
    dot                    : yup.number().required('Dot is required'),
    company_name           : yup.string().required('Company name is required'),
    location_id_city       : yup.string().required('City is required'),
    location_id_line1      : yup.string().required('Address Line 1 is required'),
    location_id_line2      : yup.string().defined(),
    location_id_postal_code: yup.string().required('Postal code is required'),
    location_id_state      : yup.string().required('State is required')
});

export const createNewCompanyDefaultValues: CreateNewCompanyDefaultValues = {
    phone_number           : '',
    email                  : '',
    dot                    : 0,
    company_name           : '',
    location_id_line2      : '',
    location_id_city       : '',
    location_id_line1      : '',
    location_id_postal_code: '',
    location_id_state      : ''
};
