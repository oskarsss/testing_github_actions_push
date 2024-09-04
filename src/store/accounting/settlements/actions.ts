/* eslint-disable function-paren-newline */
/* eslint-disable no-promise-executor-return */
/* eslint-disable max-len */
/* eslint-disable prefer-destructuring */
import { AppThunkAction } from '@/store/types';
import PayoutsGrpcService from '@/@grpcServices/services/payouts.service';
import RevenueTypesGrpcService from '@/@grpcServices/services/settlements-service/revenue-types.service';
import SettlementTransactionCategoriesGrpcService from '@/@grpcServices/services/settlements-service/settlement-transaction-catogories.service';
import SettlementCyclesGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycles.service';
import SettlementCyclePeriodsGrpcService from '@/@grpcServices/services/settlements-service/settlement-cycle-periods';

// set up init for categories

export function CategoriesInit(refetch = true): AppThunkAction<Promise<void>> {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            dispatch(
                SettlementTransactionCategoriesGrpcService.endpoints.getCategories.initiate(
                    {},
                    {
                        forceRefetch: refetch
                    }
                )
            ).finally(() => resolve());
        });
    };
}

export function RevenueTypesInit(refetch = true): AppThunkAction<Promise<void>> {
    return function (dispatch) {
        return new Promise((resolve, reject) => {
            dispatch(
                RevenueTypesGrpcService.endpoints.getRevenueTypes.initiate(
                    {},
                    {
                        forceRefetch: refetch
                    }
                )
            ).finally(() => resolve());
        });
    };
}

export function settlementsInit(): AppThunkAction {
    return async function (dispatch) {
        try {
            const response = await dispatch(
                SettlementCyclesGrpcService.endpoints.getCycles.initiate({})
            ).unwrap();

            const cycleId =
                response.settlementCycles.find((cycle) => !cycle.deleted || cycle.default)
                    ?.cycleId ??
                response.settlementCycles[0]?.cycleId ??
                '';

            dispatch(SettlementCyclePeriodsGrpcService.endpoints.getPeriods.initiate({ cycleId }));
        } catch (error) {
            console.error('settlementsInit', error);
        }
    };
}
