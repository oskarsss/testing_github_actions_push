import ServiceProvidersGrpcService from '@/@grpcServices/services/maitenance-service/service-providers.service';
import { useStableArray } from '@/hooks/useStable';
import { useFilteredRows, useSelectedFilters } from '@/@core/components/table/hooks/helpers';
import { useMemo } from 'react';
import { DEFAULT_FILTERS } from '@/utils/create-filters';

const page = 'service_providers';

export function useServiceProviders() {
    const {
        filter_id,
        selected_filters
    } = useSelectedFilters(page, {
        ...DEFAULT_FILTERS,
        orderBy: 'name'
    });

    const {
        data,
        ...rest
    } = ServiceProvidersGrpcService.useGetServiceProvidersQuery({});

    const serviceProviders = useStableArray(data?.providerItems);
    const filteredServiceProviders = useMemo(
        () => serviceProviders.filter((provider) => !provider.deleted),
        [serviceProviders]
    );

    const rowsData = useFilteredRows(filteredServiceProviders, selected_filters);

    return {
        serviceProviders: rowsData.rows,
        filter_id,
        ...rest
    };
}
