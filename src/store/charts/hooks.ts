import { useRef } from 'react';
import ChartsGrpcService from '@/@grpcServices/services/charts.service';

export function useChartAgingReport() {
    const stableArray = useRef([]).current;

    const {
        data,
        isLoading,
        isError,
        error
    } = ChartsGrpcService.useGetChartAgingReportQuery(
        {},
        { refetchOnFocus: true }
    );

    return {
        items: data ? data.items : stableArray,
        isLoading,
        isError,
        error
    };
}

export function useChartTotalUnpaid() {
    const stableArray = useRef([]).current;

    const {
        data,
        isLoading,
        isError,
        error
    } = ChartsGrpcService.useGetChartTotalUnpaidQuery(
        {},
        { refetchOnFocus: true }
    );

    return {
        items              : data ? data.items : stableArray,
        totalUnpaid        : data?.totalUnpaid,
        totalUnpaidCurrency: data?.totalUnpaidCurrency,
        isLoading,
        isError,
        error
    };
}

export function useChartTotalOrders() {
    const stableArray = useRef([]).current;

    const {
        data,
        isLoading,
        isError,
        error
    } = ChartsGrpcService.useGetChartTotalOrdersQuery(
        {},
        { refetchOnFocus: true }
    );

    return {
        items: data ? data.items : stableArray,
        total: data?.ordersCount,
        isLoading,
        isError,
        error
    };
}

export function useChartTopDebtors() {
    const stableArray = useRef([]).current;

    const {
        data,
        isLoading,
        isError,
        error
    } = ChartsGrpcService.useGetChartTopDebtorsQuery(
        {},
        { refetchOnFocus: true }
    );

    return {
        items: data?.items || stableArray,
        total: data?.debtorsCount,
        isLoading,
        isError,
        error
    };
}
