import TableViews from '@/@core/components/table-views/TableViews';
import { useFactoringInvoices } from '@/store/billing/hooks';

export default function HeaderViews() {
    const {
        views,
        selectView,
        isLoading,
        selectedViewId
    } = useFactoringInvoices();

    return (
        <TableViews
            selectedViewId={selectedViewId}
            views={views}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="BILLING_FACTORING"
        />
    );
}
