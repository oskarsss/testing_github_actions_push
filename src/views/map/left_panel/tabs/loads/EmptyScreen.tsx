import { map_loads_default_filters } from '@/views/map/hooks/loads';
import EmptyState from '@/@core/components/loads-empty-state/EmptyState';
import * as React from 'react';
import { useMemo } from 'react';
import { useFilters } from '@/@core/components/filters/filter-button/hooks';
import { filter_id } from '@/views/map/left_panel/components/Filters/LoadsFilters';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MapActions } from '@/store/map/slice';

const filters_empty_keys = ['id', 'order', 'orderBy'];

export default function EmptyScreen() {
    const dispatch = useAppDispatch();
    const selected_filters = useFilters(filter_id, map_loads_default_filters);
    const search = useAppSelector((state) => state.map.search.loads);

    const is_empty_filters = useMemo(() => {
        const value = Object.entries(selected_filters);
        return value.every(([key, value]) => {
            if (filters_empty_keys.includes(key)) {
                return true;
            }

            if (Array.isArray(value)) {
                return value.length === 0;
            }

            if (key === 'search') {
                return search?.length === 0;
            }

            if (typeof value === 'string') {
                return value.length === 0;
            }

            if (key === 'page') {
                return value === map_loads_default_filters.page;
            }

            if (key === 'per_page') {
                return value === map_loads_default_filters.per_page;
            }

            return true;
        });
    }, [selected_filters, search]);

    const onClearFilters = () => {
        dispatch(MapActions.changeSearch({ type: 'loads', value: '' }));
    };

    return (
        <EmptyState
            size="small"
            filter_id={filter_id}
            is_empty_filters={is_empty_filters}
            default_filters={{ ...map_loads_default_filters, status: [] }}
            onClearFilters={onClearFilters}
        />
    );
}
