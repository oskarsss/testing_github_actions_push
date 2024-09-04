import { useFormContext } from 'react-hook-form';

export type DefaultValues = {
    truck_id: string;
    address: string;
    chain: string;
    datetime: string;
    discountAmount: number;
    referenceId: string;
    totalAmount: number;
    truckStop: string;
    totalDiscountedAmount: number;
    product: string | null;
    city: string;
    state: string;
    quantity: number;
};

export const default_values: DefaultValues = {
    truck_id             : '',
    address              : '',
    chain                : '',
    datetime             : '',
    discountAmount       : 0,
    referenceId          : '',
    totalAmount          : 0,
    totalDiscountedAmount: 0,
    truckStop            : '',
    product              : null,
    city                 : '',
    state                : '',
    quantity             : 0
};

export const useEditFuelTransactionForm = () => useFormContext<DefaultValues>();
