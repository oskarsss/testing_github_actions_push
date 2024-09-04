import * as yup from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';

export type FormValues = {
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    second_step_auth_enabled: boolean;
};

export const profile_schema: yup.ObjectSchema<FormValues> = yup.object().shape({
    first_name: yup
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(20, 'First name maximum 20 characters')
        .required(),
    last_name               : yup.string().defined(),
    phone_number            : PhoneNumberValidation(false),
    email                   : EmailValidation(true),
    second_step_auth_enabled: yup.boolean().defined()
});
