/* eslint-disable no-param-reassign */
import { ServiceLogModel_ServiceLogRead } from '@proto/models/model_service_log';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/store/api';

type InitialState = {
    selectedServiceLogId: string;
    selectedServiceLog: ServiceLogModel_ServiceLogRead | null;
};

const initialState: InitialState = {
    selectedServiceLogId: '',
    selectedServiceLog  : null
};

const serviceLogsSlice = createSlice({
    name    : 'serviceLogs',
    initialState,
    reducers: {
        selectServiceLogId(state, action: PayloadAction<string>) {
            state.selectedServiceLogId = action.payload;
        },
        selectServiceLog(state, action: PayloadAction<ServiceLogModel_ServiceLogRead | null>) {
            state.selectedServiceLog = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const ServiceLogsReducer = serviceLogsSlice.reducer;
export const SelectServiceLogsAction = serviceLogsSlice.actions;
