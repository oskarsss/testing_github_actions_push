import { useCallback } from 'react';
import { views_options } from '@/views/map/left_panel/views_options';
import { useAppDispatch, useAppSelector } from '../hooks';
import { selectView } from '../pages/slice';
import { SelectedTab } from './slice';

export function useMapSelectedView() {
    const dispatch = useAppDispatch();
    const view_id = useAppSelector((state) => state.pages.map) as SelectedTab;
    const selectMapView = useCallback(
        (view_id: SelectedTab) => {
            dispatch(selectView({ page: 'map', view_id }));
        },
        [dispatch]
    );

    return {
        selected_view_id: view_id || views_options[0].viewId,
        selectView      : selectMapView
    };
}
