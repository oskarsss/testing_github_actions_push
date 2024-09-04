import { SettlementCyclePeriodServiceClient } from '@proto/settlement.cycle.period.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';
import {
    SettlementCyclePeriodGetReply,
    SettlementCyclePeriodGetRequest,
    SettlementCyclePeriodDeleteRequest,
    SettlementCyclePeriodDeleteReply,
    SettlementCyclePeriodCreateReply,
    SettlementCyclePeriodCreateRequest,
    SettlementCyclePeriodUpdateReply,
    SettlementCyclePeriodUpdateRequest,
    SettlementCyclePeriodStatusUpdateReply,
    SettlementCyclePeriodStatusUpdateRequest
} from '@proto/settlement.cycle.period';

const Client = new SettlementCyclePeriodServiceClient(grpcTransport);

const SettlementCyclePeriodsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getPeriods: query<SettlementCyclePeriodGetReply, SettlementCyclePeriodGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'settlementCyclePeriodGet'),
            providesTags: ['settlement_periods']
        }),
        createPeriod: mutation<
            SettlementCyclePeriodCreateReply,
            SettlementCyclePeriodCreateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementCyclePeriodCreate'),
            invalidatesTags: ['settlement_periods'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating period',
                    success: 'Period was created'
                });
            }
        }),
        updatePeriod: mutation<
            SettlementCyclePeriodUpdateReply,
            SettlementCyclePeriodUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementCyclePeriodUpdate'),
            invalidatesTags: ['settlement_periods'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating period',
                    success: 'Period was updated'
                });
            }
        }),
        deletePeriod: mutation<
            SettlementCyclePeriodDeleteReply,
            SettlementCyclePeriodDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementCyclePeriodDelete'),
            invalidatesTags: ['settlement_periods'],
            onQueryStarted(arg, {
                queryFulfilled,
                dispatch,
                getState
            }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting period',
                    success: 'Period was deleted'
                });
            }
        }),
        updatePeriodStatus: mutation<
            SettlementCyclePeriodStatusUpdateReply,
            SettlementCyclePeriodStatusUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementCyclePeriodStatusUpdate'),
            invalidatesTags: ['settlement_periods'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating period status',
                    success: 'Period status was updated'
                });
            }
        })
    })
});

export default SettlementCyclePeriodsGrpcService;
