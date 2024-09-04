import SearchField from '@/@core/components/search/search-field/SearchField';
import { useTrucks } from '@/store/fleet/trucks/hooks';
import { TestIDs } from '@/configs/tests';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useTrucks();

    return (
        <SearchField
            testID={TestIDs.pages.fleetTrucks.fields.search}
            filter_id={filter_id}
            isLoading={isLoading}
        />
    );
}
