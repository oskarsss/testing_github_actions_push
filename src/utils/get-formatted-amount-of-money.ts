const getFormattedAmountOfMoney = (
    amount = 0,
    numbersAfterDot = 2,
    locale = 'en-US',
    currency = 'USD'
) =>
    amount.toLocaleString(locale, {
        style                : 'currency',
        currency,
        minimumFractionDigits: numbersAfterDot,
        maximumFractionDigits: numbersAfterDot
    });

export default getFormattedAmountOfMoney;
