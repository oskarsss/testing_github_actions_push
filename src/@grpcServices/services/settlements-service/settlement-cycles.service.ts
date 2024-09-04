import { SettlementCycleServiceClient } from '@proto/settlement.cycle.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    SettlementCycleGetReply,
    SettlementCycleGetRequest,
    SettlementCycleCreateRequest,
    SettlementCycleCreateReply,
    SettlementCycleUpdateRequest,
    SettlementCycleUpdateReply,
    SettlementCycleDeactivateReply,
    SettlementCycleDeactivateRequest,
    SettlementCycleActivateRequest,
    SettlementCycleActivateReply
} from '@proto/settlement.cycle';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest, tagIdList } from '@/store/api';

const Client = new SettlementCycleServiceClient(grpcTransport);

const SettlementCyclesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getCycles: query<SettlementCycleGetReply, SettlementCycleGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'settlementCycleGet'),
            providesTags: [{ type: 'cycles', id: tagIdList }]
        }),
        createCycle: mutation<SettlementCycleCreateReply, SettlementCycleCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'settlementCycleCreate'),
            invalidatesTags: ['cycles'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating cycle',
                    success: 'Cycle was created'
                });
            }
        }),
        updateCycle: mutation<SettlementCycleUpdateReply, SettlementCycleUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'settlementCycleUpdate'),
            invalidatesTags: ['cycles'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating cycle',
                    success: 'Cycle was updated'
                });
            }
        }),
        deactivateCycle: mutation<SettlementCycleDeactivateReply, SettlementCycleDeactivateRequest>(
            {
                queryFn        : createPrivateQueryFn(Client, 'settlementCycleDeactivate'),
                invalidatesTags: ['cycles'],
                onQueryStarted(arg, { queryFulfilled }) {
                    handleRequest({
                        queryFulfilled,
                        loading: 'Deactivating cycle',
                        success: 'Cycle was deactivated'
                    });
                }
            }
        ),
        activateCycle: mutation<SettlementCycleActivateReply, SettlementCycleActivateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'settlementCycleActivate'),
            invalidatesTags: ['cycles'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Activating cycle',
                    success: 'Cycle was activated'
                });
            }
        })
    })
});

export default SettlementCyclesGrpcService;
