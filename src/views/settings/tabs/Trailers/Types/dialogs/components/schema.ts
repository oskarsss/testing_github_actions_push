import * as yup from 'yup';
import { TrailerTypesCreateRequest } from '@proto/trailer.types';
import { TrailerModel_Type_Icon } from '@proto/models/model_trailer';

const schema: yup.ObjectSchema<TrailerTypesCreateRequest> = yup.object().shape({
    code: yup.string().trim().required('Code field is required'),
    name: yup.string().trim().required('Name field is required'),
    icon: yup.number<TrailerModel_Type_Icon>().min(1, 'Trailer type icon is required').required()
});

export default schema;
