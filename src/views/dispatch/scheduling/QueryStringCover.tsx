import { prepareFilters } from '@/@core/components/query-string-cover';
import { qsStringify, useAppSearchParams } from '@/hooks/search-params-filters/useAppSearchParams';
import { compareFilters } from '@/hooks/search-params-filters/useUpdateSearchFilters';
import { default_trucks_filters, useTrucksManifests } from '@/store/dispatch/scheduling/hooks';
import { SchedulingActions } from '@/store/dispatch/scheduling/slice';
import { updateFilters } from '@/store/filters/actions';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { isEqual } from 'lodash';
import Router from 'next/router';
import React, { memo, useEffect, useRef } from 'react';
import { defaultSearchOptions } from './components/Header/Filters/defaultSearchOptions';

const page = 'scheduling';

function QueryStringCover() {
    const dispatch = useAppDispatch();
    const selectedSearchOptions = useAppSelector((state) => state.scheduling.search_options);
    const { selected_filters: selectedFilters } = useTrucksManifests();

    const searchParams = useAppSearchParams();
    const disabledListening = useRef(true);

    useEffect(() => {
        if (disabledListening.current) {
            const needToUpdateSearchOptions = !isEqual(selectedSearchOptions, defaultSearchOptions);
            let newFiltersQuery = {};
            if (!isEqual(selectedFilters, default_trucks_filters)) {
                newFiltersQuery = compareFilters(selectedFilters, default_trucks_filters);

                const newFiltersStringify = qsStringify({ ...newFiltersQuery });
                Router.replace(
                    {
                        search: newFiltersStringify
                    },
                    undefined,
                    { shallow: true }
                ).then(() => {
                    if (!needToUpdateSearchOptions) {
                        disabledListening.current = false;
                    }
                });
            }
            if (needToUpdateSearchOptions) {
                const searchOptions = compareFilters(selectedSearchOptions, defaultSearchOptions);

                const newSearchOptions = qsStringify({ ...searchOptions, ...newFiltersQuery });

                Router.replace(
                    {
                        search: newSearchOptions
                    },
                    undefined,
                    { shallow: true }
                ).then(() => {
                    disabledListening.current = false;
                });
            }
            disabledListening.current = false;
        }
    }, [selectedFilters, selectedSearchOptions]);

    useEffect(() => {
        if (!disabledListening.current) {
            const {
                from_date,
                end_date,
                periodDays,
                period_id,
                ...filters
            } = searchParams;

            const preparedFilters = prepareFilters(filters);

            const searchOptions = { ...defaultSearchOptions };

            if (from_date) {
                searchOptions.from_date = from_date as string;
            }
            if (end_date) {
                searchOptions.end_date = end_date as string;
            }
            if (periodDays) {
                searchOptions.periodDays = Number(periodDays);
            }

            if (period_id) {
                searchOptions.period_id = period_id as string;
            }

            dispatch(SchedulingActions.UpdateSearchOptions(searchOptions));
            dispatch(updateFilters(page, { ...default_trucks_filters, ...preparedFilters }));
        }
    }, [searchParams]);

    return null;
}

export default memo(QueryStringCover);
