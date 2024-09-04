import TableViews from '@/@core/components/table-views/TableViews';
import { useEffect } from 'react';
import { usePlatesCompanies } from '@/store/fleet/plates/hooks';

export default function CompaniesViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = usePlatesCompanies(false);

    // useEffect(() => {
    //     if (views.length && !selected_view_id) {
    //         selectView(views[0].view_id);
    //     }
    // }, [views, selected_view_id, selectView]);

    return (
        <TableViews
            views={views}
            selectedViewId={selected_view_id}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="PLATE_COMPANIES"
        />
    );
}
