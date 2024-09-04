import { useEffect } from 'react';
import { useTrucks } from '@/store/fleet/trucks/hooks';
import TableViews from '@/@core/components/table-views/TableViews';

export default function TrucksViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = useTrucks();

    // useEffect(() => {
    //     if (views.length && !selected_view_id) {
    //         selectView(views[0].view_id);
    //     }
    // }, [views, selected_view_id, selectView]);

    return (
        <TableViews
            selectedViewId={selected_view_id}
            views={views}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="TRUCKS"
        />
    );
}
