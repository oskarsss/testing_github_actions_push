/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import Dispatch from '@/store/accounting/dispatchers/types';
import { api } from '@/store/api';
import { Settlements_Cycle_Period_Status } from '@proto/models/model_settlement';
import SettlementCyclesGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycles.service';
import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';

const initialState: Dispatch.Redux.InitialState = {
    cycle_id         : '',
    period_id        : '',
    default_cycle_id : '',
    default_period_id: ''
};

const dispatchersSlice = createSlice({
    name    : 'dispatch',
    initialState,
    reducers: {
        SetRequestData(state, action: PayloadAction<Dispatch.Redux.RequestDataPayload>) {
            state.cycle_id =
                action.payload.cycle_id !== undefined ? action.payload.cycle_id : state.cycle_id;
            state.period_id =
                action.payload.period_id !== undefined ? action.payload.period_id : state.period_id;
        },
        UpdateFromQuery(state, action: PayloadAction<Dispatch.Redux.RequestDataPayload>) {
            state.cycle_id = action.payload.cycle_id ?? state.default_cycle_id;
            state.period_id = action.payload.period_id ?? state.default_period_id;
        }
    },
    extraReducers(builder) {
        builder.addCase(api.util.resetApiState, () => ({ ...initialState }));
        builder.addMatcher(
            SettlementCyclesGrpcService.endpoints.getCycles.matchFulfilled,
            (state, action) => {
                if (!state.default_cycle_id && action.payload.settlementCycles.length > 0) {
                    const cycleId =
                        action.payload.settlementCycles.find(
                            (cycle) => !cycle.deleted || cycle.default
                        )?.cycleId ??
                        action.payload.settlementCycles[0]?.cycleId ??
                        '';
                    state.default_cycle_id = cycleId || state.default_cycle_id;
                    state.cycle_id = state.cycle_id || cycleId;
                }
            }
        );
        builder.addMatcher(
            SettlementCyclePeriodsGrpcService.endpoints.getPeriods.matchFulfilled,
            (state, action) => {
                if (!state.default_period_id && action.payload.periods.length > 0) {
                    const firstClosedPeriod = action.payload.periods.find(
                        (period) => period.status === Settlements_Cycle_Period_Status.CLOSED
                    );
                    const periodId =
                        firstClosedPeriod?.periodId || action.payload.periods[0]?.periodId;

                    if (periodId) {
                        state.default_period_id = periodId;
                        state.period_id = state.period_id || periodId;
                    }
                }
            }
        );
    }
});

export const DispatchersReducer = dispatchersSlice.reducer;
export const DispatchersActions = dispatchersSlice.actions;
