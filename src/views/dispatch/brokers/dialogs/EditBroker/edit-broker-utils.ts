import { ObjectSchema } from 'yup';
import * as yup from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import { BrokerUpdateRequest_Broker } from '@proto/brokers';

export type DefaultValues = Omit<BrokerUpdateRequest_Broker, 'brokerId' | 'active' | 'note'>;

const defaultValues: DefaultValues = {
    address     : '',
    dot         : 0,
    email       : '',
    mc          : 0,
    name        : '',
    phoneNumber : '',
    shortName   : '',
    billingEmail: ''
};

const schema: ObjectSchema<DefaultValues> = yup.object().shape({
    address     : yup.string().required('Address is required'),
    dot         : yup.number().defined(),
    email       : EmailValidation(false),
    mc          : yup.number().defined(),
    name        : yup.string().required('Name is required'),
    phoneNumber : PhoneNumberValidation(false),
    shortName   : yup.string().defined(),
    billingEmail: EmailValidation(false)
});

const editBrokerUtils = {
    defaultValues,
    schema
};

export default editBrokerUtils;
