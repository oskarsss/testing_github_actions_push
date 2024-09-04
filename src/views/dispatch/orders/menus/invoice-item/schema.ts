import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { DefaultValuesInvoiceItem } from '@/views/dispatch/orders/menus/invoice-item/DefaultValuesInvoiceItem';

// eslint-disable-next-line import/prefer-default-export
export const schema: ObjectSchema<DefaultValuesInvoiceItem> = yup.object().shape({
    amount_per_unit: yup.string().required('required field'),
    units          : yup.number().required('required field'),
    description    : yup.string().defined(),
    category_id    : yup.string().min(1, 'Select a category').required()
});
