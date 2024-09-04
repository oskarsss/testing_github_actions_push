import { memo } from 'react';
import { map_loads_default_filters, useMapLoads } from '@/views/map/hooks/loads';
import PageHeadersKit from '@/@core/ui-kits/page-headers';
import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import DateRange from '@/@core/components/data-range/DateRange';
import ClearAllFiltersButton from './ClearAllFiltersButton';

export const filter_id = 'map_loads';

const LoadsFilters = () => {
    const {
        availableFilters,
        selected_filters
    } = useMapLoads();

    return (
        <>
            <DateRange
                filterId={filter_id}
                selectedFilters={selected_filters}
                defaultStartAt={map_loads_default_filters.start_at}
                defaultEndAt={map_loads_default_filters.end_at}
            />
            <PageHeadersKit.Divider />
            <FiltersContainer>
                <Filters
                    updateType="redux"
                    default_filters={map_loads_default_filters}
                    filter_id={filter_id}
                    filters={availableFilters}
                    initialPage={0}
                />
            </FiltersContainer>
            <ClearAllFiltersButton
                filter_id={filter_id}
                default_filters={map_loads_default_filters}
            />
        </>
    );
};

export default memo(LoadsFilters);
