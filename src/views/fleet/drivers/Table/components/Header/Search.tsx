import SearchField from '@/@core/components/search/search-field/SearchField';
import { useDrivers } from '@/store/fleet/drivers/hooks';
import { TestIDs } from '@/configs/tests';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useDrivers();

    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
            testID={TestIDs.pages.fleetDrivers.fields.search}
        />
    );
}
