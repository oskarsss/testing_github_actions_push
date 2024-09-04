import * as yup from 'yup';
import { PhoneNumberValidation, EmailValidation } from '@/utils/schema-validators';
import { DefaultValues } from '@/views/fleet/trailers/TrailerCompanies/dialogs/TrailerCompany/components/defaultValues';

export const default_values: DefaultValues = {
    name       : '',
    phoneNumber: '',
    email      : ''
};

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    name: yup.string().min(2).max(20)
        .required(),
    phoneNumber: PhoneNumberValidation(true),
    email      : EmailValidation(false)
});
