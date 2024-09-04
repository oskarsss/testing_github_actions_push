import * as yup from 'yup';
import type { PlateCompanyRetrieveReply_PlateCompany } from '@proto/plate.company';

export type EditPlateCompanyDefaultValue = Omit<
    PlateCompanyRetrieveReply_PlateCompany,
    'plateCompanyId' | 'createdAt' | 'deleted'
>;

export const default_values: EditPlateCompanyDefaultValue = {
    name       : '',
    state      : '',
    referenceId: ''
};

export const schema: yup.ObjectSchema<EditPlateCompanyDefaultValue> = yup.object().shape({
    name       : yup.string().min(2).required(),
    referenceId: yup.string().defined(),
    state      : yup.string().defined()
});
