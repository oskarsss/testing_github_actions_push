import SearchAutocomplete from '@/@core/components/search/search-autocomplete/SearchAutocomplete';
import {
    SearchOptionType,
    SelectedFilters
} from '@/@core/components/search/search-autocomplete/type';
import { useTrackingFilters } from '@/@grpcServices/services/loads-service/service-hooks/tracking-service-hooks';
import { default_loads_filters } from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import { useRouter } from 'next/router';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';

const searchOptions: SearchOptionType[] = [
    { key: 'order_id:', value: 'Order ID' },
    { key: 'ref_id:', value: 'Ref ID' }
];

export default function TrackingSearchAutocomplete() {
    const {
        query,
        asPath
    } = useRouter();
    const { filter_id: filterId } = useTrackingFilters();

    const updateFilters = useUpdateFilters({ filter_id: filterId });
    const routerQuery = asPath !== APP_ROUTES_CONFIG.dispatch.orders.path ? query : null;

    const onChange = (filters: SelectedFilters) => {
        updateFilters(filters);
    };

    return (
        <SearchAutocomplete
            filter_id={filterId}
            routerQuery={routerQuery}
            search_options={searchOptions}
            number_of_first_page={1}
            customChangeFilters={onChange}
            placeholder="fields:search.placeholder"
        />
    );
}
