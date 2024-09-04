/* eslint-disable max-len */
import * as yup from 'yup';
import {
    SettlementTransactionCategoryModel_EntityType,
    SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency,
    SettlementTransactionCategoryModel_Type
} from '@proto/models/model_settlement.transaction_category';

export type DefaultValues = {
    name: string;
    required: boolean;
    recurring: boolean;
    driverTypes: string[];
    entityType: SettlementTransactionCategoryModel_EntityType;
    type: SettlementTransactionCategoryModel_Type;
    recurringTransactionCyclePeriodFrequency: SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency;
};

// export const driver_types = [
//     { id: 'owner_operator', title: 'Owner Operator' },
//     { id: 'company_driver', title: 'Company Driver' },
//     { id: 'lease_driver', title: 'Lease Driver' },
//     { id: 'all', title: 'All' }
// ];

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    name       : yup.string().required('Should not be empty'),
    required   : yup.boolean().required(),
    recurring  : yup.boolean().required(),
    driverTypes: yup
        .array()
        .min(1, 'Should be chosen at least 1')
        .of(yup.string().defined())
        .defined(),
    entityType: yup
        .number<SettlementTransactionCategoryModel_EntityType>()
        .min(1, 'Should be chosen at least 1')
        .required(),
    type: yup.number<SettlementTransactionCategoryModel_Type>().required(),

    recurringTransactionCyclePeriodFrequency: yup
        .number<SettlementTransactionCategoryModel_RecurringTransactionCyclePeriodFrequency>()
        .min(1, 'The field is required')
        .required('The field is required')
});
