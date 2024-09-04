import { PayoutGetReply, PayoutGetRequest } from '@proto/payouts';
import { PayoutsServiceClient } from '@proto/payouts.client';
import grpcTransport from '../../grpcTransport';
import grpcAPI from '../../api';
import { createPrivateQueryFn } from '../../createQueryFn';

const Client = new PayoutsServiceClient(grpcTransport);

const PayoutsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getPayouts: query<PayoutGetReply, PayoutGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'payoutGet'),
            providesTags: ['payouts']
        })
    })
});

export default PayoutsGrpcService;
