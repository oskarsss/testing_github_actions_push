import { useSettlements } from '@/store/accounting/settlements/hooks/settlements';
import SearchField from '@/@core/components/search/search-field/SearchField';

export default function Search() {
    const {
        isLoading,
        filter_id
    } = useSettlements();

    return (
        <SearchField
            style={{
                flexShrink: 0
            }}
            isLoading={isLoading}
            filter_id={filter_id}
        />
    );
}
