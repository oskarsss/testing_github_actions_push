import SearchAutocomplete from '@/@core/components/search/search-autocomplete/SearchAutocomplete';
import {
    SearchOptionType,
    SelectedFilters
} from '@/@core/components/search/search-autocomplete/type';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';

import { useRouter } from 'next/router';
import APP_ROUTES_CONFIG from '@/configs/app-routes-config';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';

const searchOptions: SearchOptionType[] = [
    { key: 'order_id:', value: 'Order ID' },
    { key: 'ref_id:', value: 'Ref ID' }
];

const LoadsSearchAutocomplete = () => {
    const {
        query,
        asPath
    } = useRouter();
    const { filter_id } = useOrdersPageFilters();

    const updateFilters = useUpdateFilters({ filter_id });
    const routerQuery = asPath !== APP_ROUTES_CONFIG.dispatch.orders.path ? query : null;

    const onChange = (filters: SelectedFilters) => {
        updateFilters(filters);
    };

    return (
        <SearchAutocomplete
            filter_id={filter_id}
            routerQuery={routerQuery}
            search_options={searchOptions}
            number_of_first_page={1}
            customChangeFilters={onChange}
            placeholder="fields:search.placeholder"
        />
    );
};

export default LoadsSearchAutocomplete;
