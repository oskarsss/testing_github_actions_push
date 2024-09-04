import EntityFilters from '@/@core/components/filters/filter-button/types';
import { isEqual } from 'lodash';
import { memo, useCallback } from 'react';
import { Skeleton } from '@mui/material';
import { IntlMessageKey } from '@/@types/next-intl';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import { filter_config_map } from '../config_map';
import FiltersItem from './FiltersItem';
import { useFilters } from '../filter-button/hooks';
import { FilterComponentsMap, FilterConfigMap, FilterKeys, IdToFilterEnumMap } from '../types';
import { FilterConfigCallback } from '../utils';

type Props = {
    filters: EntityFilters.Filter[];
    filter_id: string;
    default_filters: EntityFilters.FilterReducerState;
    loading?: boolean;
    skeleton_count?: number;
    componentsConfig?: FilterComponentsMap;
    labelsConfig?: Partial<Record<FilterKeys, IntlMessageKey>>;
    initialPage?: number;
    filterConfig?: FilterConfigMap<FilterConfigCallback>;
    updateType?: 'search' | 'redux';
};

const Filters = memo(
    ({
        filter_id,
        filters,
        default_filters,
        loading = false,
        skeleton_count,
        componentsConfig,
        labelsConfig,
        filterConfig,
        initialPage = 0,
        updateType = 'search'
    }: Props) => {
        const selected_filters = useFilters(filter_id, default_filters);

        const updateSearchFilters = useUpdateSearchFilters(default_filters);

        const updateFilters = useAdvancedUpdateFilters({ filter_id });

        const updateFilter = useCallback(
            (new_filter: (string | number)[], filter_type: string) => {
                if (updateType === 'redux') {
                    updateFilters({ [filter_type]: new_filter, page: initialPage });
                } else {
                    updateSearchFilters({ [filter_type]: new_filter, page: initialPage });
                }
            },
            [updateType, updateFilters, initialPage, updateSearchFilters]
        );
        return (
            <>
                {filters.map((filter) => {
                    const filterType = filter.filter_id as FilterKeys;
                    const Component = componentsConfig?.[filterType];

                    if (loading) {
                        return (
                            <Skeleton
                                key={filterType}
                                variant="rectangular"
                                width="140px"
                                height="40px"
                                sx={{
                                    maxWidth    : 140,
                                    borderRadius: '6px'
                                }}
                            />
                        );
                    }
                    if (Component) {
                        return (
                            <Component
                                key={filterType}
                                filter_id={filter_id}
                                value={selected_filters[filterType]}
                                onChange={updateFilter}
                            />
                        );
                    }

                    const filterId = IdToFilterEnumMap[filterType];
                    return (
                        <FiltersItem
                            filter_type={filterType}
                            counts={filter.counts}
                            amounts={filter.amounts}
                            key={filterType}
                            value={selected_filters[filterType]}
                            onChange={updateFilter}
                            getFilterConfig={
                                filterConfig?.[filterId] ?? filter_config_map[filterId]
                            }
                            label={labelsConfig?.[filterType]}
                        />
                    );
                })}
            </>
        );
    },
    isEqual
);

export default Filters;
