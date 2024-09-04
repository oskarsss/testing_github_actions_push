import * as yup from 'yup';
import { EmailValidation } from '@/utils/schema-validators';
import { DefaultValues } from './Form';

// eslint-disable-next-line import/prefer-default-export
export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    email   : EmailValidation(true),
    password: yup
        .string()
        .min(5, 'Password must be at least 5 characters')
        .max(40, 'Password maximum 40 characters')
        .required(),
    password_confirmation: yup
        .string()
        .oneOf(
            [yup.ref('password'), undefined],
            'Passwords must match'
        ) as yup.StringSchema<string>,
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), undefined], 'Passwords must match') as yup.StringSchema<string>
});
