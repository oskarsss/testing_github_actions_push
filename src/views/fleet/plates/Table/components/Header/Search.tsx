import { usePlates } from '@/store/fleet/plates/hooks';
import SearchField from '@/@core/components/search/search-field/SearchField';
import { TestIDs } from '@/configs/tests';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = usePlates();
    return (
        <SearchField
            testID={TestIDs.pages.fleetPlates.fields.search}
            isLoading={isLoading}
            filter_id={filter_id}
        />
    );
}
