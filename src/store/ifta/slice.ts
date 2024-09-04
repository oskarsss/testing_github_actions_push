/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Ifta from '@/store/ifta/types';
import { api } from '../api';

const initialState: Ifta.State = {
    trucks: {
        search: ''
    },
    stops: {
        search: ''
    },
    totals: {
        search: ''
    }
};

const IftaSlice = createSlice({
    name    : 'ifta',
    initialState,
    reducers: {
        searchTrucks(state, action: PayloadAction<Ifta.SearchType>) {
            state.trucks = {
                ...state.trucks,
                ...action.payload
            };
        },
        searchStops(state, action: PayloadAction<Ifta.SearchType>) {
            state.stops = {
                ...state.stops,
                ...action.payload
            };
        },
        searchTotals(state, action: PayloadAction<Ifta.SearchType>) {
            state.totals = {
                ...state.totals,
                ...action.payload
            };
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const IftaReducer = IftaSlice.reducer;
export const IftaActions = IftaSlice.actions;
