/* eslint-disable import/prefer-default-export */
import * as yup from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import { DriverModel_PayoutReceiver } from '@proto/models/model_driver';
import { EditDriverDefaultValues } from './EditDriverForm';

export const edit_driver_schema: yup.ObjectSchema<EditDriverDefaultValues> = yup.object().shape({
    friendlyName           : yup.string().defined(),
    firstName              : yup.string().trim().required('First Name is required'),
    middleName             : yup.string().trim().defined(),
    lastName               : yup.string().trim().defined(),
    phoneNumber            : PhoneNumberValidation(false),
    email                  : EmailValidation(false),
    addressLine1           : yup.string().trim().defined(),
    addressLine2           : yup.string().trim().defined(),
    addressCity            : yup.string().trim().defined(),
    addressState           : yup.string().trim().defined(),
    addressPostalCode      : yup.string().trim().defined(),
    dobDate                : yup.string().trim().defined(),
    settlementRevenueTypeId: yup.string().defined(),
    settlementCycleId      : yup.string().defined(),
    payoutReceiver         : yup.number<DriverModel_PayoutReceiver>().defined(),
    hireDate               : yup.string().defined(),
    driverTypeId           : yup.string().required('Type is required'),
    vendorId               : yup.string().defined(),
    tags                   : yup.array().defined(),
    fuelCardNumber         : yup.string().defined()
});
