import * as yup from 'yup';
import type { ObjectSchema } from 'yup';
import { EmailValidation, PhoneNumberValidation } from '@/utils/schema-validators';
import { BrokerCreateRequest } from '@proto/brokers';

export type DefaultValues = Omit<BrokerCreateRequest, 'dot' | 'createdAt'>;

const defaultValues: DefaultValues = {
    mc         : 0,
    phoneNumber: '',
    email      : '',
    name       : '',
    address    : ''
};

const schema: ObjectSchema<DefaultValues> = yup.object().shape({
    mc         : yup.number().defined(),
    email      : EmailValidation(false),
    phoneNumber: PhoneNumberValidation(false),
    name       : yup.string().required('Name is required'),
    address    : yup.string().required('Address is required')
});

const createBrokerUtils = {
    defaultValues,
    schema
};

export default createBrokerUtils;
