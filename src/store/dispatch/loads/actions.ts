import { AppDispatch, AppThunkAction } from '@/store/types';
import {
    default_loads_filters,
    defaultViewFilters,
    LoadsView
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import {
    compareLoadViews,
    updateStorageViews
} from '@/@grpcServices/services/loads-service/service-utils/loads-views-utils';
import { updateFilters } from '@/store/filters/actions';
import LoadTypesGrpcService from '@/@grpcServices/services/loads-service/load-types.service';
import type { DayLinesType } from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/LoadSettingsMenu';
import { LOADS_STORAGE_CONSTANTS, LoadsActions } from './slice';

export const createLoadViewAction =
    ({
        type,
        view_id,
        name,
        filters
    }: {
        type: LoadsView['type'];
        view_id: string;
        name: string;
        filters: LoadsView['filters'];
    }): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(
                LoadsActions.AddView({
                    name,
                    type,
                    view_id,
                    filters: {
                        ...defaultViewFilters,
                        ...filters
                    }
                })
            );

            updateStorageViews(getState().loads.views, LOADS_STORAGE_CONSTANTS.VIEWS);
        };

export const setInitialLoadsViewsAction = (): AppThunkAction => (dispatch, getState) => {
    const parsedViews = compareLoadViews(LOADS_STORAGE_CONSTANTS.VIEWS);

    parsedViews.forEach((view) => {
        const filterId = `${LOADS_STORAGE_CONSTANTS.PAGE}_${view.view_id}`;
        dispatch(updateFilters(filterId, { ...default_loads_filters, ...view.filters }));
    });

    dispatch(LoadsActions.UpdateViews(parsedViews));
    updateStorageViews(getState().loads.views, LOADS_STORAGE_CONSTANTS.VIEWS);
};

export const deleteLoadViewAction =
    (viewId: string): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(LoadsActions.DeleteView(viewId));
            updateStorageViews(getState().loads.views, LOADS_STORAGE_CONSTANTS.VIEWS);
        };

export const updateLoadViewAction =
    (view: LoadsView): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(LoadsActions.UpdateView(view));
            updateStorageViews(getState().loads.views, LOADS_STORAGE_CONSTANTS.VIEWS);
        };

export const updateLoadViewsAction =
    (views: LoadsView[]): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(LoadsActions.UpdateViews(views));
            updateStorageViews(getState().loads.views, LOADS_STORAGE_CONSTANTS.VIEWS);
        };

const saveSettingsInLocalStorage = (settings: object) => {
    localStorage.setItem(LOADS_STORAGE_CONSTANTS.SETTINGS, JSON.stringify(settings));
};

export const toggleShowDaysLinesAction = (): AppThunkAction => (dispatch, getState) => {
    dispatch(LoadsActions.ToggleShowDaysLines());
    const settingsState = getState().loads.settings;
    saveSettingsInLocalStorage(settingsState);
};

export const setDaysLinesTypeAction =
    (daysLinesType: DayLinesType): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(LoadsActions.SetDaysLinesType(daysLinesType));
            const settingsState = getState().loads.settings;
            saveSettingsInLocalStorage(settingsState);
        };

export const loadsSettingsInitialAction = (): AppThunkAction => (dispatch) => {
    const settingsLocalStorage = localStorage.getItem(LOADS_STORAGE_CONSTANTS.SETTINGS);
    if (!settingsLocalStorage) return;
    const parsedSettings = JSON.parse(settingsLocalStorage);
    dispatch(LoadsActions.InitialSettings(parsedSettings));
};

export function loadsInitiate() {
    return function (dispatch: AppDispatch) {
        dispatch(LoadTypesGrpcService.endpoints.getLoadTypes.initiate({}, { forceRefetch: true }));
        dispatch(loadsSettingsInitialAction());
    };
}
