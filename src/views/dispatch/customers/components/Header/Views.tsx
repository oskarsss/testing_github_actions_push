import { useMainCustomers } from '@/store/dispatch/customers/hooks';
import TableViews from '../../../../../@core/components/table-views/TableViews';

export default function HeaderViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = useMainCustomers(false);

    return (
        <TableViews
            isScrollable={false}
            selectedViewId={selected_view_id}
            views={views}
            isLoading={isLoading}
            selectView={selectView}
            page="CUSTOMERS"
        />
    );
}
