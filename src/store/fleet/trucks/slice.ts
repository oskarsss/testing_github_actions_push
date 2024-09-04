/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/store/api';
import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';

const initialState = {
    tab_id                 : DETAILS_TABS_IDS.MAIN_NOTES,
    integration_provider_id: ''
};

const trucksSlice = createSlice({
    name    : 'trucks',
    initialState,
    reducers: {
        selectTab(state, action: PayloadAction<DETAILS_TABS_IDS>) {
            state.tab_id = action.payload;
        },
        setProviderId(state, action: PayloadAction<string>) {
            state.integration_provider_id = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const trucksReducer = trucksSlice.reducer;

export const trucksActions = trucksSlice.actions;
