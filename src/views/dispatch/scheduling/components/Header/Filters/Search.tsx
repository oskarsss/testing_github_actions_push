import React from 'react';
import { TestIDs } from '@/configs/tests';
import SearchField from '@/@core/components/search/search-field/SearchField';
import { useTrucksManifests } from '@/store/dispatch/scheduling/hooks';

const SchedulingSearchField = () => {
    const {
        filter_id,
        isLoading
    } = useTrucksManifests();

    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
            testID={TestIDs.pages.dispatchSchedule.fields.search}
            highlight_text_in_table={false}
            format_query_parameters
        />
    );
};

export default SchedulingSearchField;
