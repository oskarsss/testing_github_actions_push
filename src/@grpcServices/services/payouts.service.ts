import { PayoutsServiceClient } from '@proto/payouts.client';
import {
    PayoutCreateReply,
    PayoutCreateRequest,
    PayoutDeleteReply,
    PayoutDeleteRequest,
    PayoutGetReply,
    PayoutGetRequest,
    PayoutStatusUpdateReply,
    PayoutStatusUpdateRequest,
    PayoutTypeUpdateReply,
    PayoutTypeUpdateRequest,
    PayoutUpdateReply,
    PayoutUpdateRequest
} from '@proto/payouts';
import { handleRequest, invalidateTags, provideTag, tagIdList } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new PayoutsServiceClient(grpcTransport);

const PayoutsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        createPayout: mutation<PayoutCreateReply, PayoutCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'payoutCreate'),
            invalidatesTags: (result) =>
                invalidateTags(result, 'payouts', result?.payoutId, 'payout'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating payout',
                    success: 'Payout was created'
                });
            }
        }),
        deletePayout: mutation<PayoutDeleteReply, PayoutDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'payoutDelete'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'payouts', arg?.payoutId, 'payout'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting payout',
                    success: 'Payout was deleted'
                });
            }
        }),
        getPayouts: query<PayoutGetReply, PayoutGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'payoutGet'),
            providesTags: (result) => provideTag(result, 'payouts', tagIdList)
        }),
        updatePayoutStatus: mutation<PayoutStatusUpdateReply, PayoutStatusUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'payoutStatusUpdate'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'payouts', arg?.payoutId, 'payout'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating payout status',
                    success: 'Payout status was updated'
                });
            }
        }),
        updatePayoutType: mutation<PayoutTypeUpdateReply, PayoutTypeUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'payoutTypeUpdate'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'payouts', arg?.payoutId, 'payout'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating payout type',
                    success: 'Payout type was updated'
                });
            }
        }),
        updatePayout: mutation<PayoutUpdateReply, PayoutUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'payoutUpdate'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'payouts', arg?.payoutId, 'payout'),
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating payout',
                    success: 'Payout was updated'
                });
            }
        })
    })
});

export default PayoutsGrpcService;
