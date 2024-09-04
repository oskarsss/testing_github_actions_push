/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

type InitialState = {
    selected_cell: string;
    selectedRow: string;
    selectedIds: Record<string, string[]>;
};

const initialState: InitialState = {
    selected_cell: '',
    selectedRow  : '',
    selectedIds  : {}
};

const appSlice = createSlice({
    name    : 'app',
    initialState,
    reducers: {
        SelectCell(state, action: PayloadAction<string>) {
            state.selected_cell = action.payload;
        },
        SelectRow(state, action: PayloadAction<string>) {
            state.selectedRow = action.payload;
        },

        CheckId(
            state,
            action: PayloadAction<{
                tableName: string;
                id: string;
            }>
        ) {
            const { tableName } = action.payload;
            const prevState = state.selectedIds[tableName] || [];
            state.selectedIds[tableName] = [...prevState, action.payload.id];
        },
        UncheckId(
            state,
            action: PayloadAction<{
                tableName: string;
                id: string;
            }>
        ) {
            const { tableName } = action.payload;
            state.selectedIds[tableName] = state.selectedIds[tableName].filter(
                (id) => id !== action.payload.id
            );
        },
        CheckIds(
            state,
            {
                payload
            }: PayloadAction<{
                tableName: string;
                idsList: string[];
                rewrite: boolean;
            }>
        ) {
            state.selectedIds[payload.tableName] = payload.rewrite
                ? payload.idsList
                : [...(state.selectedIds[payload.tableName] ?? []), ...payload.idsList];
        },
        ResetIds(
            state,
            {
                payload
            }: PayloadAction<{
                tableName: string;
                idsList?: string[];
            }>
        ) {
            state.selectedIds[payload.tableName] = payload.idsList
                ? state.selectedIds[payload.tableName].filter(
                    (itemId) => !payload.idsList?.includes(itemId)
                )
                : [];
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const TableReducer = appSlice.reducer;

export const TableActions = appSlice.actions;
