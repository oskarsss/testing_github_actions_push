import * as yup from 'yup';

export type DefaultValues = {
    name: string;
    deduct_fuel: boolean;
    deduct_tolls: boolean;
    default: boolean;
    attach_document_type_ids: string[];
};

export const default_values: DefaultValues = {
    name                    : '',
    deduct_fuel             : false,
    deduct_tolls            : false,
    default                 : false,
    attach_document_type_ids: []
};

export const schema = yup.object().shape({
    name                    : yup.string().required(),
    deduct_fuel             : yup.boolean().required(),
    deduct_tolls            : yup.boolean().required(),
    default                 : yup.boolean().required(),
    attach_document_type_ids: yup.array().of(yup.string().defined()).defined()
});
