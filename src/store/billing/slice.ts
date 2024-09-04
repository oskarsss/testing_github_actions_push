/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type BillingPageStore = {
    selectedLoadId: string;
};

type InitialState = {
    amazon: BillingPageStore;
    all: BillingPageStore;
    factoring: BillingPageStore;
    direct: BillingPageStore;
};

const initialState: InitialState = {
    amazon: {
        selectedLoadId: ''
    },
    all: {
        selectedLoadId: ''
    },
    factoring: {
        selectedLoadId: ''
    },
    direct: {
        selectedLoadId: ''
    }
};
export type BillingStoreKey = keyof typeof initialState;

const billingSlice = createSlice({
    name    : 'billing',
    initialState,
    reducers: {
        SelectLoadId(state, action: PayloadAction<{ key: BillingStoreKey; loadId: string }>) {
            state[action.payload.key].selectedLoadId = action.payload.loadId;
        },
        ResetSelectedLoadId(state, action: PayloadAction<BillingStoreKey>) {
            state[action.payload].selectedLoadId = '';
        },

        ResetSelectedLoad(state, action: PayloadAction<BillingStoreKey>) {
            state[action.payload].selectedLoadId = '';
        }
    }
});

export const BillingReducer = billingSlice.reducer;

export const BillingActions = billingSlice.actions;

export const BillingSelectors = billingSlice.selectors;
