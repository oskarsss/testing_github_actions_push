import * as yup from 'yup';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { emailRegex } from '@/@core/fields/emailRegex';

export type DefaultValues = {
    phone_number: string;
    email: string;
    type: 1 | 2;
};
export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    phone_number: yup
        .string()
        .test('phone_number', 'Invalid phone number', (value, context) => {
            if (context.parent.type === 1) return true;
            return !!value && isValidPhoneNumber(value);
        })
        .defined(),
    email: yup
        .string()
        .test('phone_number', 'Invalid email', (value, context) => {
            if (context.parent.type === 2) return true;
            return !!value && emailRegex.test(value);
        })
        .defined(),
    type: yup.number<1 | 2>().defined()
});
export const default_value: DefaultValues = {
    phone_number: '',
    email       : '',
    type        : 2
};
