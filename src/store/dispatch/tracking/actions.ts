import {
    compareLoadViews,
    updateStorageViews
} from '@/@grpcServices/services/loads-service/service-utils/loads-views-utils';
import {
    LoadsView,
    defaultViewFilters,
    default_loads_filters
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { AppDispatch, AppThunkAction } from '@/store/types';
import { updateFilters } from '@/store/filters/actions';
import { DayLinesType } from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/LoadSettingsMenu';
import { TRACKING_LOCAL_STORAGE_CONFIG, TrackingActions } from './slice';

export const createTrackingViewAction =
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
                TrackingActions.AddView({
                    name,
                    type,
                    view_id,
                    filters: {
                        ...defaultViewFilters,
                        ...filters
                    }
                })
            );
            updateStorageViews(getState().tracking.views, TRACKING_LOCAL_STORAGE_CONFIG.VIEWS);
        };

const setInitialTrackingViewsAction = (): AppThunkAction => (dispatch, getState) => {
    const parsedViews = compareLoadViews(TRACKING_LOCAL_STORAGE_CONFIG.VIEWS);

    parsedViews.forEach((view) => {
        const filterId = `${TRACKING_LOCAL_STORAGE_CONFIG.PAGE}_${view.view_id}`;
        dispatch(updateFilters(filterId, { ...default_loads_filters, ...view.filters }));
    });

    dispatch(TrackingActions.UpdateViews(parsedViews));
    updateStorageViews(getState().tracking.views, TRACKING_LOCAL_STORAGE_CONFIG.VIEWS);
};

export const deleteTrackingViewAction =
    (viewId: string): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(TrackingActions.DeleteView(viewId));
            updateStorageViews(getState().tracking.views, TRACKING_LOCAL_STORAGE_CONFIG.VIEWS);
        };

export const updateTrackingViewAction =
    (view: LoadsView): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(TrackingActions.UpdateView(view));
            updateStorageViews(getState().tracking.views, TRACKING_LOCAL_STORAGE_CONFIG.VIEWS);
        };

export const updateTrackingViewsAction =
    (views: LoadsView[]): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(TrackingActions.UpdateViews(views));
            updateStorageViews(getState().tracking.views, TRACKING_LOCAL_STORAGE_CONFIG.VIEWS);
        };

const saveSettingsInLocalStorage = (settings: object) => {
    localStorage.setItem(TRACKING_LOCAL_STORAGE_CONFIG.SETTINGS, JSON.stringify(settings));
};

export const toggleShowDaysLinesAction = (): AppThunkAction => (dispatch, getState) => {
    dispatch(TrackingActions.ToggleShowDaysLines());
    const settingsState = getState().tracking.settings;
    saveSettingsInLocalStorage(settingsState);
};

export const toggleShowPanel = (): AppThunkAction => (dispatch, getState) => {
    dispatch(TrackingActions.ToggleShowPanel());
    const settingsState = getState().tracking.settings;
    saveSettingsInLocalStorage(settingsState);
};

export const setDaysLinesTypeAction =
    (type: DayLinesType): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(TrackingActions.SetDaysLinesType(type));
            const settingsState = getState().tracking.settings;
            saveSettingsInLocalStorage(settingsState);
        };

const trackingSettingsInitialAction = (): AppThunkAction => (dispatch) => {
    const settingsLocalStorage = localStorage.getItem(TRACKING_LOCAL_STORAGE_CONFIG.SETTINGS);
    if (!settingsLocalStorage) return;
    const parsedSettings = JSON.parse(settingsLocalStorage);
    dispatch(TrackingActions.InitialSettings(parsedSettings));
};

export function trackingInitiate() {
    return function (dispatch: AppDispatch) {
        dispatch(setInitialTrackingViewsAction());
        dispatch(trackingSettingsInitialAction());
    };
}
