export const getFormattedCurrency = (amount: number | string): string =>
    new Intl.NumberFormat('en-US', {
        style   : 'currency',
        currency: 'USD'
    }).format(+amount);
