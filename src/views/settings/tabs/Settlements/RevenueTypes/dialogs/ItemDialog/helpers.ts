import * as yup from 'yup';
import { RevenueTypeLocale } from '@/models/settlements/settlement-revenue-types';

export type DefaultValues = {
    amount: number;
    type: RevenueTypeLocale;
};

export const default_values: DefaultValues = {
    amount: 0,
    type  : ''
};

export const schema = yup.object().shape({
    amount: yup.number().required(),
    type  : yup.string<RevenueTypeLocale>().required()
});
