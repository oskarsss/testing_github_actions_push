import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';
import { LoadsTableTotals } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { formatMiles } from '@/utils/formatting';
import getFormattedAmountOfMoney from '@/utils/get-formatted-amount-of-money';
import { OrdersDataSelectors } from '../slice';

// TODO: DANIL - NEED TO GET AN AMOUNT IN RESPONSE
function convertCurrencyToNumber(currency: string): number {
    const cleanedString = currency.replace(/[$,]/g, '');

    const numericalValue = parseFloat(cleanedString);

    return numericalValue;
}

export const useOrdersTotals = (rows: number[]) => {
    const orders = useAppSelector(OrdersDataSelectors.getOrdersRows);
    return useMemo((): LoadsTableTotals => {
        const ratePerMileTotal = rows.reduce((acc, idx) => acc + (orders[idx].ratePerMile || 0), 0);

        const averageRatePerMile = ratePerMileTotal / rows.length;
        const totalDriverNet = rows.reduce(
            (acc, idx) => acc + (convertCurrencyToNumber(orders[idx].driverNet) || 0),
            0
        );
        const totalEmptyMiles = rows.reduce((acc, idx) => acc + (orders[idx].emptyMiles || 0), 0);

        const totalGrossAmount = rows.reduce((acc, idx) => acc + (orders[idx].grossAmount || 0), 0);

        const totalInvoiceAmount = rows.reduce(
            (acc, idx) => acc + (Number(convertCurrencyToNumber(orders[idx].invoiceAmount)) || 0),
            0
        );

        const totalLoadedMiles = rows.reduce(
            (acc, idx) => acc + (Number(orders[idx].loadedMiles) || 0),
            0
        );

        const totalGrossAmountFormatted = getFormattedAmountOfMoney(totalGrossAmount);
        const totalDriverNetFormatted = getFormattedAmountOfMoney(totalDriverNet);
        const averageRatePerMileFormatted = `$${averageRatePerMile.toFixed(2)}`;
        const totalInvoiceAmountFormatted = getFormattedAmountOfMoney(totalInvoiceAmount);

        return {
            averageRatePerMileFormatted,
            totalDriverNetFormatted,
            totalEmptyMiles,
            totalGrossAmountFormatted,
            totalInvoiceAmountFormatted,
            totalLoadedMiles
        };
    }, [orders, rows]);
};
