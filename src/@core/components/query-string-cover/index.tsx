import { qsStringify, useAppSearchParams } from '@/hooks/search-params-filters/useAppSearchParams';
import { compareFilters } from '@/hooks/search-params-filters/useUpdateSearchFilters';
import { updateFilters } from '@/store/filters/actions';
import { useAppDispatch } from '@/store/hooks';
import { selectView } from '@/store/pages/slice';
import { isEqual } from 'lodash';
import Router from 'next/router';
import { memo, useEffect, useRef } from 'react';

type Props = {
    defaultValues: object;
    defaultViewId: string;
    views: { viewId: string }[] | { view_id: string }[];
    page: string;
    selectedFilters: object;
    selectedViewId: string;
    joinFilterId?: boolean;
    filtersHandler?: (viewId: string, filters: object) => void;
};

export const prepareFilters = (params: object) =>
    Object.entries(params).reduce((acc, [key, value]) => {
        if (key === 'per_page' || key === 'page' || key === 'sortBy') {
            return { ...acc, [key]: Number(value) };
        }
        return { ...acc, [key]: value };
    }, {} as object);

function QueryStringCover({
    views,
    defaultViewId,
    defaultValues,
    page,
    selectedFilters,
    selectedViewId,
    joinFilterId = false,
    filtersHandler
}: Props) {
    const dispatch = useAppDispatch();

    const updateFiltersHandler = (vId: string, filters: object) => {
        if (filtersHandler) {
            filtersHandler(vId, filters);
            return;
        }
        dispatch(updateFilters(vId, filters));
    };

    const searchParams = useAppSearchParams();
    const disabledListening = useRef(true);

    useEffect(() => {
        if (disabledListening.current) {
            const isExistView = views.some(
                (view) => ('viewId' in view ? view.viewId : view.view_id) === selectedViewId
            );
            const isDefaultView = selectedViewId === defaultViewId;
            if (isExistView && !isEqual(selectedFilters, defaultValues)) {
                const filters = compareFilters(selectedFilters, defaultValues);
                if (isDefaultView) {
                    const newFilters = qsStringify(filters);
                    Router.replace(
                        {
                            search: newFilters
                        },
                        undefined,
                        { shallow: true }
                    ).then(() => {
                        disabledListening.current = false;
                    });
                } else {
                    const newFilters = qsStringify({ viewId: selectedViewId, ...filters });
                    Router.replace(
                        {
                            search: newFilters
                        },
                        undefined,
                        { shallow: true }
                    ).then(() => {
                        disabledListening.current = false;
                    });
                }
                return;
            }
            dispatch(selectView({ page, view_id: defaultViewId }));
            disabledListening.current = false;
        }
        if (defaultViewId && views.length && !disabledListening.current) {
            const {
                viewId,
                ...filters
            } = searchParams;

            const preparedFilters = prepareFilters(filters);

            const isExistView = views.some(
                (view) => ('viewId' in view ? view.viewId : view.view_id) === viewId
            );

            if (viewId && typeof viewId === 'string' && isExistView) {
                const preparedViewId = joinFilterId ? `${page}_${viewId}` : viewId.toString();

                updateFiltersHandler(preparedViewId, { ...defaultValues, ...preparedFilters });
                dispatch(selectView({ page, view_id: viewId }));
            } else {
                const preparedViewId = joinFilterId ? `${page}_${defaultViewId}` : defaultViewId;
                updateFiltersHandler(preparedViewId, { ...defaultValues, ...preparedFilters });
                dispatch(selectView({ page, view_id: defaultViewId }));
            }
        }
    }, [searchParams, defaultViewId, views]);

    return null;
}

export default memo(QueryStringCover);
