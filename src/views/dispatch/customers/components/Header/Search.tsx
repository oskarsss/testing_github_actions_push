import { useMainCustomers } from '@/store/dispatch/customers/hooks';
import SearchField from '@/@core/components/search/search-field/SearchField';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useMainCustomers(false);

    return (
        <SearchField
            isLoading={isLoading}
            filter_id={filter_id}
        />
    );
}
