import { DETAILS_TABS_IDS } from '@/models/fleet/details-tabs-ids';
import { createSlice } from '@reduxjs/toolkit';
import { api } from '@/store/api';

type InitialState = {
    tab_id: DETAILS_TABS_IDS;
};

const initialState = {
    tab_id: DETAILS_TABS_IDS.MAIN_NOTES
};

const customersSlice = createSlice({
    name     : 'customers',
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

export const customersReducer = customersSlice.reducer;
export const customersActions = customersSlice.actions;
export const customersSelectors = customersSlice.selectors;
