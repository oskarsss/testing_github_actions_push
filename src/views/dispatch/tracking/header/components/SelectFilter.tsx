import {
    useTrackingFilters,
    useTrackingPageData
} from '@/@grpcServices/services/loads-service/service-hooks/tracking-service-hooks';
import React from 'react';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { FiltersContainer } from 'src/@core/components/filters/selects-filters-group/styled';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';

export default function TrackingSelectFilter() {
    const { filter_id: filterId } = useTrackingFilters();

    const { filters } = useTrackingPageData();

    return (
        <FiltersContainer>
            <Filters
                updateType="redux"
                filters={filters}
                default_filters={default_loads_filters}
                filter_id={filterId}
                initialPage={0}
            />
        </FiltersContainer>
    );
}
