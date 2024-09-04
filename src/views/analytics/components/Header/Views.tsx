import { useAnalytics } from '@/store/analytics/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { AnalyticsActions } from '@/store/analytics/slice';
import TableViews from '../../../../@core/components/table-views/TableViews';

export default function HeaderViews() {
    const { views } = useAnalytics();
    const selected_view_id = useAppSelector((state) => state.analytics.selected_view_id);
    const dispatch = useAppDispatch();

    const selectView = (view_index: string) => {
        dispatch(AnalyticsActions.SelectView(view_index));
    };

    return (
        <TableViews
            selectedViewId={selected_view_id}
            views={views}
            selectView={selectView}
        />
    );
}
