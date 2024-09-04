/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { api } from '@/store/api';
import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';
import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';
import SettlementCyclesGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycles.service';
import SettlementsGrpcService from '@/@grpcServices/services/settlements-service/settlements.service';
import SettlementsTypes from './types';

// type RecurringTransactions = Pick<
//     SettlementsTypes.CycleSettlementDetails.FirstDriver,
//     'recurring_transactions'
// >;

type TabValue =
    | keyof Pick<
          SettlementsTypes.CycleSettlementDetails.Settlement,
          'manifestsInfo' | 'driverRecurringTransactionsInfo' | 'tollsInfo' | 'fuelInfo'
      >;

// | keyof RecurringTransactions;
type InitialState = {
    edit_dialog: {
        is_pro_mode: boolean;
        expand_driver_pay_columns: string[];
        tabValue: TabValue;
        transactionsTabValue: 'transactions' | 'recurring_transactions';
    };
    isLoading: boolean;
    cycle_id: string;
    period_id: string;
    default_cycle_id: string;
    default_period_id: string;
};

export const initialState: InitialState = {
    edit_dialog: {
        is_pro_mode              : false,
        expand_driver_pay_columns: [],
        tabValue                 : 'manifestsInfo',
        transactionsTabValue     : 'transactions'
    },
    isLoading        : false,
    cycle_id         : '',
    period_id        : '',
    default_cycle_id : '',
    default_period_id: ''
};

const settlementsSlice = createSlice({
    name    : 'settlements',
    initialState,
    reducers: {
        SetRequestData(state, action: PayloadAction<{ cycle_id?: string; period_id?: string }>) {
            if (action.payload.cycle_id !== undefined) {
                const cycleId = action.payload.cycle_id || state.cycle_id || state.default_cycle_id;
                if (cycleId !== state.cycle_id) {
                    state.isLoading = true;
                }
                state.cycle_id = cycleId;
            }
            if (action.payload.period_id !== undefined) {
                const periodId =
                    action.payload.period_id || state.period_id || state.default_period_id;
                if (periodId !== state.period_id) {
                    state.isLoading = true;
                }
                state.period_id = periodId;
            }
        },
        UpdateFromQuery(state, action: PayloadAction<{ cycle_id?: string; period_id?: string }>) {
            const cycleId = action.payload.cycle_id ?? state.default_cycle_id;
            const periodId = action.payload.period_id ?? state.default_period_id;

            if (cycleId !== state.cycle_id || periodId !== state.period_id) {
                state.isLoading = true;
            }

            state.cycle_id = cycleId;
            state.period_id = periodId;
        },
        SetPeriodId(state, action: PayloadAction<string>) {
            state.period_id = action.payload;
        },
        SetCycleId(state, action: PayloadAction<string>) {
            state.cycle_id = action.payload;
        },
        SetEditDialogProMode(state, action: PayloadAction<boolean>) {
            state.edit_dialog.is_pro_mode = action.payload;
        },
        SetEditDialogExpandDriverPayColumn(state, action: PayloadAction<string>) {
            if (state.edit_dialog.expand_driver_pay_columns.includes(action.payload)) {
                state.edit_dialog.expand_driver_pay_columns =
                    state.edit_dialog.expand_driver_pay_columns.filter(
                        (column) => column !== action.payload
                    );
            } else {
                state.edit_dialog.expand_driver_pay_columns.push(action.payload);
            }
        },
        SetEditDialogExpandDriverPayColumns(state, action: PayloadAction<string[]>) {
            state.edit_dialog.expand_driver_pay_columns = action.payload;
        },
        ToggleTabValue(state, action: PayloadAction<TabValue>) {
            state.edit_dialog.tabValue = action.payload;
        },
        ToggleTransactionsTabValue(
            state,
            action: PayloadAction<'transactions' | 'recurring_transactions'>
        ) {
            state.edit_dialog.transactionsTabValue = action.payload;
        },
        SetIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));

        builder.addMatcher(
            SettlementsGrpcService.endpoints.getSettlements.matchFulfilled,
            (state) => {
                state.isLoading = false;
            }
        );

        builder.addMatcher(
            SettlementsGrpcService.endpoints.getSettlements.matchRejected,
            (state) => {
                state.isLoading = false;
            }
        );

        builder.addMatcher(
            SettlementCyclesGrpcService.endpoints.getCycles.matchFulfilled,
            (state, action) => {
                if (!state.default_cycle_id) {
                    const cycleId =
                        action.payload.settlementCycles.find(
                            (cycle) => !cycle.deleted || cycle.default
                        )?.cycleId ??
                        action.payload.settlementCycles[0]?.cycleId ??
                        '';
                    state.default_cycle_id = cycleId;
                    state.cycle_id = state.cycle_id || cycleId;
                }
            }
        );
        builder.addMatcher(
            SettlementCyclePeriodsGrpcService.endpoints.getPeriods.matchFulfilled,
            (state, action) => {
                if (!state.default_period_id) {
                    const firstClosedPeriod = action.payload.periods.find(
                        (period) => period.status === Settlements_Cycle_Period_Status.CLOSED
                    );
                    const periodId =
                        firstClosedPeriod?.periodId || action.payload.periods[0]?.periodId;
                    state.default_period_id = periodId;
                    state.period_id = state.period_id || periodId;
                }
            }
        );
    }
});

export const SettlementsReducer = settlementsSlice.reducer;

export const SettlementsActions = settlementsSlice.actions;
