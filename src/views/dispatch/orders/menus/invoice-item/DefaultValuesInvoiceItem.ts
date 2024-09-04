export type DefaultValuesInvoiceItem = {
    category_id: string;
    amount_per_unit: string;
    units: number;
    description: string;
};

export const defaultValuesInvoiceItem: DefaultValuesInvoiceItem = {
    category_id    : '',
    amount_per_unit: '',
    units          : 1,
    description    : ''
};
