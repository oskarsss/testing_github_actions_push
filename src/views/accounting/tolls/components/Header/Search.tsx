import { useMainTolls } from '@/store/accounting/tolls/hooks';
import SearchField from '@/@core/components/search/search-field/SearchField';

export default function Search() {
    const {
        filter_id,
        isLoading
    } = useMainTolls();

    return (
        <SearchField
            isLoading={isLoading}
            filter_id={filter_id}
        />
    );
}
