import { useEffect } from 'react';
import TableViews from '@/@core/components/table-views/TableViews';
import { useBrokers } from '@/store/dispatch/brokers/hooks';

export default function BrokersHeaderViews() {
    const {
        views,
        selected_view_id,
        selectView,
        isLoading
    } = useBrokers(false);

    return (
        <TableViews
            selectedViewId={selected_view_id}
            selectView={selectView}
            views={views}
            isLoading={isLoading}
            isScrollable
            page="BROKERS"
        />
    );
}
