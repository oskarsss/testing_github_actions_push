/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LB_GetEquipmentsReply_Equipment, LB_ListenSearchResultsReply } from '@proto/loadboard';
import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { LoadboardSearch } from '@proto/models/model_loadboard_search';
import createMap from '@/utils/create-map';

type InitialState = {
    selectedSearchId: string;
    resultsBySearchId: Record<string, LB_ListenSearchResultsReply['searchResults']>;
    equipmentsMap: Record<string, LB_GetEquipmentsReply_Equipment>;
    searchesMap: Record<string, LoadboardSearch>;
    selectedLoads: Record<string, string>;
    favoriteLoads: Record<string, string[]>;

    searchesLoadings: Record<string, boolean>;
};

export const initialState: InitialState = {
    selectedSearchId : '',
    selectedLoads    : {},
    equipmentsMap    : {},
    searchesMap      : {},
    resultsBySearchId: {},
    searchesLoadings : {},
    favoriteLoads    : {}
};

const loadboardSlice = createSlice({
    name    : 'loadboard',
    initialState,
    reducers: {
        setSelectedSearchId(state, action: PayloadAction<string>) {
            state.selectedSearchId = action.payload;
        },
        setSelectedLoadId(state, action: PayloadAction<{ loadId: string }>) {
            state.selectedLoads[state.selectedSearchId] = action.payload.loadId;
        },

        setSearchResults(
            state,
            action: PayloadAction<{
                searchId: string;
                results: LB_ListenSearchResultsReply['searchResults'];
            }>
        ) {
            const newState = [
                ...action.payload.results,
                ...(state.resultsBySearchId[action.payload.searchId] || [])
            ];
            state.resultsBySearchId = {
                ...state.resultsBySearchId,
                [action.payload.searchId]: newState
            };
        },
        setSearchLoading(state, action: PayloadAction<{ searchId: string; loading: boolean }>) {
            state.searchesLoadings[action.payload.searchId] = action.payload.loading;
        },

        setFavoriteLoad(state, action: PayloadAction<{ resultId: string }>) {
            const searchId = state.selectedSearchId;
            state.favoriteLoads[searchId] = [
                ...(state.favoriteLoads[searchId] || []),
                action.payload.resultId
            ];
        },
        removeFavoriteLoad(state, action: PayloadAction<{ resultId: string }>) {
            const searchId = state.selectedSearchId;

            state.favoriteLoads[searchId] = state.favoriteLoads[searchId].filter(
                (loadId) => loadId !== action.payload.resultId
            );
        },
        clearFavoritesLoads(state) {
            state.favoriteLoads[state.selectedSearchId] = [];
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            LoadboardGrpcService.endpoints.getEquipments.matchFulfilled,
            (state, action) => {
                state.equipmentsMap = createMap(action.payload.equipments, 'equipmentId');
            }
        );
        builder.addMatcher(
            LoadboardGrpcService.endpoints.getSearches.matchFulfilled,
            (state, action) => {
                state.searchesMap = createMap(action.payload.searches, 'searchId');
            }
        );
    }
});

export const LoadboardReducer = loadboardSlice.reducer;

export const LoadboardActions = loadboardSlice.actions;
