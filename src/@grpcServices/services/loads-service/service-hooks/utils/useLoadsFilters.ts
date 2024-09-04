import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useCallback, useMemo } from 'react';
import { selectView as _selectView } from '@/store/pages/slice';
import { LoadsView, default_loads_filters } from '../../service-utils/loads-default-models';

export const useLoadsFilters = (
    page: string,
    views: LoadsView[],
    selectedViewStorageKey: string
) => {
    const dispatch = useAppDispatch();

    const selected_view_id = useAppSelector((state) => state.pages[page]?.toString() || '');

    const view = useMemo(
        () => (views?.length ? views.find((view) => view.view_id === selected_view_id) : null),
        [views, selected_view_id]
    );

    const filter_id = useMemo(() => `${page}_${selected_view_id}`, [page, selected_view_id]);

    const storeFilters = useAppSelector((state) => state.filters[filter_id]);

    const selected_filters = useMemo(
        () => ({ ...default_loads_filters, ...storeFilters }),
        [storeFilters]
    );

    const selectView = useCallback(
        (viewId: string) => {
            dispatch(_selectView({ page, view_id: viewId }));
        },
        [dispatch, page]
    );

    return {
        view,
        filter_id,
        selected_filters,
        views,
        selected_view_id,
        selectView
    };
};
