import { IntegrationProviderWexClient } from '@proto/integration_provider_wex.client';
import {
    IP_Wex_TransactionTypeGetRequest,
    IP_Wex_TransactionTypeGetReply,
    IP_Wex_TranasctionTypeUpdateReply,
    IP_Wex_TranasctionTypeUpdateRequest
} from '@proto/integration_provider_wex';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new IntegrationProviderWexClient(grpcTransport);

const IntegrationWexGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getWexTransactionTypes: query<
            IP_Wex_TransactionTypeGetReply,
            IP_Wex_TransactionTypeGetRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'iPWexTransactionTypeGet'),
            providesTags: ['integration.wex.transactionTypes']
        }),
        updateWexTransactionType: mutation<
            IP_Wex_TranasctionTypeUpdateReply,
            IP_Wex_TranasctionTypeUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'iPWexTranasctionTypeUpdate'),
            invalidatesTags: ['integration.wex.transactionTypes'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Updating Wex transaction type',
                    success       : 'Wex transaction type updated'
                });
            }
        })
    })
});
export default IntegrationWexGrpcService;
