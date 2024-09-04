import { TruckModel_Truck } from '@proto/models/model_truck';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/store/api';
import createMap from '@/utils/create-map';
import { makeIndexes } from './utils/make-indexes';

type InitialState = {
    rows: TruckModel_Truck[];
    isLoading: boolean;
    trucksByIdMap: Record<string, TruckModel_Truck>;
    indexes: {
        truckIdToIndexesMap: Record<string, number>;
        trailerIdToIndexesMap: Record<string, number>;
        driverIdToIndexesMap: Record<string, number>;
    };
};

const initialState: InitialState = {
    rows         : [],
    isLoading    : true,
    trucksByIdMap: {},
    indexes      : {
        truckIdToIndexesMap  : {},
        trailerIdToIndexesMap: {},
        driverIdToIndexesMap : {}
    }
};

const TrucksDataSlice = createSlice({
    name     : 'trucksData',
    initialState,
    selectors: {
        getRows     : (state: InitialState) => state.rows,
        getIndexes  : (state: InitialState) => state.indexes,
        getMap      : (state: InitialState) => state.trucksByIdMap,
        getIsLoading: (state: InitialState) => state.isLoading
    },
    reducers: {
        InitializeData(state, action: PayloadAction<TruckModel_Truck[]>) {
            if (state.isLoading) {
                state.rows = action.payload;
                state.trucksByIdMap = createMap(action.payload, 'truckId');
                const indexes = makeIndexes(action.payload);
                state.indexes = indexes;
                state.isLoading = false;
            }
        },
        UpdateTruck(
            state,
            action: PayloadAction<{ truck: Partial<TruckModel_Truck>; isCacheUpdate: boolean }>
        ) {
            const {
                isCacheUpdate,
                truck
            } = action.payload;

            const index = state.indexes.truckIdToIndexesMap[truck?.truckId || ''];
            if (index !== undefined) {
                state.rows[index] = {
                    ...state.rows[index],
                    ...truck
                };
            } else if (truck.truckId && !isCacheUpdate) {
                state.rows.push(truck as TruckModel_Truck);
            }

            state.trucksByIdMap = createMap(state.rows, 'truckId');
            state.indexes = makeIndexes(state.rows);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const TrucksDataActions = TrucksDataSlice.actions;
export const TrucksDataReducer = TrucksDataSlice.reducer;
export const TrucksDataSelectors = TrucksDataSlice.selectors;
