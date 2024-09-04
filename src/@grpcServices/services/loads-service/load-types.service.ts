import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import grpcTransport from '@/@grpcServices/grpcTransport';
import { handleRequest } from '@/store/api';
import {
    LoadTypeCreateReply,
    LoadTypeCreateRequest,
    LoadTypeDeleteReply,
    LoadTypeDeleteRequest,
    LoadTypeUpdateReply,
    LoadTypeUpdateRequest,
    LoadTypesGetReply,
    LoadTypesGetRequest
} from '@proto/load_types';
import { LoadTypesServiceClient } from '@proto/load_types.client';

const Client = new LoadTypesServiceClient(grpcTransport);

const LoadTypesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getLoadTypes: query<LoadTypesGetReply, LoadTypesGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'loadTypesGet'),
            providesTags: ['load_types']
        }),
        createLoadType: mutation<LoadTypeCreateReply, LoadTypeCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'loadTypeCreate'),
            invalidatesTags: ['load_types'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Creating Order Type',
                    success: 'Order Type was created'
                });
            }
        }),
        updateLoadType: mutation<LoadTypeUpdateReply, LoadTypeUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'loadTypeUpdate'),
            invalidatesTags: ['load_types'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating Order Type',
                    success: 'Order Type was updated'
                });
            }
        }),
        deleteLoadType: mutation<LoadTypeDeleteReply, LoadTypeDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'loadTypeDelete'),
            invalidatesTags: ['load_types'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Order Type',
                    success: 'Order Type was deleted'
                });
            }
        })
    })
});

export default LoadTypesGrpcService;
