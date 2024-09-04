import {
    type ServiceLogItemModel_ItemWrite,
    ServiceLogItemModel_WarrantyCoverage
} from '@proto/models/model_service_log_item';
import * as yup from 'yup';

export type DefaultValues = ServiceLogItemModel_ItemWrite;

export const defaultValues: DefaultValues = {
    itemTypeId      : '',
    warrantyCoverage: ServiceLogItemModel_WarrantyCoverage.UNSPECIFIED,
    quantity        : 0,
    rate            : 0,
    name            : ''
};

const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    itemTypeId      : yup.string().required('Item Type is required'),
    warrantyCoverage: yup
        .number<ServiceLogItemModel_WarrantyCoverage>()
        .notOneOf(
            [ServiceLogItemModel_WarrantyCoverage.UNSPECIFIED],
            'Warranty Coverage is required'
        )
        .required('Warranty Coverage is required'),
    quantity: yup.number().required('Quantity is required'),
    rate    : yup.number().required('Rate is required'),
    name    : yup.string().defined()
});

const SERVICE_LOG_ITEM_UTILS = {
    defaultValues,
    schema
};

export default SERVICE_LOG_ITEM_UTILS;
