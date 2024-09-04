import * as yup from 'yup';

export type DefaultValues = {
    routingNumber: string;
    accountNumber: string;
    accountHolderName: string;
};

export const defaultValues: DefaultValues = {
    routingNumber    : '',
    accountNumber    : '',
    accountHolderName: ''
};

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    routingNumber    : yup.string().required('Routing number is required'),
    accountNumber    : yup.string().required('Account number is required'),
    accountHolderName: yup.string().required('Name on account is required')
});
