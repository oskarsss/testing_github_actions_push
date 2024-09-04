import { CurrencyCode } from '@proto/models/currency_code';

export const CURRENCY_SIGN: Record<CurrencyCode, string> = {
    [CurrencyCode.USD]        : '$',
    [CurrencyCode.EUR]        : '€',
    [CurrencyCode.CAD]        : 'C$',
    [CurrencyCode.MXN]        : 'MXN$',
    [CurrencyCode.UNSPECIFIED]: ''
};

export const CURRENCY: Record<CurrencyCode, string> = {
    [CurrencyCode.USD]        : 'USD',
    [CurrencyCode.EUR]        : 'EUR',
    [CurrencyCode.CAD]        : 'CAD',
    [CurrencyCode.MXN]        : 'MXN',
    [CurrencyCode.UNSPECIFIED]: 'USD'
};
