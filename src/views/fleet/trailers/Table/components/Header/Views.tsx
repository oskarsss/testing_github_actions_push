import { useEffect } from 'react';
import { useMainTrailers, useTrailers } from '@/store/fleet/trailers/hooks';
import TableViews from '@/@core/components/table-views/TableViews';

export default function TrailerViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = useMainTrailers();

    return (
        <TableViews
            views={views}
            selectedViewId={selected_view_id}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="TRAILERS"
        />
    );
}
