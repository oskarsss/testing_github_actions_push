import moment from 'moment-timezone';

export const format = 'YYYY-MM-DD';

export type DefaultValues = {
    amount: number;
    description: string;
    receiver_entity_type: string;
    paid_on: string;
};

export const default_values: DefaultValues = {
    amount              : 0,
    description         : '',
    receiver_entity_type: 'driver',
    paid_on             : moment().format(format)
};
