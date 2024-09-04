import { useMainFuelTransactions } from '@/store/accounting/fuel/hooks';
import TableViews from '@/@core/components/table-views/TableViews';
import { useEffect } from 'react';

export default function HeaderViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = useMainFuelTransactions();

    return (
        <TableViews
            selectedViewId={selected_view_id}
            views={views}
            selectView={selectView}
            isLoading={isLoading}
            isScrollable
            page="FUEL"
        />
    );
}
