import moment from 'moment-timezone';

export type DefaultValues = {
    truck_id: string;
    amount: number;
    discount_amount: number;
    fuel_chain: string;
    date_time: string;
    state: string;
    city: string;
    product: string;
    reference_id: string;
    quantity: number;
};
export const default_values: DefaultValues = {
    truck_id       : '',
    amount         : 0,
    discount_amount: 0,
    fuel_chain     : '',
    date_time      : moment().format('YYYY-MM-DD HH:mm:ss'),
    product        : '',
    state          : '',
    city           : '',
    reference_id   : '',
    quantity       : 0
};
