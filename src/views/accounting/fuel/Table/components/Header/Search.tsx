import SearchField from '@/@core/components/search/search-field/SearchField';
import { useMainFuelTransactions } from '@/store/accounting/fuel/hooks';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useMainFuelTransactions();

    return (
        <SearchField
            filter_id={filter_id}
            isLoading={isLoading}
        />
    );
}
