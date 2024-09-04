import { useAppSelector } from '@/store/hooks';
import TableTypes from '@/@core/components/table/types';
import { useMemo } from 'react';
import { useRouter } from 'next/router';
import { compareFilters } from './useUpdateSearchFilters';
import { qsStringify, useAppSearchParams } from './useAppSearchParams';

type Params = {
    page: string;
    views: TableTypes.Views;
    defaultFilters: object;
};

const useSelectSearchView = ({
    page,
    defaultFilters,
    views
}: Params) => {
    const search = useAppSearchParams();
    const defaultViewId = useMemo(() => (views.length ? views[0].viewId : ''), [views]);
    const selectedViewId = useAppSelector((state) => state.pages[page]?.toString() || '');
    const storedFiltersMap = useAppSelector((state) => state.filters);
    const router = useRouter();

    const currentView = useMemo(
        () => (views?.length ? views.find((view) => view.viewId === selectedViewId) : null),
        [views, selectedViewId]
    );

    const selectView = (viewId: string) => {
        if (views.length === 0) return;
        const isDefaultView = viewId === views[0].viewId;
        const storeFilters = storedFiltersMap[viewId] || {};
        const filters = compareFilters(storeFilters, defaultFilters);

        if (isDefaultView) {
            delete search.viewId;
            router.push({ search: qsStringify({ ...filters }) });
        } else {
            router.push({
                search: qsStringify({
                    viewId,
                    ...filters
                })
            });
        }
    };

    return { selectView, defaultViewId, selectedViewId, currentView };
};

export default useSelectSearchView;
