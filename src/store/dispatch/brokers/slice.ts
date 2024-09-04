import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import { createSlice } from '@reduxjs/toolkit';
import { api } from '@/store/api';

type InitialState = {
    tab_id: DETAILS_TABS_IDS;
};

const initialState: InitialState = {
    tab_id: DETAILS_TABS_IDS.MAIN_NOTES
};

const brokersSlice = createSlice({
    name     : 'brokers',
    initialState,
    selectors: {
        getSelectedTab: (state: InitialState) => state.tab_id
    },
    reducers: {
        selectTab(state, action) {
            state.tab_id = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const brokersReducer = brokersSlice.reducer;
export const brokersActions = brokersSlice.actions;
export const brokersSelectors = brokersSlice.selectors;
