/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Filters from '@/store/filters/types';
import { api } from '../api';
import { getFilters } from './actions';

// import { FILTERS_STORAGE_KEY } from './actions';

type InitialState = Record<string, Record<string, string | number | object>>;

const initialState: InitialState = {};

const filtersSlice = createSlice({
    name    : 'filters',
    initialState,
    reducers: {
        setInitialFilters(state, action: PayloadAction<Filters.Actions.SetInitialFilters>) {
            return { ...state, ...action.payload.filters };
        },
        updateFilters(state, action: PayloadAction<Filters.Actions.UpdateFilters>) {
            const new_filter = {
                ...state[action.payload.id],
                ...action.payload.filters
            };

            // localStorage.setItem(
            //     FILTERS_STORAGE_KEY,
            //     JSON.stringify({ [action.payload.id]: { ...new_filter } })
            // );

            return {
                ...state,
                [action.payload.id]: new_filter
            };
        },
        removeFilter(state, action: PayloadAction<string>) {
            const updFilters = { ...state };

            delete updFilters[action.payload];

            return updFilters;
        },
        clearFilters() {
            return initialState;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const filtersReducer = filtersSlice.reducer;
export const filtersActions = filtersSlice.actions;
