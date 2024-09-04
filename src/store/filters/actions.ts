import { filtersActions } from '@/store/filters/slice';
import { getCompanyId } from '@/@grpcServices/services/loads-service/service-utils/loads-views-utils';
import type { AppThunkAction } from '../types';

export const FILTERS_STORAGE_KEY = 'APP_FILTERS';

const getAllFiltersLs = () => {
    const filters = localStorage.getItem(FILTERS_STORAGE_KEY);
    return filters ? JSON.parse(filters) : {};
};

const getCompanyFiltersLs = () => {
    const companyId = getCompanyId();
    const filters = localStorage.getItem(FILTERS_STORAGE_KEY);
    const filtersObj = filters ? JSON.parse(filters) : {};
    return filtersObj[companyId] || {};
};

const updateFiltersLs = (filters: object, filterId: string) => {
    const companyId = getCompanyId();
    const allFiltersObj = getAllFiltersLs();
    const filtersObj = getCompanyFiltersLs();

    const existFilters = filtersObj[filterId] || {};
    const newFiltersObj = { ...filtersObj, [filterId]: { ...existFilters, ...filters } };

    localStorage.setItem(
        FILTERS_STORAGE_KEY,
        JSON.stringify({ ...allFiltersObj, [companyId]: newFiltersObj })
    );
};

export function updateFilters(id: string, filters: object): AppThunkAction {
    return function (dispatch, getState) {
        dispatch(
            filtersActions.updateFilters({
                id,
                filters
            })
        );

        // const storageFilters = getState().filters[id];

        // updateFiltersLs(storageFilters, id);
    };
}

export function InitiateFilters(): AppThunkAction {
    return function (dispatch) {
        const filters = getCompanyFiltersLs();
        dispatch(filtersActions.setInitialFilters({ filters }));
    };
}

export function getFilters(id: string): AppThunkAction<object | undefined> {
    return function (_, getState) {
        return getState().filters[id];
    };
}

export function clearFilters(): AppThunkAction {
    return function (dispatch) {
        dispatch(filtersActions.clearFilters());
    };
}
