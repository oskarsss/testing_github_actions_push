import * as yup from 'yup';
import { SettlementCycleCreateRequest } from '@proto/settlement.cycle';

export type DefaultValues = SettlementCycleCreateRequest;
export const default_values: DefaultValues = {
    name                       : '',
    description                : '',
    periodWeeks                : 1,
    closingDay                 : 1,
    closingTime                : '12:00',
    default                    : false,
    payDateDaysAfterClosing    : 1,
    autoCreatePeriodSettlements: false,
    autoCreatePeriods          : false
};

export const schema: yup.ObjectSchema<DefaultValues> = yup.object().shape({
    name       : yup.string().required('Cycle Name field is required'),
    description: yup.string().defined(),
    periodWeeks: yup
        .number()
        .typeError('Please enter a whole number for Weeks in One Cycle.')
        .integer('Please enter a whole number for Weeks in One Cycle.')
        .required('Field is required.'),
    closingDay             : yup.number().required(),
    closingTime            : yup.string().required(),
    default                : yup.boolean().required(),
    payDateDaysAfterClosing: yup
        .number()
        .typeError('Please enter a whole number for Pay Date.')
        .integer('Please enter a whole number for Pay Date.')
        .required('Field is required.'),
    autoCreatePeriods          : yup.boolean().required(),
    autoCreatePeriodSettlements: yup.boolean().required()
});
