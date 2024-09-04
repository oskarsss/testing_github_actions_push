/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    loadsDefaultViews,
    LoadsView
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import { api } from '@/store/api';
import type { DayLinesType } from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/LoadSettingsMenu';
import { prepareManifestModelMapStops } from '../manifests/utils/prepare';

export const TRACKING_LOCAL_STORAGE_CONFIG = {
    VIEWS           : 'TRUCKING_VIEWS',
    MAP_CONTROLLERS : 'TRUCKING_MAP_CONTROLLERS',
    SELECTED_VIEW_ID: 'TRUCKING_SELECTED_VIEW_ID',
    PAGE            : 'tracking',
    SETTINGS        : 'TRUCKING_SETTINGS'
};

type InitialState = {
    views: LoadsView[];
    showLoadStops: boolean;
    selectedLoadIndex: number | null;
    settings: {
        showDaysLines: boolean;
        daysLinesType: DayLinesType;
        showTotals: boolean;
        showPanel: boolean;
    };
    mapControllers: {
        weatherOption: string | null;
        connectEtaPoints: boolean;
        seattleTraffic: boolean;
    };

    map: {
        selectedStopId: string | null;
    };
};

export const initialState: InitialState = {
    selectedLoadIndex: null,
    views            : loadsDefaultViews,
    showLoadStops    : true,
    settings         : {
        showPanel    : true,
        showDaysLines: true,
        daysLinesType: 'compacted',
        showTotals   : true
    },
    mapControllers: {
        connectEtaPoints: false,
        seattleTraffic  : false,
        weatherOption   : null
    },
    map: {
        selectedStopId: null
    }
};

const trackingSlice = createSlice({
    name     : 'tracking',
    initialState,
    selectors: {
        showPanel: (state) => state.settings.showPanel
    },
    reducers: {
        SetSelectedStopId(state, action: PayloadAction<string | null>) {
            state.map.selectedStopId = action.payload;
        },
        ToggleShowDaysLines(state) {
            state.settings.showDaysLines = !state.settings.showDaysLines;
        },
        InitialSettings(state, action: PayloadAction<InitialState['settings']>) {
            state.settings = {
                ...state.settings,
                ...action.payload
            };
        },
        ToggleShowTotals(state) {
            state.settings.showTotals = !state.settings.showTotals;
        },
        SetDaysLinesType(state, action: PayloadAction<DayLinesType>) {
            state.settings.daysLinesType = action.payload;
        },
        ToggleShowLoadStops(state, { payload }: PayloadAction<{ value?: boolean }>) {
            if (payload.value) {
                state.showLoadStops = payload.value;
            } else {
                state.showLoadStops = !state.showLoadStops;
            }
        },
        ToggleShowPanel(state) {
            state.settings.showPanel = !state.settings.showPanel;
        },
        SelectLoadIndex(state, action: PayloadAction<number>) {
            state.selectedLoadIndex = action.payload;
        },
        ResetSelectedLoad(state) {
            state.selectedLoadIndex = initialState.selectedLoadIndex;
        },

        AddView(state, action: PayloadAction<LoadsView>) {
            state.views.push(action.payload);
        },

        UpdateViews(state, action: PayloadAction<LoadsView[]>) {
            state.views = action.payload;
        },
        UpdateView(state, action: PayloadAction<LoadsView>) {
            state.views = state.views.map((view) => {
                if (view.view_id === action.payload.view_id) {
                    return { ...view, ...action.payload };
                }
                return view;
            });
        },
        DeleteView(state, action: PayloadAction<LoadsView['view_id']>) {
            state.views = state.views.filter((view) => view.view_id !== action.payload);
        },
        SetMapController(state, action: PayloadAction<Partial<InitialState['mapControllers']>>) {
            state.mapControllers = { ...state.mapControllers, ...action.payload };
            const LsState = localStorage.getItem(TRACKING_LOCAL_STORAGE_CONFIG.MAP_CONTROLLERS);

            if (LsState) {
                const parsedState = JSON.parse(LsState);
                localStorage.setItem(
                    TRACKING_LOCAL_STORAGE_CONFIG.MAP_CONTROLLERS,
                    JSON.stringify({ ...parsedState, ...action.payload })
                );
            } else {
                localStorage.setItem(
                    TRACKING_LOCAL_STORAGE_CONFIG.MAP_CONTROLLERS,
                    JSON.stringify(action.payload)
                );
            }
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const TrackingReducer = trackingSlice.reducer;
export const TrackingActions = trackingSlice.actions;
export const TrackingSelectors = trackingSlice.selectors;
