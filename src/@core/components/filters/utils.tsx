/* eslint-disable react/no-array-index-key */
/* eslint-disable no-param-reassign */
import { DEFAULT_FILTERS } from '@/utils/create-filters';
import { Fragment, ReactNode } from 'react';
import { IntlMessageKey } from '@/@types/next-intl';
import EntityFilters from './filter-button/types';
import { CompareFunctionsMap, FilterComponentsMap, FilterConfigMap, FilterKeys } from './types';

type RecordCounts<T extends string = string> = Record<T, number>;

type RecordAmounts<T extends string = string> = Record<T, string>;

export type FilterConfigCallback<C extends string = string, A extends string = string> = (
    counts?: RecordCounts<C>,
    amounts?: RecordAmounts<A>
) => EntityFilters.FilterConfig;

function createFilterConfig<T extends string = string>(callback: FilterConfigCallback<T, T>) {
    return callback;
}

export type OnlyFilters<T> = Omit<T, keyof typeof DEFAULT_FILTERS | 'orderBy'>;

export type OnlyFiltersKeys<T> = keyof OnlyFilters<T>;

function createFilterLabel(...args: ReactNode[]): ReactNode {
    return args.map((arg, index) => (
        <Fragment key={`${String(arg)}_${index}`}>
            {typeof arg === 'string' || typeof arg === 'number' ? (
                <span key={`${arg}_${index}`}>{arg}</span>
            ) : (
                arg
            )}
        </Fragment>
    ));
}

function sortByCount<T, K extends keyof T>(
    itemA: T,
    itemB: T,
    idKey: K,
    compareKey: K,
    counts?: RecordCounts
) {
    const keyA = itemA[idKey] as string;
    const keyB = itemB[idKey] as string;
    if (counts?.[keyA] || counts?.[keyB]) {
        const first = Number(counts?.[keyA]) || 0;
        const second = Number(counts?.[keyB]) || 0;
        return second > first ? 1 : -1;
    }
    return (itemA[compareKey] as string)
        ?.toLowerCase()
        .localeCompare((itemB[compareKey] as string)?.toLowerCase());
}

function getSortedFilterItems<T>(
    items: T[],
    idKey: keyof T,
    compareKey: keyof T,
    counts?: RecordCounts
) {
    return counts ? [...items].sort((a, b) => sortByCount(a, b, idKey, compareKey, counts)) : items;
}

function filterKey<T extends FilterKeys>(key: T): T {
    return key;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function createFiltersOrder<T>(_default_filters: T) {
    return function <P extends (keyof Omit<T, keyof typeof DEFAULT_FILTERS | 'orderBy'>)[]>(
        ...values: P): P {
        return values;
    };
}

function createFiltersLablesMap<T extends Partial<{ [P in FilterKeys]: IntlMessageKey }>>(map: T) {
    return map;
}

function createConfigMap<T extends FilterConfigMap<FilterConfigCallback>>(map: T) {
    return map;
}

function createComponentsMap<T extends FilterComponentsMap>(map: T) {
    return map;
}

function createExcludeDelete<T>(items: T[], counts?: RecordCounts, filterKey?: T) {
    return items
        .filter((item) => item !== (filterKey || 'deleted'))
        .reduce((acc, item) => acc + (counts?.[item as string] || 0), 0);
}

const createCompareFunctionsMap = <T extends CompareFunctionsMap>(map: T) => map;

type Filter = {
    filter_id: FilterKeys;
    value: string;
    counts: Record<string, number>;
    amounts?: Record<string, string>;
};

function getNestedValue(obj: any, path: string) {
    return path.split('.').reduce((acc, part) => {
        if (Array.isArray(acc)) {
            return acc.map((item) => item && item[part]);
        }
        return acc && acc[part];
    }, obj);
}

function calculateFilteredEntityCounts<T>(items: T[], filters: Filter[]) {
    return filters.map((filter) => {
        const {
            filter_id,
            value,
            amounts
        } = filter;

        const counts = items.reduce((countAcc: Record<string, number>, item) => {
            const filterValues = getNestedValue(item, value);
            if (Array.isArray(filterValues)) {
                filterValues.forEach((filterValue) => {
                    if (filterValue) {
                        countAcc[filterValue as string] =
                            (countAcc[filterValue as string] || 0) + 1;
                    }
                });
            } else if (filterValues) {
                countAcc[filterValues as string] = (countAcc[filterValues as string] || 0) + 1;
            }

            return countAcc;
        }, {});

        return {
            filter_id,
            counts,
            amounts
        };
    });
}

function calculateFilteredEntityAmount<T>(
    items: T[],
    keys: readonly { readonly amountKey: keyof T; readonly mainKey: keyof T }[]
) {
    const formatFunction = new Intl.NumberFormat('en-US', {
        style   : 'currency',
        currency: 'USD'
    }).format;

    return keys.reduce((acc, keys) => {
        const amounts = items.reduce((amountAcc, item) => {
            const value = item[keys.amountKey];
            const key = item[keys.mainKey];
            if (typeof value === 'number' && typeof key === 'string') {
                amountAcc[key] = (amountAcc[key] || 0) + value;
            }
            return amountAcc;
        }, {} as Record<string, number>);

        acc[keys.mainKey] = Object.fromEntries(
            Object.entries(amounts).map(([key, value]) => [key, formatFunction(value)])
        );
        return acc;
    }, {} as Record<keyof T, Record<string, string>>);
}

const getFiltersData = (
    filterIds: FilterKeys[],
    filterValues: string[],
    amounts?: Record<string, Record<string, string>>
): Filter[] =>
    filterIds.map((id, i) => ({
        filter_id: id,
        value    : filterValues[i],
        counts   : {},
        amounts:
            amounts && filterValues[i] && amounts[filterValues[i]]
                ? amounts[filterValues[i]]
                : undefined
    }));

export const $Filter = Object.freeze({
    configure       : createFilterConfig,
    createLabel     : createFilterLabel,
    sortByCount,
    sortItemsByCount: getSortedFilterItems,
    key             : filterKey,
    order           : createFiltersOrder,
    labelsConfig    : createFiltersLablesMap,
    configMap       : createConfigMap,
    componentsConfig: createComponentsMap,
    compareMap      : createCompareFunctionsMap,
    excludeDelete   : createExcludeDelete,
    calculateCounts : calculateFilteredEntityCounts,
    calculateAmounts: calculateFilteredEntityAmount,
    getFiltersData
});
