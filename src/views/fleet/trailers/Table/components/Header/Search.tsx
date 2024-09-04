import { TestIDs } from '@/configs/tests';
import { useTrailers } from '@/store/fleet/trailers/hooks';
import SearchField from '@/@core/components/search/search-field/SearchField';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useTrailers();
    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
            testID={TestIDs.pages.fleetTrailers.fields.search}
        />
    );
}
