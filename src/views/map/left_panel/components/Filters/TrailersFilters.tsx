import React, { memo } from 'react';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { map_trailers_default_filters, useMapTrailers } from '@/views/map/hooks/trailers';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import ClearAllFiltersButton from './ClearAllFiltersButton';

export const filter_id = 'map_trailers';

const TrailerFilters = () => {
    const { availableFilters } = useMapTrailers();

    return (
        <>
            <FiltersContainer>
                <Filters
                    updateType="redux"
                    filter_id={filter_id}
                    default_filters={map_trailers_default_filters}
                    filters={availableFilters}
                />
            </FiltersContainer>
            <ClearAllFiltersButton
                filter_id={filter_id}
                default_filters={map_trailers_default_filters}
            />
        </>
    );
};

export default memo(TrailerFilters);
