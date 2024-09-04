import * as yup from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import { InvoicingCompanyCreateRequest } from '@proto/invoicing_company';

export type InvoicingCompanyDefaultValue = {
    name: string;
    phone: string;
    logoUrl: string;
    defaultFactoringCompanyId: string;
    ccEmails: string[];
    paymentInstructions: string;
    paymentTerms: string;
    addressLine1: string;
    addressLine2: string;
    addressCity: string;
    addressState: string;
    addressPostalCode: string;
    documents: string[];
    email: string;
};

const defaultValues: InvoicingCompanyDefaultValue = {
    ...InvoicingCompanyCreateRequest.create(),
    documents: []
};

const schema: yup.ObjectSchema<InvoicingCompanyDefaultValue> = yup.object().shape({
    name                     : yup.string().trim().required('This field is required'),
    phone                    : PhoneNumberValidation(true),
    logoUrl                  : yup.string().defined(),
    defaultFactoringCompanyId: yup.string().defined(),
    ccEmails                 : yup.array().of(yup.string().defined()).defined(),
    paymentInstructions      : yup.string().defined(),
    paymentTerms             : yup.string().required('This field is required'),
    addressLine1             : yup.string().required('This field is required'),
    addressLine2             : yup.string().defined(),
    addressCity              : yup.string().required('This field is required'),
    addressState             : yup.string().required('This field is required'),
    addressPostalCode        : yup.string().required('This field is required'),
    documents                : yup.array().of(yup.string().defined()).defined(),
    email                    : EmailValidation(true)
});

const INVOICING_COMPANY_FORM_CONFIG = {
    defaultValues,
    schema
};

export default INVOICING_COMPANY_FORM_CONFIG;
