import Router, { useRouter } from 'next/router';
import { useCallback } from 'react';
import { qsStringify, useAppSearchParams } from './useAppSearchParams';

type Filters = Record<string, any>;

export const compareFilters = (filters: Filters, defaultFilters: Filters): Partial<Filters> =>
    filters
        ? Object.keys(filters).reduce<Partial<Filters>>((uniqueFilters, key) => {
            if (filters[key] !== defaultFilters?.[key]) {
                // eslint-disable-next-line no-param-reassign
                uniqueFilters[key] = filters[key];
            }
            return uniqueFilters;
        }, {})
        : {};

function useUpdateSearchFilters(defaultFilters?: object) {
    const searchParams = useAppSearchParams();

    return useCallback(
        (filters: object) => {
            const {
                viewId,
                ...searchFilters
            } = searchParams;

            let newFilters = filters;
            if (defaultFilters) {
                newFilters = compareFilters({ ...searchFilters, ...filters }, defaultFilters);
            }

            const newParams = viewId ? { viewId, ...newFilters } : newFilters;

            Router.push(
                {
                    search: qsStringify(newParams)
                },
                undefined,
                { shallow: true }
            );

            // }
        },
        [defaultFilters, searchParams]
    );
}

export default useUpdateSearchFilters;
