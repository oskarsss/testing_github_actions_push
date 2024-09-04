/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

type InitialState = {
    setupProfileExpanded: boolean;
    setupFleetExpanded: boolean;
    setupIntegrationExpanded: boolean;
    setupPayrollExpanded: boolean;
    setupConfigurationExpanded: boolean;
};

const initialState: InitialState = {
    setupProfileExpanded      : false,
    setupFleetExpanded        : false,
    setupIntegrationExpanded  : false,
    setupPayrollExpanded      : false,
    setupConfigurationExpanded: false
};

const homeSlice = createSlice({
    name    : 'home',
    initialState,
    reducers: {
        setInitialState(state) {
            state = initialState;
        },
        setSetupProfileExpanded(state, action: PayloadAction<boolean>) {
            state.setupProfileExpanded = action.payload;
        },
        setSetupFleetExpanded(state, action: PayloadAction<boolean>) {
            state.setupFleetExpanded = action.payload;
        },
        setSetupIntegrationExpanded(state, action: PayloadAction<boolean>) {
            state.setupIntegrationExpanded = action.payload;
        },
        setSetupPayrollExpanded(state, action: PayloadAction<boolean>) {
            state.setupPayrollExpanded = action.payload;
        },
        setSetupConfigurationExpanded(state, action: PayloadAction<boolean>) {
            state.setupConfigurationExpanded = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const HomeReducer = homeSlice.reducer;

export const HomeActions = homeSlice.actions;
