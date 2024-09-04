import * as yup from 'yup';

import { DefaultValues } from '@/views/dispatch/orders/menus/invoice-payment/DefaultValues';

// eslint-disable-next-line import/prefer-default-export
export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    amount              : yup.number().typeError('required field').required('required field'),
    receiver_entity_type: yup.string().required('required field'),
    paid_on             : yup.string().defined(),
    description         : yup.string().defined()
});
