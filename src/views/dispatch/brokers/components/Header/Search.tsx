import { useBrokers } from '@/store/dispatch/brokers/hooks';
import SearchField from '@/@core/components/search/search-field/SearchField';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useBrokers(false);

    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
            format_query_parameters={false}
        />
    );
}
