import * as React from 'react';
import { useMemo } from 'react';
import EmptyState from '@/@core/components/loads-empty-state/EmptyState';
import { default_trucks_filters, useTrucksManifests } from '@/store/dispatch/scheduling/hooks';
import { FILTER_SWITCH_KEY } from '@/@core/components/filters/constants';

const filters_empty_keys = ['order', 'orderBy', 'page', 'per_page'];

export default function EmptyData() {
    const {
        selected_filters,
        filter_id
    } = useTrucksManifests();

    const is_empty_filters = useMemo(() => {
        const value = Object.entries(selected_filters);
        return value.every(([key, value]) => {
            if (selected_filters[FILTER_SWITCH_KEY]?.online) {
                return false;
            }

            if (filters_empty_keys.includes(key)) {
                return true;
            }

            if (Array.isArray(value)) {
                return value.length === 0;
            }

            if (typeof value === 'string') {
                return value.length === 0;
            }

            return true;
        });
    }, [selected_filters]);

    return (
        <EmptyState
            updateType="search"
            filter_id={filter_id}
            is_empty_filters={is_empty_filters}
            default_filters={default_trucks_filters}
        />
    );
}
