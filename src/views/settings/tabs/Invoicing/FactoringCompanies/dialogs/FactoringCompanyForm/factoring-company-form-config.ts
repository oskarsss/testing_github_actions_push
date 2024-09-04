import * as yup from 'yup';
import { FactoringCompanyCreateRequest } from '@proto/factoring_companies';
import { PhoneNumberValidation } from '@/utils/schema-validators';
import { FactoringCompanyModel_Address } from '@proto/models/model_factoring_company';

export type FactoringCompanyDefaultValue = FactoringCompanyCreateRequest;

const defaultValues: FactoringCompanyDefaultValue = {
    name         : '',
    feePercentage: 0,
    contractEndAt: '',
    cutoffTime   : '',
    note         : '',
    phone        : '',
    fax          : '',
    ein          : '',
    noaFileId    : '',
    logoFileId   : '',
    address      : {
        line1     : '',
        line2     : '',
        city      : '',
        state     : '',
        postalCode: ''
    }
};

const schema: yup.ObjectSchema<FactoringCompanyDefaultValue> = yup.object().shape({
    name         : yup.string().trim().required(),
    feePercentage: yup.number().defined(),
    contractEndAt: yup.string().defined(),
    cutoffTime   : yup.string().defined(),
    note         : yup.string().defined(),
    phone        : PhoneNumberValidation(true),
    fax          : PhoneNumberValidation(false),
    ein          : yup.string().trim().defined(),
    noaFileId    : yup.string().defined(),
    logoFileId   : yup.string().defined(),
    address      : yup.object<FactoringCompanyModel_Address>().shape({
        line1     : yup.string().defined(),
        line2     : yup.string().defined(),
        city      : yup.string().defined(),
        state     : yup.string().defined(),
        postalCode: yup.string().defined()
    })
});

const FACTORING_COMPANY_FORM_CONFIG = {
    defaultValues,
    schema
};

export default FACTORING_COMPANY_FORM_CONFIG;
