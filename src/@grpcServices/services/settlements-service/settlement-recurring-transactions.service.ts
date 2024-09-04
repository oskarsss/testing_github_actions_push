import { SettlementRecurringTransactionServiceClient } from '@proto/settlement.recurring_transaction.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    SettlementRecurringTransactionCreateReply,
    SettlementRecurringTransactionCreateRequest,
    SettlementRecurringTransactionDeleteReply,
    SettlementRecurringTransactionDeleteRequest,
    SettlementRecurringTransactionGetReply,
    SettlementRecurringTransactionGetRequest,
    SettlementRecurringTransactionRetrieveReply,
    SettlementRecurringTransactionRetrieveRequest,
    SettlementRecurringTransactionUpdateReply,
    SettlementRecurringTransactionUpdateRequest,
    SettlementRecurringTransactionStatusUpdateReply,
    SettlementRecurringTransactionStatusUpdateRequest
} from '@proto/settlement.recurring_transaction';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest, tagIdList } from '@/store/api';

const Client = new SettlementRecurringTransactionServiceClient(grpcTransport);

const SettlementRecurringTransactionGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getRecurringTransactions: query<
            SettlementRecurringTransactionGetReply,
            SettlementRecurringTransactionGetRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'settlementRecurringTransactionGet'),
            providesTags: [{ type: 'recurring_transactions', id: tagIdList }]
        }),
        retrieveRecurringTransaction: query<
            SettlementRecurringTransactionRetrieveReply,
            SettlementRecurringTransactionRetrieveRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'settlementRecurringTransactionRetrieve'),
            providesTags: (res, _, arg) => [
                { type: 'recurring_transaction', id: arg.recurringTransactionId }
            ]
        }),
        createRecurringTransaction: mutation<
            SettlementRecurringTransactionCreateReply,
            SettlementRecurringTransactionCreateRequest & { settlementId?: string }
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementRecurringTransactionCreate'),
            invalidatesTags: (res, _, arg) => [
                { type: 'recurring_transactions', id: tagIdList },
                { type: 'driver', id: arg.driverId },
                ...(arg.settlementId
                    ? ([{ type: 'settlement', id: arg.settlementId }] as const)
                    : [])
            ],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Recurring Transaction',
                    success: 'Recurring Transaction was created'
                });
            }
        }),
        updateRecurringTransaction: mutation<
            SettlementRecurringTransactionUpdateReply,
            SettlementRecurringTransactionUpdateRequest & {
                settlementId?: string;
                driverId?: string;
            }
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementRecurringTransactionUpdate'),
            invalidatesTags: (res, _, arg) =>
                res
                    ? [
                        { type: 'recurring_transactions', id: tagIdList },
                        { type: 'recurring_transaction', id: arg.recurringTransactionId },
                        ...(arg.settlementId
                            ? ([{ type: 'settlement', id: arg.settlementId }] as const)
                            : []),
                        ...(arg.driverId ? ([{ type: 'driver', id: arg.driverId }] as const) : [])
                    ]
                    : [],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Recurring Transaction',
                    success: 'Recurring Transaction was updated'
                });
            }
        }),
        deleteRecurringTransaction: mutation<
            SettlementRecurringTransactionDeleteReply,
            SettlementRecurringTransactionDeleteRequest & {
                settlementId?: string;
                driverId?: string;
            }
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementRecurringTransactionDelete'),
            invalidatesTags: (res, _, arg) =>
                res
                    ? [
                        { type: 'recurring_transactions', id: tagIdList },
                        { type: 'recurring_transaction', id: arg.recurringTransactionId },
                        ...(arg.settlementId
                            ? ([{ type: 'settlement', id: arg.settlementId }] as const)
                            : []),
                        ...(arg.driverId ? ([{ type: 'driver', id: arg.driverId }] as const) : [])
                    ]
                    : [],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Recurring Transaction',
                    success: 'Recurring Transaction was deleted'
                });
            }
        }),
        updateStatusRecurringTransaction: mutation<
            SettlementRecurringTransactionStatusUpdateReply,
            SettlementRecurringTransactionStatusUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementRecurringTransactionStatusUpdate'),
            invalidatesTags: (res, _, arg) => [
                { type: 'recurring_transactions', id: tagIdList },
                { type: 'recurring_transaction', id: arg.recurringTransactionId }
            ],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating status',
                    success: 'Status was updated'
                });
            }
        })
    })
});

export default SettlementRecurringTransactionGrpcService;
