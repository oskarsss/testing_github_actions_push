import * as yup from 'yup';
import { DocumentModel_DocumentEntityType } from '@proto/models/model_document';

export type DefaultValues = {
    title: string;
    entity_type: DocumentModel_DocumentEntityType;
    state_supported: boolean;
    state: string;
    expirable: boolean;
    number_supported: boolean;
    required: boolean;
    can_driver_view: boolean;
    can_driver_update: boolean;
    status_supported: boolean;
};

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    title            : yup.string().required(),
    entity_type      : yup.number<DocumentModel_DocumentEntityType>().required(),
    state            : yup.string().defined(),
    state_supported  : yup.boolean().required(),
    expirable        : yup.boolean().required(),
    number_supported : yup.boolean().required(),
    required         : yup.boolean().required(),
    can_driver_view  : yup.boolean().required(),
    can_driver_update: yup.boolean().required(),
    status_supported : yup.boolean().required()
});

export const default_values: DefaultValues = {
    title            : '',
    entity_type      : DocumentModel_DocumentEntityType.TRUCK,
    state            : '',
    expirable        : true,
    number_supported : false,
    state_supported  : false,
    required         : false,
    can_driver_view  : false,
    can_driver_update: false,
    status_supported : false
};
