/* eslint-disable max-len */
import { $Filter } from '@/@core/components/filters/utils';
import { useServiceProvidersMap } from '@/store/hash_maps/hooks';
import { useMemo } from 'react';

export const SERVICE_LOG_PROVIDER_FILTER_CONFIG = $Filter.configure((counts) => {
    const serviceProviders = useServiceProvidersMap();

    const filteredServiceProviders = useMemo(
        () => Object.values(serviceProviders).filter((serviceProvider) => !serviceProvider.deleted),
        [serviceProviders]
    );

    const filterItems = useMemo(
        () =>
            $Filter
                .sortItemsByCount(filteredServiceProviders, 'serviceProviderId', 'name', counts)
                .map(({
                    serviceProviderId,
                    name
                }) => ({
                    label      : name,
                    searchValue: name,
                    value      : serviceProviderId,
                    count      : counts?.[serviceProviderId]
                })),
        [counts, filteredServiceProviders]
    );

    return { filterItems, label: 'entity:provider' };
});
