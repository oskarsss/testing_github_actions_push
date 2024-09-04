import Filters from '@/@core/components/filters/selects-filters-group/Filters';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { FiltersContainer } from '@/@core/components/filters/selects-filters-group/styled';
import {
    useOrdersPageData,
    useOrdersPageFilters
} from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';

export default function LoadFilterSelect() {
    const { filter_id } = useOrdersPageFilters();
    const { filters } = useOrdersPageData();

    return (
        <FiltersContainer>
            <Filters
                updateType="redux"
                filters={filters}
                default_filters={default_loads_filters}
                filter_id={filter_id}
                initialPage={0}
            />
        </FiltersContainer>
    );
}
