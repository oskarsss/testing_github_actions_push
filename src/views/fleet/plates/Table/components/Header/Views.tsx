import TableViews from '@/@core/components/table-views/TableViews';
import { usePlates } from '@/store/fleet/plates/hooks';

export default function HeaderViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = usePlates();

    return (
        <TableViews
            selectedViewId={selected_view_id}
            views={views}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="PLATES"
        />
    );
}
