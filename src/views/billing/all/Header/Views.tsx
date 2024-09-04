import TableViews from '@/@core/components/table-views/TableViews';
import { useAllInvoices } from '@/store/billing/hooks';

export default function HeaderViews() {
    const {
        views,
        selectedViewId,
        selectView,
        isLoading
    } = useAllInvoices();

    return (
        <TableViews
            selectedViewId={selectedViewId}
            views={views}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="BILLING_ALL"
        />
    );
}
