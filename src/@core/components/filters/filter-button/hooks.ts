/* eslint-disable consistent-return */
/* eslint-disable array-callback-return */
import { getSorting, stableSort } from '@/utils/sorting';
import { useAppSelector } from '@/store/hooks';
import TableTypes from '@/@core/components/table/types';
import Filters from '@/@core/components/filters/filter-button/types';
import {
    type CompareFunctionsMap,
    type FilterKeys,
    IdToFilterEnumMap,
    PbFilterTypeConfigMap
} from '@/@core/components/filters/types';
import { createSelector } from '@reduxjs/toolkit';
import type { RootState } from '@/pages/_app';
import moment from 'moment-timezone';
import objectEntries from '@/utils/objectEntries';
import { useMemo } from 'react';
import { FILTER_EMPTY_VALUE, FILTER_SWITCH_KEY } from '../constants';

const getColumnTotal = (rows: Record<string, any>[], column: string): number =>
    rows.reduce((acc, row) => {
        const rowValue = row[column];

        return typeof rowValue === 'number' ? acc + rowValue : acc;
    }, 0);

/**
 * @template T
 * @param {T} rows
 * @param {*} view
 * @returns {string}
 */

export function getTotals<RowsType extends Record<string, any> = Record<string, any>>(
    rows: RowsType[],
    view: TableTypes.ViewColumn[]
): Record<string, string> {
    const formatFunction = new Intl.NumberFormat('en-US', {
        style   : 'currency',
        currency: 'USD'
    }).format;

    return view
        .filter((item) => item.footerTotal)
        .map((item) => item.columnId)
        .reduce((acc, column) => {
            acc[column] = formatFunction(getColumnTotal(rows, column));

            return acc;
        }, {} as Record<string, string>);
}

const createFilterSelector = <T>(filter_id: string, default_filters: T) =>
    createSelector([(state: RootState) => state.filters[filter_id]], (filters) => ({
        ...default_filters,
        ...filters
    }));

export function useFilters<T>(id: string, default_filters: T): T {
    const filterSelector = useMemo(
        () => createFilterSelector<T>(id, default_filters),
        [id, default_filters]
    );

    return useAppSelector(filterSelector);
}

export function useFiltersWithoutQueryString<T>(id: string, default_filters: T): T {
    const filterSelector = useMemo(
        () => createFilterSelector<T>(id, default_filters),
        [id, default_filters]
    );

    return useAppSelector(filterSelector);
}

const simpleCompare = (target: unknown, filter: unknown): boolean => {
    const isNotSameType = typeof target !== typeof filter;

    if (!target && isNotSameType && filter !== FILTER_EMPTY_VALUE) {
        return false;
    }

    if (isNotSameType) {
        return true;
    }

    if (filter === FILTER_EMPTY_VALUE) {
        return Array.isArray(target) ? !target.length : !target;
    }

    switch (typeof target) {
    case 'object': {
        if (Array.isArray(target)) {
            if (Array.isArray(filter)) {
                return filter.length ? target.some((item) => filter.includes(item)) : true;
            }

            return target.some((item) => item === filter);
        }

        return target === filter;
    }
    default: {
        return target === filter;
    }
    }
};

const getEntitiesCompareFunction =
    (propertyField: string) =>
        (target: { [x: string]: string }[], filter: string[]): boolean => {
            if (filter.length === 1) {
                return target.some((tag) => tag[propertyField] === filter[0]);
            }

            return filter.length ? target.some((tag) => filter.includes(tag[propertyField])) : true;
        };

const getDateComparisonResult = (start: number, end: number, value: number) => {
    if (start && end) {
        return start <= value && value <= end;
    }

    if (start) {
        return start <= value;
    }

    return end ? value <= end : true;
};

const yearCompare = (target: string | number, [startYear, endYear]: (string | number)[]): boolean =>
    getDateComparisonResult(+startYear, +endYear, +target);

