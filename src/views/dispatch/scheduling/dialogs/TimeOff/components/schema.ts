import * as yup from 'yup';
import { DefaultValues } from '@/views/dispatch/scheduling/dialogs/TimeOff/components/defaultValues';

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    start_at   : yup.string().required(),
    end_at     : yup.string().required(),
    description: yup.string().required()
});
