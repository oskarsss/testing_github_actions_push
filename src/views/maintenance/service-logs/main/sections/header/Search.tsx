import SearchField from '@/@core/components/search/search-field/SearchField';
import { useServiceLogs } from '@/store/maitenance/service-logs/hooks';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useServiceLogs();

    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
        />
    );
}
