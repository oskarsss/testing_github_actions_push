import { getFormattedCurrency } from '@/utils/get-formatted-currency';

export default function CurrencyAmount({ amount }: { amount: string }) {
    const numericAmount = +amount.replace(/[$,]/g, '');

    return (
        <span style={{ color: numericAmount >= 0 ? 'inherit' : '#FF3A40' }}>
            {getFormattedCurrency(numericAmount)}
        </span>
    );
}
