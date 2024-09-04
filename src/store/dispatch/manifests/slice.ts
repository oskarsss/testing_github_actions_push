/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { api } from '@/store/api';
import { ManifestModel_Manifest } from '@proto/models/model_manifest';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import type { DayLinesType } from '@/@core/ui-kits/loads/loads-filters-control/load-settings-menu/LoadSettingsMenu';
import { getArchivedManifestsThunk } from './actions/api';
import { DefaultManifestsViews, ManifestDetailsTab, ManifestView } from './models';
import { generateIndexes } from './utils/indexes';

type InitialState = {
    selectedManifestIndex: null | number;
    liveMode: {
        rows: ManifestModel_Manifest[];
        truckIdToIndexesMap: Record<string, number[]>;
        statusToIndexesMap: Record<string, number[]>;
        firstStopDateToIndexesMap: Record<string, number[]>;
        grossAmountToIndexesMap: Record<number, number[]>;
        distanceToIndexesMap: Record<number, number[]>;
        loadedDistanceToIndexesMap: Record<number, number[]>;
        manifestIdToIndexMap: Record<string, number>;
        trailerIdToIndexesMap: Record<string, number[]>;
        driverIdToIndexesMap: Record<string, number[]>;
    };

    views: ManifestView[];
    selectedManifestDetailsTab: ManifestDetailsTab;
    isFetching: boolean;
    isLoading: boolean;
    table: {
        focusedRow: number;
    };
    settings: {
        showPanel: boolean;
        showDaysLines: boolean;
        daysLinesType: DayLinesType;
        showTotals: boolean;
    };
    map: {
        selectedStopId: string | null;
    };
};

const initialState: InitialState = {
    selectedManifestIndex     : null,
    views                     : DefaultManifestsViews,
    selectedManifestDetailsTab: 'stops',
    isLoading                 : true,
    isFetching                : false,
    liveMode                  : {
        trailerIdToIndexesMap     : {},
        rows                      : [],
        manifestIdToIndexMap      : {},
        distanceToIndexesMap      : {},
        firstStopDateToIndexesMap : {},
        grossAmountToIndexesMap   : {},
        loadedDistanceToIndexesMap: {},
        statusToIndexesMap        : {},
        truckIdToIndexesMap       : {},
        driverIdToIndexesMap      : {}
    },
    table: {
        focusedRow: 0
    },
    settings: {
        showPanel    : true,
        showDaysLines: true,
        daysLinesType: 'compacted',
        showTotals   : true
    },
    map: {
        selectedStopId: null
    }
};

const manifestsSlice = createSlice({
    name     : 'manifests',
    initialState,
    selectors: {
        showPanel: (state) => state.settings.showPanel
    },
    reducers: {
        // views
        AddView(state, action: PayloadAction<ManifestView>) {
            state.views.push(action.payload);
        },

        UpdateViews(state, action: PayloadAction<ManifestView[]>) {
            state.views = action.payload;
        },
        UpdateView(state, action: PayloadAction<ManifestView>) {
            state.views = state.views.map((view) => {
                if (view.view_id === action.payload.view_id) {
                    return { ...view, ...action.payload };
                }
                return view;
            });
        },

        DeleteView(state, action: PayloadAction<ManifestView['view_id']>) {
            state.views = state.views.filter((view) => view.view_id !== action.payload);
        },

        // settings
        SetDaysLinesType(state, action: PayloadAction<DayLinesType>) {
            state.settings.daysLinesType = action.payload;
        },
        ToggleShowDaysLines(state) {
            state.settings.showDaysLines = !state.settings.showDaysLines;
        },
        ToggleShowTotals(state) {
            state.settings.showTotals = !state.settings.showTotals;
        },
        InitialSettings(state, action: PayloadAction<InitialState['settings']>) {
            state.settings = {
                ...state.settings,
                ...action.payload
            };
        },

        SetSelectedStopId(state, action: PayloadAction<string | null>) {
            const selectedStopId =
                state.map.selectedStopId === action.payload ? null : action.payload;
            if (selectedStopId) {
                state.selectedManifestDetailsTab = 'stops';
            }
            state.map.selectedStopId = selectedStopId;
        },

        ToggleIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload;
        },
        SelectManifestIdx(state, action: PayloadAction<number>) {
            state.selectedManifestIndex = action.payload;
            state.table.focusedRow = action.payload;
        },
        SelectManifestById(state, action: PayloadAction<string>) {
            const idx = state.liveMode.manifestIdToIndexMap[action.payload];
            state.selectedManifestIndex = idx;
            state.table.focusedRow = idx;
        },
        FocusRow(state, action: PayloadAction<number>) {
            state.table.focusedRow = action.payload;
        },

        SelectManifestDetailsTab(state, action: PayloadAction<ManifestDetailsTab>) {
            state.selectedManifestDetailsTab = action.payload;
        },
        SetAllManifestsList(state, action: PayloadAction<ManifestModel_Manifest[]>) {
            const { rows: list } = state.liveMode;
            if (state.isLoading && !list.length) {
                const manifests = action.payload;
                state.liveMode.rows = manifests;

                const indexes = generateIndexes(manifests);

                state.liveMode = {
                    ...state.liveMode,
                    ...indexes
                };

                state.isLoading = false;
            }
        },
        UpdateManifest(state, action: PayloadAction<Partial<ManifestModel_Manifest>>) {
            const listIdx = state.liveMode.manifestIdToIndexMap[action.payload?.manifestId || ''];

            if (listIdx !== undefined) {
                state.liveMode.rows[listIdx] = {
                    ...state.liveMode.rows[listIdx],
                    ...action.payload
                };
            } else if (action.payload.manifestId) {
                state.liveMode.rows.push(action.payload as ManifestModel_Manifest);
                state.liveMode.manifestIdToIndexMap = {
                    ...state.liveMode.manifestIdToIndexMap,
                    [action.payload.manifestId]: state.liveMode.rows.length - 1
                };
            }

            const manifests = state.liveMode.rows;
            const indexes = generateIndexes(manifests);
            state.liveMode = {
                ...state.liveMode,
                ...indexes
            };
        },
        ToggleShowPanel(state) {
            state.settings.showPanel = !state.settings.showPanel;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
        builder.addCase(getArchivedManifestsThunk.fulfilled, (state, { payload }) => {
            const existingManifestIds = new Set(Object.keys(state.liveMode.manifestIdToIndexMap));

            const newManifests = payload.originalData.filter(
                (manifest) => !existingManifestIds.has(manifest.manifestId)
            );

            const newRows = [...state.liveMode.rows, ...newManifests];

            const indexes = generateIndexes(newRows);

            state.liveMode = {
                ...state.liveMode,
                ...indexes,
                rows: newRows
            };

            state.isFetching = false;
        });
    }
});

export const ManifestsReducer = manifestsSlice.reducer;
export const ManifestsActions = manifestsSlice.actions;

export const ManifestsSelectors = manifestsSlice.selectors;
