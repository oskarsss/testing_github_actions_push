import { useVendors } from '@/store/fleet/vendors/hooks';
import SearchField from '@/@core/components/search/search-field/SearchField';
import { TestIDs } from '@/configs/tests';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useVendors();

    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
            testID={TestIDs.pages.fleetVendors.fields.search}
        />
    );
}
