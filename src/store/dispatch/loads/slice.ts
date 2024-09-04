/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/store/api';
import {
    loadsDefaultViews,
    LoadsView
} from '@/@grpcServices/services/loads-service/service-utils/loads-default-models';
import type { DayLinesType } from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/LoadSettingsMenu';
import { RootState } from '@/pages/_app';

export const LOADS_STORAGE_CONSTANTS = Object.freeze({
    VIEWS        : 'LOADS_VIEWS',
    SELECTED_VIEW: 'LOADS_SELECTED_VIEW_ID',
    PAGE         : 'loads',
    SETTINGS     : 'LOADS_SETTINGS'
});

export const loadsMapControllersConfig = Object.freeze({
    connectEtaPoints: 'LOAD_MAP_CONNECT_ETA_POINTS',
    seattleTraffic  : 'LOAD_MAP_SEATTLE_TRAFFIC'
});

export type LoadDetailsTabs = 'loadStops' | 'loadDocuments' | 'loadCommodities' | 'loadFinancial';

type InitialState = {
    selectedOrderIndex: number | null;
    views: LoadsView[];
    showLoadStops: boolean;
    isNewLoadCreated: boolean;
    mapControllers: {
        weatherOption: string | null;
        connectEtaPoints: boolean;
        seattleTraffic: boolean;
    };
    settings: {
        showDaysLines: boolean;
        daysLinesType: DayLinesType;
        showTotals: boolean;
    };
    map: {
        selectedStopId: string | null;
    };
    selectedLoadDetailsTab: LoadDetailsTabs;
};

export const initialState: InitialState = {
    selectedOrderIndex: null,
    views             : loadsDefaultViews,
    showLoadStops     : true,
    settings          : {
        showDaysLines: true,
        daysLinesType: 'compacted',
        showTotals   : true
    },
    map: {
        selectedStopId: null
    },
    isNewLoadCreated: false,
    mapControllers  : {
        connectEtaPoints: true,
        seattleTraffic  : false,
        weatherOption   : null
    },
    selectedLoadDetailsTab: 'loadStops'
};

const loadsSlice = createSlice({
    name    : 'loads',
    initialState,
    reducers: {
        SetSelectedStopId(state, action: PayloadAction<string | null>) {
            const selectedStopId =
                state.map.selectedStopId === action.payload ? null : action.payload;
            if (selectedStopId) {
                state.selectedLoadDetailsTab = 'loadStops';
            }
            state.map.selectedStopId = selectedStopId;
        },
        SetDaysLinesType(state, action: PayloadAction<DayLinesType>) {
            state.settings.daysLinesType = action.payload;
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
        ToggleShowLoadStops(state, { payload }: PayloadAction<{ value?: boolean }>) {
            if (payload.value) {
                state.showLoadStops = payload.value;
            } else {
                state.showLoadStops = !state.showLoadStops;
            }
        },
        setShowsLoadStops(state, action: PayloadAction<boolean>) {
            state.showLoadStops = action.payload;
        },
        SelectLoadIndex(state, action: PayloadAction<number>) {
            state.selectedOrderIndex = action.payload;
        },
        ResetSelectedLoad(state) {
            state.selectedOrderIndex = initialState.selectedOrderIndex;
            state.isNewLoadCreated = initialState.isNewLoadCreated;
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

        LoadCreated(state, action: PayloadAction<boolean>) {
            state.isNewLoadCreated = action.payload;
        },

        SetMapController(state, action: PayloadAction<Partial<InitialState['mapControllers']>>) {
            state.mapControllers = { ...state.mapControllers, ...action.payload };
            const LsState = localStorage.getItem('LOADS_MAP_CONTROLLERS');

            if (LsState) {
                const parsedState = JSON.parse(LsState);
                localStorage.setItem(
                    'LOADS_MAP_CONTROLLERS',
                    JSON.stringify({ ...parsedState, ...action.payload })
                );
            } else {
                localStorage.setItem('LOADS_MAP_CONTROLLERS', JSON.stringify(action.payload));
            }
        },

        selectLoadDetailsTab(state, action: PayloadAction<LoadDetailsTabs>) {
            state.selectedLoadDetailsTab = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const LoadsReducer = loadsSlice.reducer;

export const LoadsActions = loadsSlice.actions;

export const SelectLoadIndexById = createAsyncThunk(
    'loads/setLoadIndexById',
    ({ orderId }: { orderId: string }, {
        dispatch,
        getState
    }) => {
        const store = getState() as RootState;

        const orderIndex = store.ordersData.indexes.orderIdToIndexMap[orderId];
        if (orderIndex) {
            dispatch(LoadsActions.SelectLoadIndex(orderIndex));
        }
    }
);
