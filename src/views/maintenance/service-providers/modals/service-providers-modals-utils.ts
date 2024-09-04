import { ServiceProviderCreateRequest } from '@proto/service_providers';
import * as yup from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';

export type DefaultValues = ServiceProviderCreateRequest;

const defaultValues = {
    name             : '',
    contactName      : '',
    phone            : '',
    email            : '',
    fax              : '',
    addressLine1     : '',
    addressLine2     : '',
    addressCity      : '',
    addressState     : '',
    addressPostalCode: ''
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    name             : yup.string().trim().required('Name is required'),
    contactName      : yup.string().trim().defined(),
    phone            : PhoneNumberValidation(false),
    email            : EmailValidation(false),
    fax              : yup.string().trim().defined(),
    addressLine1     : yup.string().trim().defined(),
    addressLine2     : yup.string().trim().defined(),
    addressCity      : yup.string().trim().defined(),
    addressState     : yup.string().trim().defined(),
    addressPostalCode: yup.string().trim().defined()
});

const serviceProvidersModalUtils = {
    defaultValues,
    schema
};

export default serviceProvidersModalUtils;
