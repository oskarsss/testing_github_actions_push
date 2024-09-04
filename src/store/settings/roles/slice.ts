/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Settings from '@/store/settings/types';
import { api } from '@/store/api';

const initialState: Settings.RolesState = {
    filter: {
        page    : 0,
        per_page: 50,
        search  : '',
        orderBy : 'reference_id',
        order   : 'asc'
    },

    selected_view_id: '0',
    views           : [
        {
            columns: []
        }
    ]
};

const RolesSlice = createSlice({
    name    : 'roles',
    initialState,
    reducers: {
        updateFilter(state, action: PayloadAction<Settings.FilterType>) {
            state.filter = {
                ...state.filter,
                ...action.payload
            };
        },
        selectView(state, action: PayloadAction<number>) {
            state.selected_view_id = action.payload.toString();
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const RolesReducer = RolesSlice.reducer;
export const RolesActions = RolesSlice.actions;