const dateCompare = (
    target: moment.MomentInput,
    [startDate, endDate]: moment.MomentInput[]
): boolean => {
    const value = target && moment.utc(target).valueOf();

    return value
        ? getDateComparisonResult(
            startDate ? moment.utc(startDate).startOf('day').valueOf() : 0,
            endDate ? moment.utc(endDate).endOf('day').valueOf() : 0,
            value
        )
        : true;
};

const compareFuncMap = {
    tags : getEntitiesCompareFunction('tagId'),
    users: getEntitiesCompareFunction('userId'),
    year : yearCompare,
    date : dateCompare
};

const getFilteredRowsBySearch = <T>(rows: T[], searchValue: string) =>
    rows.filter((row) =>
        Object.values(row as object).some((rowValue) =>
            JSON.stringify(rowValue).toLowerCase().includes(searchValue)));

const getAppliedFilters = (filters: Record<string, any>, availableFilters?: string[]) =>
    (availableFilters
        ? objectEntries(filters).filter(([key]) => availableFilters.includes(key as string))
        : objectEntries(filters)
    ).filter(([, value]) => (Array.isArray(value) ? value.length : !!value));

const getConfig = (filterId: string | number, compareFunctionsMap?: CompareFunctionsMap) => {
    if (filterId === FILTER_SWITCH_KEY) {
        return;
    }

    const pbEnum = IdToFilterEnumMap[filterId as FilterKeys];

    if (!pbEnum && pbEnum !== 0) {
        if (process.env.NODE_ENV === 'development') {
            throw new Error(`No pbEnum for filter_id: ${filterId}`);
        }

        return;
    }

    const config = PbFilterTypeConfigMap[pbEnum];

    if (!config) {
        if (process.env.NODE_ENV === 'development') {
            throw new Error(`No config for filter_id: ${filterId} / pbEnum: ${pbEnum}`);
        }

        return;
    }

    const {
        column_key: configKey,
        column_data_type: columnDataType
    } = config;

    return {
        configKey,
        compareFunc    : columnDataType ? compareFuncMap[columnDataType] : null,
        mainCompareFunc: compareFunctionsMap?.[filterId as FilterKeys]
    };
};

const getRowFilterFunc =
    (
        {
            configKey,
            compareFunc,
            mainCompareFunc
        }: Exclude<ReturnType<typeof getConfig>, undefined>,
        filter: any
    ) =>
    <T>(row: T) => {
        if (mainCompareFunc) {
            return mainCompareFunc(row as never, filter as never);
        }

        const rowValue = row[configKey as keyof T];

        if (compareFunc) {
            return compareFunc(rowValue as never, filter);
        }

        if (Array.isArray(filter) && filter.length > 0) {
            return filter.length === 1
                ? simpleCompare(rowValue, filter[0])
                : filter.some((filterValue) => simpleCompare(rowValue, filterValue));
        }

        return simpleCompare(rowValue, filter);
    };

export function filterRows<RowType = object>(
    rows: RowType[],
    selected_filters: Filters.FilterReducerState,
    availableFilters?: string[],
    compareFunctionsMap?: CompareFunctionsMap,
    turnOffPagination?: boolean
): { rows: RowType[]; total: number } {
    const {
        page,
        per_page,
        search,
        orderBy,
        order,
        ...filters
    } = selected_filters;

    const copiedRows = [...rows];

    const filteredRows = getAppliedFilters(filters, availableFilters).reduce(
        (acc, [filterId, filter]) => {
            const config = getConfig(filterId, compareFunctionsMap);

            return config ? acc.filter(getRowFilterFunc(config, filter)) : acc;
        },
        copiedRows
    );

    const filterBySearchRows =
        search?.trim().length > 0
            ? getFilteredRowsBySearch(filteredRows, search.toLowerCase())
            : filteredRows;

    const sortedRows = stableSort(filterBySearchRows, getSorting(order, orderBy as keyof RowType));

    return {
        rows: turnOffPagination
            ? sortedRows
            : sortedRows.slice(page * per_page, page * per_page + per_page),
        total: sortedRows.length
    };
}
