import * as yup from 'yup';
import type { PlateCompanyCreateRequest } from '@proto/plate.company';

export const schema_add: yup.ObjectSchema<PlateCompanyCreateRequest> = yup.object().shape({
    name       : yup.string().min(2).required(),
    referenceId: yup.string().defined(),
    state      : yup.string().defined()
});

export const schema_edit: yup.ObjectSchema<PlateCompanyCreateRequest> = yup.object().shape({
    name       : yup.string().min(2).required(),
    referenceId: yup.string().defined(),
    state      : yup.string().defined()
});
