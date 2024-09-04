import * as yup from 'yup';
import { ObjectSchema } from 'yup';
import { EditLoadDefaultValues } from './EditLoadForm';

export const edit_load_schema: ObjectSchema<EditLoadDefaultValues> = yup.object().shape({
    note        : yup.string().defined(),
    equipment_id: yup.string().defined(),
    type_id     : yup.string().defined(),
    weight      : yup.number().defined(),
    commodity   : yup.string().defined()
});
