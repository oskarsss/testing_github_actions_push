import TableViews from '@/@core/components/table-views/TableViews';
import { useAmazonInvoices } from '@/store/billing/hooks';

export default function HeaderViews() {
    const {
        views,
        selectedViewId,
        selectView,
        isLoading
    } = useAmazonInvoices();

    return (
        <TableViews
            selectedViewId={selectedViewId}
            views={views}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="BILLING_AMAZON"
        />
    );
}
