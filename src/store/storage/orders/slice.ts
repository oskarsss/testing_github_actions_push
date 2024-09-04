/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
import { LoadModel } from '@proto/models/model_load';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoadData_Load } from '@proto/loads';
import { ManifestModel_Stop } from '@proto/models/model_manifest';
import { api } from '@/store/api';
import { createIndexes } from './utils/indexes';
import { getArchivedOrdersThunk } from './actions/thunks';

type InitialState = {
    indexes: {
        truckIdToIndexesMap: Record<string, number[]>;
        statusToIndexesMap: Record<string, number[]>;
        firstStopDateToIndexesMap: Record<string, number[]>;
        grossAmountToIndexesMap: Record<number, number[]>;
        loadedMilesToIndexesMap: Record<number, number[]>;
        orderIdToIndexMap: Record<string, number>;
        trailerIdToIndexesMap: Record<string, number[]>;
        driverIdToIndexesMap: Record<string, number[]>;
        brokerIdToIndexesMap: Record<string, number[]>;
        customerIdToIndexesMap: Record<string, number[]>;
        invoiceStatusToIndexesMap: Record<string, number[]>;
        userToIndexesMap: Record<string, number[]>;
        invoiceFactoringCompanyToIndexesMap: Record<string, number[]>;
        stopsByIndex: Record<number, ManifestModel_Stop[]>;
    };
    rows: LoadData_Load[];
    isLoading: boolean;
    isFetching: boolean;
};

const initialState: InitialState = {
    rows   : [],
    indexes: {
        trailerIdToIndexesMap              : {},
        orderIdToIndexMap                  : {},
        firstStopDateToIndexesMap          : {},
        grossAmountToIndexesMap            : {},
        loadedMilesToIndexesMap            : {},
        statusToIndexesMap                 : {},
        truckIdToIndexesMap                : {},
        driverIdToIndexesMap               : {},
        brokerIdToIndexesMap               : {},
        customerIdToIndexesMap             : {},
        invoiceStatusToIndexesMap          : {},
        userToIndexesMap                   : {},
        invoiceFactoringCompanyToIndexesMap: {},
        stopsByIndex                       : {}
    },
    isLoading : true,
    isFetching: false
};

const OrdersDataSlice = createSlice({
    name     : 'ordersData',
    initialState,
    selectors: {
        getOrdersRows   : (state: InitialState) => state.rows,
        getOrdersRowById: (state: InitialState, orderId: string) =>
            state.rows[state.indexes.orderIdToIndexMap[orderId]],
        getOrdersRowByIndex               : (state: InitialState, index: number) => state.rows[index],
        getOrdersTruckIdToIndexesMap      : (state: InitialState) => state.indexes.truckIdToIndexesMap,
        getOrdersStatusToIndexesMap       : (state: InitialState) => state.indexes.statusToIndexesMap,
        getOrdersFirstStopDateToIndexesMap: (state: InitialState) =>
            state.indexes.firstStopDateToIndexesMap,
        getOrdersGrossAmountToIndexesMap: (state: InitialState) =>
            state.indexes.grossAmountToIndexesMap,
        getOrdersLoadedDistanceToIndexesMap: (state: InitialState) =>
            state.indexes.loadedMilesToIndexesMap,
        getOrdersOrderIdToIndexMap    : (state: InitialState) => state.indexes.orderIdToIndexMap,
        getOrdersTrailerIdToIndexesMap: (state: InitialState) =>
            state.indexes.trailerIdToIndexesMap,
        getOrdersDriverIdToIndexesMap  : (state: InitialState) => state.indexes.driverIdToIndexesMap,
        getOrdersBrokerIdToIndexesMap  : (state: InitialState) => state.indexes.brokerIdToIndexesMap,
        getOrdersCustomerIdToIndexesMap: (state: InitialState) =>
            state.indexes.customerIdToIndexesMap,
        getOrdersInvoiceStatusToIndexesMap: (state: InitialState) =>
            state.indexes.invoiceStatusToIndexesMap,
        getOrdersUserToIndexesMap                   : (state: InitialState) => state.indexes.userToIndexesMap,
        getOrdersIsLoading                          : (state: InitialState) => state.isLoading,
        getOrdersInvoiceFactoringCompanyToIndexesMap: (state: InitialState) =>
            state.indexes.invoiceFactoringCompanyToIndexesMap,
        getOrdersIsFetching  : (state: InitialState) => state.isFetching,
        getOrdersStopsByIndex: (state: InitialState) => state.indexes.stopsByIndex
    },
    reducers: {
        InitializeData(state, action: PayloadAction<LoadData_Load[]>) {
            const rows = action.payload;
            if (state.isLoading) {
                const indexes = createIndexes(rows);

                state.rows = rows;
                state.indexes = indexes;
                state.isLoading = false;
            }
        },
        UpdateOrder(
            state,
            action: PayloadAction<{ order: Partial<LoadData_Load>; isCacheUpdate: boolean }>
        ) {
            const {
                order,
                isCacheUpdate
            } = action.payload;
            const index = state.indexes.orderIdToIndexMap[order?.loadId || ''];

            if (index !== undefined) {
                state.rows[index] = {
                    ...state.rows[index],
                    ...order
                };
            } else if (order.loadId && !isCacheUpdate) {
                state.rows.push(order as LoadData_Load);
            }

            const indexes = createIndexes(state.rows);
            state.indexes = indexes;
        },
        SetIsFetching(state, action: PayloadAction<boolean>) {
            state.isFetching = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getArchivedOrdersThunk.fulfilled, (state, { payload }) => {
            const { orders } = payload;

            const newRows = [...state.rows, ...orders];

            const indexes = createIndexes(newRows);

            state.rows = newRows;
            state.indexes = indexes;

            state.isFetching = false;
        });
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
    }
});

export const OrdersDataActions = OrdersDataSlice.actions;
export const OrdersDataReducer = OrdersDataSlice.reducer;
export const OrdersDataSelectors = OrdersDataSlice.selectors;
