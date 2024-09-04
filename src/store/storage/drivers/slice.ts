import { DriverModel_Driver } from '@proto/models/model_driver';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/store/api';
import { makeIndexes } from './utils/make-indexes';

type InitialState = {
    indexes: {
        driverIdToIndexesMap: Record<string, number>;
    };
    rows: DriverModel_Driver[];
    isLoading: boolean;
};

const initialState: InitialState = {
    rows   : [],
    indexes: {
        driverIdToIndexesMap: {}
    },
    isLoading: true
};

const DriversDataSlice = createSlice({
    name     : 'driversData',
    initialState,
    selectors: {
        getRows     : (state) => state.rows,
        getIndexes  : (state) => state.indexes,
        getIsLoading: (state) => state.isLoading
    },
    reducers: {
        InitializeData(state, action) {
            if (state.isLoading) {
                state.rows = action.payload;
                state.indexes = makeIndexes(action.payload);
                state.isLoading = false;
            }
        },
        UpdateDriver(
            state,
            action: PayloadAction<{
                driver: Partial<DriverModel_Driver>;
                isCacheUpdate: boolean;
            }>
        ) {
            const {
                isCacheUpdate,
                driver
            } = action.payload;

            const index = state.indexes.driverIdToIndexesMap[driver?.driverId || ''];
            if (index !== undefined) {
                state.rows[index] = {
                    ...state.rows[index],
                    ...driver
                };
            } else if (driver.driverId && !isCacheUpdate) {
                state.rows.push(driver as DriverModel_Driver);
            }

            state.indexes = makeIndexes(state.rows);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const DriversDataActions = DriversDataSlice.actions;
export const DriversDataSelectors = DriversDataSlice.selectors;
export const DriversDataReducer = DriversDataSlice.reducer;
