/* eslint-disable no-param-reassign */
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { ServiceProviderModel_ServiceProvider } from '@proto/models/model_service_provider';

type InitialState = {
    selectedServiceProviderId: string;
    selectedServiceProvider: ServiceProviderModel_ServiceProvider | null;
};

const initialState: InitialState = {
    selectedServiceProviderId: '',
    selectedServiceProvider  : null
};

const serviceProvidersSlice = createSlice({
    name    : 'serviceProviders',
    initialState,
    reducers: {
        selectServiceProviderId(state, action: PayloadAction<string>) {
            state.selectedServiceProviderId = action.payload;
        },
        selectServiceProvider(
            state,
            action: PayloadAction<ServiceProviderModel_ServiceProvider | null>
        ) {
            state.selectedServiceProvider = action.payload;
        }
    }
});

export const ServiceProvidersReducer = serviceProvidersSlice.reducer;
export const SelectServiceProviderAction = serviceProvidersSlice.actions;
