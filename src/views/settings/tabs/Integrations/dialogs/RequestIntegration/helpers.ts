import * as yup from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import { Control, ErrorOption } from 'react-hook-form';

export const default_value = {
    integration_name   : '',
    integration_website: '',
    integration_purpose: '',

    contact_name : '',
    contact_email: '',
    contact_phone: ''
};

export type DefaultValue = typeof default_value;

export const schema: yup.ObjectSchema<DefaultValue> = yup.object().shape({
    integration_name   : yup.string().required('Integration Name is required'),
    integration_website: yup.string().required('Integration Website is required'),
    integration_purpose: yup.string().defined(),

    contact_name : yup.string().required('Contact Name is required'),
    contact_email: EmailValidation(true),
    contact_phone: PhoneNumberValidation(false)
});

export type FieldsProps = {
    control: Control<DefaultValue>;
    errors: { [P in keyof DefaultValue]?: ErrorOption };
};
