import { useTheme } from '@mui/material/styles';
import { Color } from '@/@core/theme/palette';

export const useColorsRange = (length: number, color: 'brand' | 'indigo') => {
    const theme = useTheme();

    const range: (keyof Color)[] = [700, 500, 300, 100, 50];

    const colors = Array.from(
        { length },
        (_, i) => theme.palette.colors[color]?.[range[i % range.length]]
    );

    return colors;
};

export const formatCurrency = (totalAmount: number, numbersAfterDot: number) =>
    totalAmount.toLocaleString('en-US', {
        style                : 'currency',
        currency             : 'USD',
        minimumFractionDigits: numbersAfterDot,
        maximumFractionDigits: numbersAfterDot
    });
