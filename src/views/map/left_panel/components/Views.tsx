import TableViews, { ViewItem } from '@/@core/components/table-views/TableViews';

import { views_options } from '@/views/map/left_panel/views_options';
import { useMapSelectedView } from '@/store/map/hooks';
import { SelectedTab } from '@/store/map/slice';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function MapViews() {
    const { t } = useAppTranslation();
    const {
        selectView,
        selected_view_id
    } = useMapSelectedView();

    const handleChange = (view_id: string) => {
        selectView(view_id as SelectedTab);
    };

    const views = useMemo(
        () =>
            views_options.map((view) => ({
                ...view,
                name: t(view.name)
            })) as ViewItem[],
        [t]
    );

    return (
        <TableViews
            selectedViewId={selected_view_id}
            views={views}
            selectView={handleChange}
            iconPosition="start"
        />
    );
}
