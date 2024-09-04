/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Import from './types';
import { ProcessorID } from '../../../proto_data/ts/v1/import';
import { api } from '../api';

export const initialState: Import.Redux.InitialState = {
    filter: {
        orderBy: null,
        order  : 'asc'
    },
    active_step : 0,
    category_id : 'fuel',
    processor_id: ProcessorID.PROCESSOR_UNKNOWN,
    files_map   : {
        fuel: {
            files: {}
        }
    }
};

const importSlice = createSlice({
    name    : 'import',
    initialState,
    reducers: {
        UpdateFiles(state, action: PayloadAction<Import.Redux.InitialState['files_map']>) {
            state.files_map = action.payload;
        },
        UpdateCategoryId(state, action: PayloadAction<Import.Redux.UpdateCategoryIdPayload>) {
            state.category_id = action.payload.category_id;
        },
        UpdateProcessorId(state, action: PayloadAction<Import.Redux.UpdateProcessorIdPayload>) {
            state.processor_id = action.payload.processor_id;
        },
        UpdateFilters(state, action: PayloadAction<Import.Filter>) {
            state.filter = action.payload;
        },
        SetActiveStep(state, action: PayloadAction<number>) {
            state.active_step = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const ImportReducer = importSlice.reducer;

export const ImportActions = importSlice.actions;
