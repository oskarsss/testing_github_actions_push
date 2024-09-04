import * as yup from 'yup';

import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';

// eslint-disable-next-line import/prefer-default-export
export const schema = yup.object().shape({
    first_name: yup
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(20, 'First name maximum 20 characters')
        .required(),
    last_name: yup
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(20, 'Last name maximum 20 characters')
        .required(),
    phone_number: PhoneNumberValidation(true),
    email       : EmailValidation(true),
    password    : yup
        .string()
        .min(5, 'Password must be at least 5 characters')
        .max(40, 'Password maximum 40 characters')
        .required(),
    terms_confirmed: yup
        .bool()
        .required('Please, read and confirm the Terms & Conditions and Privacy Policy')
        .oneOf([true], 'Please, read and confirm the Terms & Conditions and Privacy Policy')
});
