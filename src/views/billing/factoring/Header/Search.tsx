import SearchAutocomplete from '@/@core/components/search/search-autocomplete/SearchAutocomplete';
import { SearchOptionType } from '@/@core/components/search/search-autocomplete/type';
import { useFactoringInvoices } from '@/store/billing/hooks';
import { useRouter } from 'next/router';

const searchOptions: SearchOptionType[] = [
    { key: 'order_id:', value: 'Order ID' },
    { key: 'ref_id:', value: 'Ref ID' }
];

export default function Search() {
    const {
        query,
        asPath
    } = useRouter();
    const { filterId } = useFactoringInvoices();

    const routerQuery = asPath !== '/billing/' ? query : null;

    return (
        <SearchAutocomplete
            filter_id={filterId}
            search_options={searchOptions}
            placeholder="fields:search.placeholder"
            routerQuery={routerQuery}
        />
    );
}
