/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import { TrailerTypesGetReply_TrailerType } from '@proto/trailer.types';
import { api } from '@/store/api';

const initialState = {
    tab_id                 : DETAILS_TABS_IDS.MAIN_NOTES,
    labels                 : {} as Record<string, TrailerTypesGetReply_TrailerType>,
    integration_provider_id: ''
};

const trailersSlice = createSlice({
    name    : 'trailers',
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

export const trailersReducer = trailersSlice.reducer;

export const trailersActions = trailersSlice.actions;

export default trailersSlice;
