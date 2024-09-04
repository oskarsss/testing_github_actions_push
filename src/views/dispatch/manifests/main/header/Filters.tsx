import React, { memo } from 'react';
import FiltersGroup from '@/@core/components/filters/selects-filters-group/Filters';
import { useManifests, useManifestsFilters } from '@/store/dispatch/manifests/hooks';
import { manifestDefaultFilters } from '@/@grpcServices/services/manifests-service/manifest-service-hooks';

function Filters() {
    const { filter_id } = useManifestsFilters();
    const { filters } = useManifests();
    return (
        <FiltersGroup
            updateType="redux"
            default_filters={manifestDefaultFilters}
            filter_id={filter_id}
            filters={filters}
        />
    );
}

export default memo(Filters);
