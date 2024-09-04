import * as yup from 'yup';
import { PhoneNumberValidation } from '@/utils/schema-validators';
import type { VendorUpdateRequest } from '@proto/vendors';
import { VendorModel_Type } from '@proto/models/model_vendor';

export type FormValues = Omit<VendorUpdateRequest, 'vendorId'>;

const edit_vendor_schema: yup.ObjectSchema<FormValues> = yup.object().shape({
    name              : yup.string().required('common:validation.required'),
    friendlyName      : yup.string().defined(),
    type              : yup.number<VendorModel_Type>().required('common:validation.required'),
    email             : yup.string().defined(),
    addressLine1      : yup.string().defined(),
    addressLine2      : yup.string().defined(),
    addressCity       : yup.string().defined(),
    addressState      : yup.string().defined(),
    addressPostalCode : yup.string().defined(),
    taxId             : yup.string().defined(),
    contactName       : yup.string().defined(),
    contactEmail      : yup.string().defined(),
    contactPhoneNumber: PhoneNumberValidation(false)
});

export default edit_vendor_schema;
