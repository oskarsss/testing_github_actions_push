import SearchField from '@/@core/components/search/search-field/SearchField';
import { useGetPayoutsQuery } from '@/@grpcServices/services/payouts/payouts-service-hooks';
import React from 'react';

function Search() {
    const {
        filter_id,
        isLoading
    } = useGetPayoutsQuery();
    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
        />
    );
}

export default Search;
