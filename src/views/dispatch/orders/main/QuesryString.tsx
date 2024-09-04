import QueryStringCover from '@/@core/components/query-string-cover';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import {
    default_loads_filters,
    DEFAULT_LOADS_VIEW_IDS
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';

export default function QueryStringCovering() {
    const {
        selected_filters,
        selected_view_id,
        views
    } = useOrdersPageFilters();

    return (
        <QueryStringCover
            selectedFilters={selected_filters}
            selectedViewId={selected_view_id}
            page="loads"
            views={views}
            defaultValues={default_loads_filters}
            defaultViewId={DEFAULT_LOADS_VIEW_IDS.DEFAULT}
            joinFilterId
        />
    );
}
