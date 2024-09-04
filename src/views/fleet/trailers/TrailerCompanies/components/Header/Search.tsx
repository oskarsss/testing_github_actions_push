import { useTrailersCompanies } from '@/store/fleet/trailers/hooks';
import SearchField from '@/@core/components/search/search-field/SearchField';
import { TestIDs } from '@/configs/tests';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useTrailersCompanies(false);

    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
            format_query_parameters={false}
            testID={TestIDs.pages.trailersCompanies.fields.search}
        />
    );
}
