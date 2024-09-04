import { useStableArray } from '@/hooks/useStable';
import { useMemo } from 'react';
import RevenueTypesGrpcService from '@/@grpcServices/services/settlements-service/revenue-types.service';

export function useActiveRevenueTypes() {
    const {
        data,
        isError,
        isLoading
    } = RevenueTypesGrpcService.useGetRevenueTypesQuery({});

    const revenue_types = useMemo(() => {
        if (!data?.revenueTypes) return [];
        return data.revenueTypes.filter((revenue_type) => revenue_type.active);
    }, [data?.revenueTypes]);

    return {
        revenue_types,
        isError,
        isLoading
    };
}

export function useRevenueTypes() {
    const {
        data,
        isError,
        isLoading
    } = RevenueTypesGrpcService.useGetRevenueTypesQuery({});

    const revenue_types = useStableArray(data?.revenueTypes);

    return {
        revenue_types,
        isError,
        isLoading
    };
}
