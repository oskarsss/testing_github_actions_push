/* eslint-disable no-param-reassign */
import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { api } from '../api';

const pages = createSlice({
    name        : 'pages',
    initialState: {} as Record<string, number | string>,
    reducers    : {
        selectView: (state, action: PayloadAction<{ page: string; view_id: string | string }>) => {
            const {
                page,
                view_id
            } = action.payload;
            state[page] = view_id;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({}));
    }
});

export const { selectView } = pages.actions;

export default pages.reducer;
