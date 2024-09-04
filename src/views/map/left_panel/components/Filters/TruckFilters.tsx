/* eslint-disable react/jsx-props-no-multi-spaces */
import React, { memo } from 'react';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { default_map_trucks_filters, useMapTrucks } from '@/views/map/hooks/trucks';
import { $Filter } from '@/@core/components/filters/utils';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import ClearAllFiltersButton from './ClearAllFiltersButton';

export const filter_id = 'map_trucks';

const labelsConfig = $Filter.labelsConfig({
    truck_type  : 'map:header.filters.labels.truck_type',
    load_status : 'map:header.filters.labels.load_status',
    trailer_type: 'map:header.filters.labels.trailer_type'
});

const TruckFilters = () => {
    const { availableFilters } = useMapTrucks();

    return (
        <>
            <FiltersContainer>
                <Filters
                    updateType="redux"
                    filter_id={filter_id}
                    default_filters={default_map_trucks_filters}
                    filters={availableFilters}
                    labelsConfig={labelsConfig}
                />
            </FiltersContainer>
            <ClearAllFiltersButton
                filter_id={filter_id}
                default_filters={default_map_trucks_filters}
            />
        </>
    );
};

export default memo(TruckFilters);
