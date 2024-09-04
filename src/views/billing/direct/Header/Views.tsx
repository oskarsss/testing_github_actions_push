import TableViews from '@/@core/components/table-views/TableViews';
import { useDirectInvoices } from '@/store/billing/hooks';

export default function HeaderViews() {
    const {
        views,
        selectedViewId,
        selectView,
        isLoading
    } = useDirectInvoices();

    return (
        <TableViews
            selectedViewId={selectedViewId}
            views={views}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="BILLING_DIRECT"
        />
    );
}
