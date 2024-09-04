import TableViews from '@/@core/components/table-views/TableViews';
import { useVendors } from '@/store/fleet/vendors/hooks';

export default function VendorsViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = useVendors();

    return (
        <TableViews
            selectedViewId={selected_view_id}
            views={views}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="VENDORS"
        />
    );
}
