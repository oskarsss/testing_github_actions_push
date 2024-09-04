import SearchField from '@/@core/components/search/search-field/SearchField';
import { useServiceProviders } from '@/store/maitenance/service-providers/hooks';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useServiceProviders();

    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
        />
    );
}
