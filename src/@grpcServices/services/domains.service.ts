import { DomainServiceClient } from '@proto/domain.client';
import {
    DomainCreateReply,
    DomainCreateRequest,
    DomainDeleteReply,
    DomainDeleteRequest,
    DomainGetReply,
    DomainGetRequest
} from '@proto/domain';
import { handleRequest } from '@/store/api';
import { createPrivateQueryFn } from '../createQueryFn';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';

const Client = new DomainServiceClient(grpcTransport);

const DomainGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        domainCreate: mutation<DomainCreateReply, DomainCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'domainCreate'),
            invalidatesTags: ['domains'],
            onQueryStarted : (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    success       : 'Domain created',
                    loading       : 'Creating domain'
                });
            }
        }),
        domainDelete: mutation<DomainDeleteReply, DomainDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'domainDelete'),
            invalidatesTags: ['domains'],
            onQueryStarted : (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    success       : 'Domain deleted',
                    loading       : 'Deleting domain'
                });
            }
        }),
        domainGet: query<DomainGetReply, DomainGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'domainGet'),
            providesTags: ['domains']
        })
    })
});

export default DomainGrpcService;
