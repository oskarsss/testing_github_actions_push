/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '../api';

type CountEntitiesPayload = {
    map_loads: number;
    map_trucks: number;
    map_trailers: number;
    map_drivers: number;
};

export type SelectedTab = 'loads' | 'trucks' | 'trailers' | 'drivers';

export const initialState = {
    selected: {
        load_id   : '',
        truck_id  : '',
        trailer_id: '',
        driver_id : ''
    },
    entities_count: {
        map_loads   : 0,
        map_trucks  : 0,
        map_trailers: 0,
        map_drivers : 0
    },
    search: {
        loads   : '',
        trucks  : '',
        trailers: '',
        drivers : ''
    }
};

const mapSlice = createSlice({
    name    : 'map',
    initialState,
    reducers: {
        updateSelected(state, action: PayloadAction<Partial<(typeof initialState)['selected']>>) {
            state.selected = {
                ...state.selected,
                ...action.payload
            };
        },
        countEntities(state, action: PayloadAction<CountEntitiesPayload>) {
            state.entities_count = action.payload;
        },
        resetSelectedEntities(state) {
            state.selected.truck_id = '';
            state.selected.trailer_id = '';
            state.selected.driver_id = '';
            state.selected.load_id = '';
        },
        changeSearch(
            state,
            action: PayloadAction<{ type: keyof (typeof state)['search']; value: string }>
        ) {
            state.search[action.payload.type] = action.payload.value;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

const MapReducer = mapSlice.reducer;

export default MapReducer;
export const MapActions = mapSlice.actions;
