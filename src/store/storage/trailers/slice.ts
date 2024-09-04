import { api } from '@/store/api';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { makeIndexes } from './utils/make-indexes';

type InitialState = {
    indexes: {
        trailerIdToIndexesMap: Record<string, number>;
    };
    rows: TrailerModel_Trailer[];
    isLoading: boolean;
};

const initialState: InitialState = {
    rows   : [],
    indexes: {
        trailerIdToIndexesMap: {}
    },
    isLoading: true
};

const TrailersDataSlice = createSlice({
    name     : 'trailersData',
    initialState,
    selectors: {
        getRows     : (state) => state.rows,
        getIndexes  : (state) => state.indexes,
        getIsLoading: (state) => state.isLoading
    },
    reducers: {
        InitializeData(state, action) {
            if (state.isLoading) {
                state.rows = action.payload;
                state.indexes = makeIndexes(action.payload);
                state.isLoading = false;
            }
        },
        UpdateTrailer(
            state,
            action: PayloadAction<{
                trailer: Partial<TrailerModel_Trailer>;
                isCacheUpdate: boolean;
            }>
        ) {
            const {
                isCacheUpdate,
                trailer
            } = action.payload;

            const index = state.indexes.trailerIdToIndexesMap[trailer?.trailerId || ''];
            if (index !== undefined) {
                state.rows[index] = {
                    ...state.rows[index],
                    ...trailer
                };
            } else if (trailer.trailerId && !isCacheUpdate) {
                state.rows.push(trailer as TrailerModel_Trailer);
            }

            state.indexes = makeIndexes(state.rows);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const TrailersDataActions = TrailersDataSlice.actions;
export const TrailerDataSelectors = TrailersDataSlice.selectors;
export const TrailersDataReducer = TrailersDataSlice.reducer;
