/* eslint-disable max-len */

import { getCompanyId } from '@/@grpcServices/services/loads-service/service-utils/loads-views-utils';
import { AppDispatch, AppThunkAction } from '@/store/types';
import { updateFilters } from '@/store/filters/actions';
import { manifestDefaultFilters } from '@/@grpcServices/services/manifests-service/manifest-service-hooks';
import PAGES_FILTERS_CONFIG from '@/configs/pages-filters-config';
import { DayLinesType } from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/LoadSettingsMenu';
import { DefaultManifestsViews, MANIFESTS_VIEW_TYPES, ManifestView } from '../models';
import { ManifestsActions } from '../slice';

export const MANIFESTS_STORAGE_CONSTANTS = {
    VIEWS        : 'MANIFESTS_VIEWS',
    SELECTED_VIEW: 'MANIFESTS_SELECTED_VIEW_ID',
    PAGE         : PAGES_FILTERS_CONFIG.DISPATCH.MANIFEST.page,
    SETTINGS     : 'MANIFESTS_SETTINGS'
} as const;

const getStorageViews = (): Record<string, ManifestView[]> => {
    const views = localStorage.getItem(MANIFESTS_STORAGE_CONSTANTS.VIEWS);

    if (views) {
        const parsedViews = JSON.parse(views);
        return parsedViews || {};
    }

    return {};
};

const compareManifestsViews = () => {
    const company_id = getCompanyId();
    const storageViews = getStorageViews();

    const views = storageViews[company_id] || DefaultManifestsViews;

    const comparedViews = views.reduce(
        (acc, view) => {
            const viewType = MANIFESTS_VIEW_TYPES[view.type];

            if (
                view.type === MANIFESTS_VIEW_TYPES.custom ||
                viewType === MANIFESTS_VIEW_TYPES.truck
            ) {
                acc.push(view);
            } else {
                const actualDefaultView = DefaultManifestsViews.find(
                    (defaultView) => defaultView.view_id === view.view_id
                );

                if (!actualDefaultView) {
                    return acc;
                }

                const actualDefaultViewFilters = actualDefaultView.filters;
                const viewFilters = view.filters;

                acc.push({
                    ...view,
                    filters: {
                        ...viewFilters,
                        ...actualDefaultViewFilters
                    }
                });
            }

            return acc;
        },

        [] as ManifestView[]
    );

    return comparedViews || [];
};

const updateStorageViews = (views: ManifestView[], LS_KEY_VIEWS: string) => {
    const company_id = getCompanyId();
    const storageViews = getStorageViews();
    const updatedViews = { ...storageViews, [company_id]: views };
    localStorage.setItem(LS_KEY_VIEWS, JSON.stringify(updatedViews));
};

export const createManifestViewAction =
    ({
        type,
        view_id,
        name,
        filters
    }: {
        type: ManifestView['type'];
        view_id: string;
        name: string;
        filters: ManifestView['filters'];
    }): AppThunkAction =>
        (dispatch, getState) => {
            const filterId = `${MANIFESTS_STORAGE_CONSTANTS.PAGE}_${view_id}`;
            dispatch(updateFilters(filterId, filters));
            dispatch(
                ManifestsActions.AddView({
                    name,
                    type,
                    view_id,
                    filters: {
                    // ...defaultViewFilters,
                        ...filters
                    }
                })
            );

            updateStorageViews(getState().manifests.views, MANIFESTS_STORAGE_CONSTANTS.VIEWS);
        };

const setInitialManifestsViewsAction = (): AppThunkAction => (dispatch, getState) => {
    const parsedViews = compareManifestsViews();

    parsedViews.forEach((view) => {
        const filterId = `${MANIFESTS_STORAGE_CONSTANTS.PAGE}_${view.view_id}`;
        dispatch(updateFilters(filterId, { ...manifestDefaultFilters, ...view.filters }));
    });

    dispatch(ManifestsActions.UpdateViews(parsedViews));
    updateStorageViews(getState().manifests.views, MANIFESTS_STORAGE_CONSTANTS.VIEWS);
};

export const deleteManifestsViewAction =
    (viewId: string): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(ManifestsActions.DeleteView(viewId));
            updateStorageViews(getState().manifests.views, MANIFESTS_STORAGE_CONSTANTS.VIEWS);
        };

export const updateManifestsViewAction =
    (view: ManifestView): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(ManifestsActions.UpdateView(view));
            updateStorageViews(getState().manifests.views, MANIFESTS_STORAGE_CONSTANTS.VIEWS);
        };

export const updateManifestsViewsAction =
    (views: ManifestView[]): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(ManifestsActions.UpdateViews(views));
            updateStorageViews(getState().manifests.views, MANIFESTS_STORAGE_CONSTANTS.VIEWS);
        };

const saveManifestSettingsLocalStorage = (settings: object) => {
    localStorage.setItem(MANIFESTS_STORAGE_CONSTANTS.SETTINGS, JSON.stringify(settings));
};

export const toggleShowDaysLinesAction = (): AppThunkAction => (dispatch, getState) => {
    dispatch(ManifestsActions.ToggleShowDaysLines());
    const settingsState = getState().manifests.settings;
    saveManifestSettingsLocalStorage(settingsState);
};

export const setDaysLinesTypeAction =
    (type: DayLinesType): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(ManifestsActions.SetDaysLinesType(type));
            const settingsState = getState().manifests.settings;
            saveManifestSettingsLocalStorage(settingsState);
        };

const manifestSettingsInitialAction = (): AppThunkAction => (dispatch) => {
    const settingsLocalStorage = localStorage.getItem(MANIFESTS_STORAGE_CONSTANTS.SETTINGS);
    if (!settingsLocalStorage) return;
    const parsedSettings = JSON.parse(settingsLocalStorage);
    dispatch(ManifestsActions.InitialSettings(parsedSettings));
};

export function manifestsInitiate() {
    return function (dispatch: AppDispatch) {
        dispatch(setInitialManifestsViewsAction());
        dispatch(manifestSettingsInitialAction());
    };
}

export const toggleShowPanel = (): AppThunkAction => (dispatch, getState) => {
    dispatch(ManifestsActions.ToggleShowPanel());
    const settingsState = getState().manifests.settings;
    saveManifestSettingsLocalStorage(settingsState);
};
