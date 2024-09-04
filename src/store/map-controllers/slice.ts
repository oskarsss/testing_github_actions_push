/* eslint-disable no-param-reassign */
import { WeatherControlField } from '@/hooks/map-hooks/useWeatherSettings';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WeatherControllerType = {
    timestamp: number;
    selected: WeatherControlField;
};

type InitialState = Record<string, { weather: WeatherControllerType }>;

const initialState: InitialState = {};

const mapControllerSlice = createSlice({
    name    : 'mapsControllers',
    initialState,
    reducers: {
        initiateControllers(state, action: PayloadAction<InitialState>) {
            state = action.payload;
            return state;
        },
        setWeatherController(
            state,
            action: PayloadAction<{
                storageKey: string;
                value: WeatherControllerType;
            }>
        ) {
            const {
                storageKey,
                value
            } = action.payload;
            if (state[storageKey]?.weather) {
                state[storageKey].weather = value;
                return state;
            }
            state = { ...state, [storageKey]: { weather: value } };
            return state;
        }
    }
});

export const MapControllersActions = mapControllerSlice.actions;
export const MapControllersReducer = mapControllerSlice.reducer;
