import SearchField from '@/@core/components/search/search-field/SearchField';
import { useFiltersIntegrations } from '@/store/settings/integrations/hooks';

export default function Search() {
    const { filter_id } = useFiltersIntegrations();
    return (
        <SearchField
            highlight_text_in_table={false}
            format_query_parameters={false}
            filter_id={filter_id}
            isLoading={false}
        />
    );
}
