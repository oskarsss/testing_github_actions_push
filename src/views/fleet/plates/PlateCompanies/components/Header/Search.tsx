import { usePlatesCompanies } from '@/store/fleet/plates/hooks';
import SearchField from '@/@core/components/search/search-field/SearchField';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = usePlatesCompanies(false);

    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
            style={{
                marginRight: '10px'
            }}
        />
    );
}
