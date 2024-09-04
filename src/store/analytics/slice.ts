/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

export const initialState = {
    selected_view_id: '0'
};

const analyticsSlice = createSlice({
    name    : 'home',
    initialState,
    reducers: {
        SelectView(state, action: PayloadAction<string>) {
            state.selected_view_id = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const AnalyticsReducer = analyticsSlice.reducer;

export const AnalyticsActions = analyticsSlice.actions;
