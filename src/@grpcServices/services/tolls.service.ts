import { TollsServiceClient } from '@proto/tolls.client';
import {
    AssignEquipmentReply,
    AssignEquipmentRequest,
    CreateTollReply,
    CreateTollRequest,
    DeleteTollReply,
    DeleteTollRequest,
    UnassignEquipmentReply,
    UnassignEquipmentRequest,
    UpdateTollReply,
    UpdateTollRequest,
    TollRetrieveReply,
    TollRetrieveRequest,
    TollStatsGetReply,
    TollStatsGetRequest,
    TollGetReply,
    TollGetRequest,
    TollBatchAssignReply,
    TollBatchAssignRequest,
    TollBatchUnassignReply,
    TollBatchUnassignRequest
} from '@proto/tolls';
import { handleRequest, invalidateTags } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const TollsService = new TollsServiceClient(grpcTransport);

const TollsGrpcService = grpcAPI.injectEndpoints({
    endpoints: (builder) => ({
        getTolls: builder.query<TollGetReply, TollGetRequest>({
            queryFn          : createPrivateQueryFn(TollsService, 'tollGet'),
            providesTags     : (result) => invalidateTags(result, 'tolls'),
            keepUnusedDataFor: 0
        }),

        getTollStats: builder.query<TollStatsGetReply, TollStatsGetRequest>({
            queryFn          : createPrivateQueryFn(TollsService, 'tollStatsGet'),
            providesTags     : (result) => invalidateTags(result, 'tolls'),
            keepUnusedDataFor: 0
        }),

        createToll: builder.mutation<CreateTollReply, CreateTollRequest>({
            queryFn        : createPrivateQueryFn(TollsService, 'createToll'),
            invalidatesTags: (result) => invalidateTags(result, 'tolls'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating toll transaction',
                    success: 'Toll transaction was created'
                });
            }
        }),
        retrieveToll: builder.query<TollRetrieveReply, TollRetrieveRequest>({
            queryFn     : createPrivateQueryFn(TollsService, 'tollRetrieve'),
            providesTags: (result, _, arg) => invalidateTags(result, 'tolls', arg.tollId, 'toll')
        }),
        assignEquipment: builder.mutation<AssignEquipmentReply, AssignEquipmentRequest>({
            queryFn        : createPrivateQueryFn(TollsService, 'assignEquipment'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'tolls', arg.tollID, 'toll'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Assigning toll transaction',
                    success: 'Toll transaction was assigned'
                });
            }
        }),
        unassignEquipment: builder.mutation<UnassignEquipmentReply, UnassignEquipmentRequest>({
            queryFn        : createPrivateQueryFn(TollsService, 'unassignEquipment'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'tolls', arg.tollID, 'toll'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unassigning toll transaction',
                    success: 'Toll transaction was unassigned'
                });
            }
        }),
        deleteToll: builder.mutation<DeleteTollReply, DeleteTollRequest>({
            queryFn        : createPrivateQueryFn(TollsService, 'deleteToll'),
            invalidatesTags: (result) => invalidateTags(result, 'tolls'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting toll transaction',
                    success: 'Toll transaction was deleted'
                });
            }
        }),
        updateToll: builder.mutation<UpdateTollReply, UpdateTollRequest>({
            queryFn        : createPrivateQueryFn(TollsService, 'updateToll'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'tolls', arg.tollId, 'toll'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating toll transaction',
                    success: 'Toll transaction was updated'
                });
            }
        }),
        batchAssignTollsToEquipment: builder.mutation<TollBatchAssignReply, TollBatchAssignRequest>(
            {
                queryFn        : createPrivateQueryFn(TollsService, 'tollBatchAssign'),
                invalidatesTags: (result) => invalidateTags(result, 'tolls'),
                onQueryStarted(arg, { queryFulfilled }) {
                    handleRequest({
                        queryFulfilled,
                        loading: 'Assigning equipment to tolls',
                        success: 'Equipment was assigned to tolls'
                    });
                }
            }
        ),
        batchUnassignEquipmentFromTolls: builder.mutation<
            TollBatchUnassignReply,
            TollBatchUnassignRequest
        >({
            queryFn        : createPrivateQueryFn(TollsService, 'tollBatchUnassign'),
            invalidatesTags: (result) => invalidateTags(result, 'tolls'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unassigning equipment from tolls',
                    success: 'Equipment was unassigned from tolls'
                });
            }
        })
    })
});

export default TollsGrpcService;
