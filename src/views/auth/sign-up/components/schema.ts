import * as yup from 'yup';

import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';

export type SignUpDefaultValues = {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    password: string;
    dot: number;
    company_name: string;
    hear_about_us?: string;
    referral_code?: string;
    terms_of_service_and_privacy_policy_confirmed: boolean;
    location_id_city: string;
    location_id_line1: string;
    location_id_line2: string;
    location_id_postal_code: string;
    location_id_state: string;
};

const nameRegex = /^[a-zA-Zа-яА-ЯёЁ']+([-]?[a-zA-Zа-яА-ЯёЁ']+)?$/;
const spaceRegex = /^(?!.* )/;

export const schema: yup.ObjectSchema<SignUpDefaultValues> = yup.object().shape({
    first_name: yup
        .string()
        .test('first_name', 'Must not contain space', (value) => {
            if (!value) return true;
            return spaceRegex.test(value);
        })
        .test('first_name', 'Contains invalid characters', (value) => {
            if (!value) return true;
            return nameRegex.test(value);
        })
        .min(2, 'First name must be at least 2 characters')
        .max(20, 'First name maximum 20 characters')
        .required('First name is required'),
    last_name: yup
        .string()
        .test('last_name', 'Must not contain space', (value) => {
            if (!value) return true;
            return spaceRegex.test(value);
        })
        .test('last_name', 'Contains invalid characters', (value) => {
            if (!value) return true;
            return nameRegex.test(value);
        })

        .matches(/^(?!.* )/, 'Must not contain space')
        .min(2, 'Last name must be at least 2 characters')
        .max(20, 'Last name maximum 20 characters')
        .required('Last name is required'),
    phone_number: PhoneNumberValidation(true),
    email       : EmailValidation(true),
    password    : yup
        .string()
        .matches(/^(?!.* )/, 'Must not contain space')
        .min(5, 'Password must be at least 5 characters')
        .max(40, 'Password maximum 40 characters')
        .required('Password is required'),
    dot                                          : yup.number().required('Dot is required'),
    company_name                                 : yup.string().required('Company name is required'),
    location_id_city                             : yup.string().required('City is required'),
    location_id_line1                            : yup.string().required('Address Line 1 is required'),
    location_id_line2                            : yup.string().defined(),
    location_id_postal_code                      : yup.string().required('Postal code is required'),
    location_id_state                            : yup.string().required('State is required'),
    hear_about_us                                : yup.string().optional(),
    referral_code                                : yup.string().optional().max(25, 'maximum 25 characters'),
    terms_of_service_and_privacy_policy_confirmed: yup
        .bool()
        .required('Please, read and confirm the Terms & Conditions and Privacy Policy')
        .oneOf([true], 'Please, read and confirm the Terms & Conditions and Privacy Policy')
});

export const signUpDefaultValues: SignUpDefaultValues = {
    first_name                                   : '',
    last_name                                    : '',
    phone_number                                 : '',
    email                                        : '',
    password                                     : '',
    dot                                          : 0,
    company_name                                 : '',
    hear_about_us                                : '',
    referral_code                                : '',
    terms_of_service_and_privacy_policy_confirmed: false,
    location_id_line2                            : '',
    location_id_city                             : '',
    location_id_line1                            : '',
    location_id_postal_code                      : '',
    location_id_state                            : ''
};

export const hear_about_us_data = [
    {
        id  : 'Referral',
        name: 'Referral'
    },
    {
        id  : 'LinkedIn',
        name: 'LinkedIn'
    },
    {
        id  : 'Facebook',
        name: 'Facebook'
    },
    {
        id  : 'Twitter',
        name: 'Twitter'
    },
    {
        id  : 'Article',
        name: 'Article'
    },
    {
        id  : 'Blog',
        name: 'Blog'
    },
    {
        id  : 'Ad',
        name: 'Ad'
    },
    {
        id  : 'Search Engine',
        name: 'Search Engine'
    },
    {
        id  : 'Other',
        name: 'Other'
    }
];
