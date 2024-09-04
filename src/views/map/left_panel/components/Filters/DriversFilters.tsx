import React, { memo } from 'react';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';

import { map_drivers_default_filters, useMapDrivers } from '@/views/map/hooks/drivers';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import ClearAllFiltersButton from './ClearAllFiltersButton';

export const driver_filter_id = 'map_drivers';

const DriversFilters = () => {
    const { availableFilters } = useMapDrivers();

    return (
        <>
            <FiltersContainer>
                <Filters
                    updateType="redux"
                    filter_id={driver_filter_id}
                    default_filters={map_drivers_default_filters}
                    filters={availableFilters}
                />
            </FiltersContainer>
            <ClearAllFiltersButton
                filter_id={driver_filter_id}
                default_filters={map_drivers_default_filters}
            />
        </>
    );
};

export default memo(DriversFilters);
