import { SettlementTransactionsServiceClient } from '@proto/settlement_transactions.client';
import {
    SettlementTransactionCreateRequest,
    SettlementTransactionCreateReply,
    SettlementTransactionDeleteReply,
    SettlementTransactionDeleteRequest,
    SettlementTransactionUnassignReply,
    SettlementTransactionUnassignRequest,
    SettlementTransactionUpdateReply,
    SettlementTransactionUpdateRequest,
    SettlementEntityTransactionHistoryRequest,
    SettlementEntityTransactionHistoryReply
} from '@proto/settlement_transactions';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import { handleRequest } from '@/store/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { invalidateSettlement } from '@/store/accounting/settlements/utils';
import API_TAGS from '@/store/api_tags';

const Client = new SettlementTransactionsServiceClient(grpcTransport);

const SettlementTransactionsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        settlementTransactionUnassign: mutation<
            SettlementTransactionUnassignReply,
            SettlementTransactionUnassignRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementTransactionUnassign'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unassigning transaction',
                    success: 'Transaction was unassigned'
                });
            }
        }),
        settlementTransactionCreate: mutation<
            SettlementTransactionCreateReply,
            SettlementTransactionCreateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementTransactionCreate'),
            invalidatesTags: (result, _, arg) => [
                'settlements',
                'settlement_periods',
                API_TAGS.settlement_transactions_history,
                { type: 'settlement', id: arg.settlementId }
            ],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating transaction',
                    success: 'Transaction was created'
                });
            }
        }),
        settlementTransactionUpdate: mutation<
            SettlementTransactionUpdateReply,
            SettlementTransactionUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementTransactionUpdate'),
            invalidatesTags: (result, _, arg) => [
                'settlements',
                'settlement_periods',
                { type: 'settlement', id: arg.settlementId },
                API_TAGS.settlement_transactions_history
            ],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating transaction',
                    success: 'Transaction was updated'
                });
            }
        }),
        settlementTransactionDelete: mutation<
            SettlementTransactionDeleteReply,
            SettlementTransactionDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementTransactionDelete'),
            invalidatesTags: (result, _, arg) => [
                'settlements',
                'settlement_periods',
                API_TAGS.settlement_transactions_history,
                { type: 'settlement', id: arg.settlementId }
            ],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting transaction',
                    success: 'Transaction was deleted'
                });
            }
        }),
        settlementTransactionsHistoryGet: query<
            SettlementEntityTransactionHistoryReply,
            SettlementEntityTransactionHistoryRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'settlementEntityTransactionHistory'),
            providesTags: [API_TAGS.settlement_transactions_history]
        })
    })
});

export default SettlementTransactionsGrpcService;
