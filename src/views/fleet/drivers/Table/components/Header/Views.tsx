import { useDrivers } from '@/store/fleet/drivers/hooks';
import TableViews from '@/@core/components/table-views/TableViews';

export default function HeaderViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = useDrivers();

    return (
        <TableViews
            selectedViewId={selected_view_id}
            selectView={selectView}
            views={views}
            isLoading={isLoading}
            isScrollable
            page="DRIVERS"
        />
    );
}
