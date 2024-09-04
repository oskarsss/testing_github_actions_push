import { useCallback, useMemo, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectView as _selectView } from '@/store/pages/slice';
import TableTypes from '@/@core/components/table/types';
import EntityFilters from '@/@core/components/filters/filter-button/types';
import { useStableArray } from '@/hooks/useStable';
import { mergeFilters } from '../../filters/filter-button/filter_helpers';
import { filterRows, getTotals, useFilters } from '../../filters/filter-button/hooks';
import type { CompareFunctionsMap, FilterKeys } from '../../filters/types';

export function useStableObject<T extends object = object>() {
    // @ts-ignore don't touch this!
    return useRef<T>({}).current;
}

export const useStableLinks = () => {
    const emptyArray = useRef([] as []).current;
    const emptyObject = useRef({}).current;

    return { emptyArray, emptyObject };
};

export function useSelectedView(page = '') {
    const dispatch = useAppDispatch();

    const selectedViewId = useAppSelector((state) => state.pages[page]?.toString() || '');

    const selectView = useCallback(
        (view_id: string) => {
            dispatch(_selectView({ page, view_id }));
        },
        [dispatch, page]
    );

    return { selected_view_id: selectedViewId, selectView };
}

export function useViewsAndHeaders<V, H>(data?: {
    views: V;
    headers: H;
}): { views: V; headers: H } {
    const { emptyArray } = useStableLinks();

    return useMemo(
        () => ({
            views  : data ? data.views : (emptyArray as V),
            headers: data ? data.headers : (emptyArray as H)
        }),
        [data]
    );
}

export function useFilterId(page: string) {
    const selected_view_id = useAppSelector((state) => state.pages[page] || 0);

    return selected_view_id.toString();
}

export function useSelectedFilters<Filters extends Record<string, any> = Record<string, any>>(
    page = '',
    default_filters: Filters = {} as Filters
) {
    const filter_id = useFilterId(page);
    const storeFilters = useAppSelector((state) => state.filters[filter_id]);
    const selected_filters = useMemo(
        () => ({ ...default_filters, ...storeFilters }),
        [default_filters, storeFilters]
    );
    return useMemo(
        () => ({
            selected_filters,
            filter_id
        }),
        [selected_filters, filter_id]
    );
}

export const useAppliedFilters = (
    filters?: EntityFilters.FiltersList | undefined | FilterKeys[],
    filterCountList?: EntityFilters.FiltersList
) => {
    const { emptyArray } = useStableLinks();

    return useMemo(
        () => (filters?.length ? mergeFilters(filters, filterCountList) : emptyArray),
        [emptyArray, filters, filterCountList]
    );
};

export const useTotals = (rows: TableTypes.Rows = [], view: TableTypes.View | null = null) =>
    useMemo(() => (view ? getTotals(rows, view.columns) : null), [view, rows]);

export type SwitchFilterFn<
    RowType extends Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
    DefaultFiltersType extends unknown
> = (rows: RowType[], selected_filters: DefaultFiltersType) => RowType[];

export function useFilteredRows<RowType extends Record<string, any>>(
    rows: RowType[] | undefined,
    selected_filters: EntityFilters.FilterReducerState,
    switchFilterCallback?: SwitchFilterFn<RowType, any>,
    availableFilters?: string[],
    compareFunctionsMap?: CompareFunctionsMap,
    turnOffPagination = false
) {
    const stableRows = useStableArray(rows);

    return useMemo(() => {
        if (!stableRows.length) {
            return { rows: stableRows, rows_total: 0 };
        }

        const filtered = filterRows<RowType>(
            stableRows,
            selected_filters,
            availableFilters,
            compareFunctionsMap,
            turnOffPagination
        );

        return {
            rows: switchFilterCallback
                ? switchFilterCallback(filtered.rows, selected_filters)
                : filtered.rows,
            rows_total: filtered.total
        };
    }, [
        stableRows,
        selected_filters,
        availableFilters,
        compareFunctionsMap,
        turnOffPagination,
        switchFilterCallback
    ]);
}

export function useView(views: TableTypes.View[] = [], selected_view_id = ''): TableTypes.View {
    return useMemo(
        () => (views?.length ? views.find((view) => view.viewId === selected_view_id) : null),
        [views, selected_view_id]
    ) as TableTypes.View;
}
