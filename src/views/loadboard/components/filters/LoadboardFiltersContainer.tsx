import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { useAppSelector } from '@/store/hooks';
import { loadboardSelectedSearchIdSelectors } from '@/store/loadboard/selectors';
import React, { useMemo } from 'react';
import LoadboardFilters from './LoadboardFilters';

function LoadboardFiltersContainer() {
    const selectedSearchId = useAppSelector(loadboardSelectedSearchIdSelectors);

    const {
        data,
        isLoading
    } = LoadboardGrpcService.useGetSearchesQuery({});

    const selectedSearch = useMemo(
        () => data?.searches.find((search) => search.searchId === selectedSearchId) || null,
        [data?.searches, selectedSearchId]
    );

    if (isLoading || !selectedSearch) {
        return null;
    }

    return <LoadboardFilters search={selectedSearch} />;
}

export default LoadboardFiltersContainer;
