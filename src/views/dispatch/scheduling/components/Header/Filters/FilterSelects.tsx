import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import { $Filter } from '@/@core/components/filters/utils';
import { default_trucks_filters, useTrucksManifests } from '@/store/dispatch/scheduling/hooks';

const labelsConfig = $Filter.labelsConfig({
    truck_status   : 'schedule:header.filters.labels.truck_status',
    trailer_type   : 'schedule:header.filters.labels.trailer_type',
    manifest_status: 'schedule:header.filters.labels.manifest_status'
});

export default function FilterSelects() {
    const {
        filters,
        filter_id,
        isLoading
    } = useTrucksManifests();
    return (
        <FiltersContainer>
            <Filters
                default_filters={default_trucks_filters}
                filter_id={filter_id}
                filters={filters}
                skeleton_count={6}
                loading={isLoading}
                labelsConfig={labelsConfig}
            />
        </FiltersContainer>
    );
}
