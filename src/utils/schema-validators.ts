import * as yup from 'yup';
import { emailRegex } from '@/@core/fields/emailRegex';
import { isValidPhoneNumber } from 'react-phone-number-input';

export const EmailValidation = (required?: boolean) => {
    if (required) {
        return yup
            .string()
            .max(100, 'Email maximum 100 characters')
            .email('Email is not valid')
            .test('email_test', 'Email is not valid', (value) => {
                if (!value) return true;
                return emailRegex.test(value);
            })
            .required('Email is required');
    }
    return yup
        .string()
        .max(100, 'Email maximum 100 characters')
        .email('Email is not valid')
        .test('email_test', 'Email is not valid', (value) => {
            if (!value) return true;
            return emailRegex.test(value);
        })
        .defined();
};

export const PhoneNumberValidation = (required?: boolean) => {
    if (required) {
        return yup
            .string()
            .test('IsValidPhoneNumber', 'Phone number is not valid', (value) => {
                if (value) {
                    return isValidPhoneNumber(value);
                }
                return true;
            })
            .required('Phone number is required');
    }
    return yup
        .string()
        .test('IsValidPhoneNumber', 'Phone number is not valid', (value) => {
            if (value) {
                return isValidPhoneNumber(value);
            }
            return true;
        })
        .defined();
};
