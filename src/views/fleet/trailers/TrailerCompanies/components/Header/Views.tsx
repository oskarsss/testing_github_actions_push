import TableViews from '@/@core/components/table-views/TableViews';
import { useTrailersCompanies } from '@/store/fleet/trailers/hooks';
import { useEffect } from 'react';

export default function CompaniesViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = useTrailersCompanies(false);

    useEffect(() => {
        if (views.length && !selected_view_id) {
            selectView(views[0].viewId);
        }
    }, [views, selected_view_id, selectView]);

    return (
        <TableViews
            views={views}
            selectedViewId={selected_view_id}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="TRAILER_COMPANIES"
        />
    );
}
