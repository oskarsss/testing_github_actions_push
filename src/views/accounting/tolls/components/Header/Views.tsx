import TableViews from '@/@core/components/table-views/TableViews';
import { useMainTolls } from '@/store/accounting/tolls/hooks';

export default function TollsViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = useMainTolls();

    return (
        <TableViews
            selectedViewId={selected_view_id}
            views={views}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="TOLLS"
        />
    );
}
