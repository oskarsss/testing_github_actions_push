import { useRecurringTransactions } from '@/store/accounting/settlements/hooks/recurring-transactions';
import SearchField from '@/@core/components/search/search-field/SearchField';

export default function Search() {
    const {
        isLoading,
        drivers_filter_id
    } = useRecurringTransactions(false);

    return (
        <SearchField
            format_query_parameters={false}
            filter_id={drivers_filter_id}
            isLoading={isLoading}
        />
    );
}
