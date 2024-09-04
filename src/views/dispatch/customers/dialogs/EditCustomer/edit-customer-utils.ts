import * as yup from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import { CustomerModel_Customer } from '@proto/models/model_customer';

export type DefaultValues = Omit<
    CustomerModel_Customer,
    'customerId' | 'customerFriendlyId' | 'address' | 'createdAt' | 'deleted' | 'addressCountry'
>;

const defaultValues: DefaultValues = {
    name                 : '',
    shortName            : '',
    contactName          : '',
    contactPhone         : '',
    contactFax           : '',
    contactEmail         : '',
    billingEmail         : '',
    addressLine1         : '',
    addressLine2         : '',
    addressCity          : '',
    addressState         : '',
    addressPostalCode    : '',
    customerPortalEnabled: false,
    customerPortalId     : ''
};

const editCustomerSchema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    name                 : yup.string().trim().required('Name is required'),
    shortName            : yup.string().trim().defined(),
    contactName          : yup.string().trim().defined(),
    contactPhone         : PhoneNumberValidation(false),
    contactFax           : yup.string().trim().defined(),
    contactEmail         : EmailValidation(false),
    billingEmail         : EmailValidation(false),
    addressLine1         : yup.string().trim().defined(),
    addressLine2         : yup.string().trim().defined(),
    addressCity          : yup.string().trim().defined(),
    addressState         : yup.string().trim().defined(),
    addressPostalCode    : yup.string().trim().defined(),
    customerPortalEnabled: yup.boolean().defined(),
    customerPortalId     : yup.string().trim().defined()
});

const editCustomerUtils = {
    defaultValues,
    editCustomerSchema
};

export default editCustomerUtils;
