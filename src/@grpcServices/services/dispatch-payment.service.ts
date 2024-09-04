import { DispatchersServiceClient } from '@proto/dispatchers.client';
import { GetDispatchersReply, GetDispatchersRequest } from '@proto/dispatchers';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new DispatchersServiceClient(grpcTransport);

const DispatchersGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getDispatchers: query<GetDispatchersReply, GetDispatchersRequest>({
            queryFn     : createPrivateQueryFn(Client, 'getDispatchers'),
            providesTags: ['dispatchers']
        })
    })
});

export default DispatchersGrpcService;
