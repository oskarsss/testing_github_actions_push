import SearchAutocomplete from '@/@core/components/search/search-autocomplete/SearchAutocomplete';
import { SearchOptionType } from '@/@core/components/search/search-autocomplete/type';
import { useDirectInvoices } from '@/store/billing/hooks';
import { useRouter } from 'next/router';

const searchOptions: SearchOptionType[] = [
    { key: 'order_id:', value: 'Order ID' },
    { key: 'ref_id:', value: 'Ref ID' }
];

export default function Search() {
    const { filterId } = useDirectInvoices();
    const {
        query,
        asPath
    } = useRouter();
    const routerQuery = asPath !== '/billing/' ? query : null;
    return (
        <SearchAutocomplete
            routerQuery={routerQuery}
            placeholder="fields:search.placeholder"
            filter_id={filterId}
            search_options={searchOptions}
        />
    );
}
