import React from 'react';
import SearchAutocomplete from '@/@core/components/search/search-autocomplete/SearchAutocomplete';
import { useRouter } from 'next/router';
import {
    SearchOptionType,
    SelectedFilters
} from '@/@core/components/search/search-autocomplete/type';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import { useManifestsFilters } from '@/store/dispatch/manifests/hooks';

const searchOptions: SearchOptionType[] = [
    {
        key  : 'manifest_id:',
        value: 'Manifest ID'
    },
    {
        key  : 'order_id:',
        value: 'Order ID'
    }
];

export default function ManifestsSearchAutocomplete() {
    const {
        query,
        asPath
    } = useRouter();

    const { filter_id } = useManifestsFilters();
    const updateFilters = useUpdateFilters({ filter_id });

    const routerQuery = asPath !== '/dispatch/manifests' ? query : null;
    const onChange = (filters: SelectedFilters) => {
        updateFilters(filters);
    };

    return (
        <SearchAutocomplete
            filter_id={filter_id}
            routerQuery={routerQuery}
            search_options={searchOptions}
            number_of_first_page={0}
            customChangeFilters={onChange}
            placeholder="fields:search.placeholder"
        />
    );
}
