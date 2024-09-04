import { BrokersServiceClient } from '@proto/brokers.client';
import {
    BrokerGetReply,
    BrokerGetRequest,
    BrokerCreateReply,
    BrokerCreateRequest,
    BrokerDeleteReply,
    BrokerDeleteRequest,
    BrokerUpdateReply,
    BrokerUpdateRequest,
    BrokerRetrieveReply,
    BrokerRetrieveRequest,
    CreateBrokerUserReply,
    CreateBrokerUserRequest,
    DeleteBrokerUserRequest,
    DeleteBrokerUserReply,
    GetBrokerUsersRequest,
    GetBrokerUsersReply,
    UpdateBrokerUserRequest,
    UpdateBrokerUserReply,
    InviteBrokerUserRequest,
    InviteBrokerUserReply,
    GetFMCSABrokersReply,
    GetFMCSABrokersRequest
} from '@proto/brokers';
import api_tags from '@/store/api_tags';
import { handleRequest } from '@/store/api';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';
import grpcTransport from '../grpcTransport';

const Client = new BrokersServiceClient(grpcTransport);

export const BrokersGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getBrokerUsers: query<GetBrokerUsersReply, GetBrokerUsersRequest>({
            queryFn          : createPrivateQueryFn(Client, 'getBrokerUsers'),
            providesTags     : [api_tags.brokerUsers],
            keepUnusedDataFor: 0
        }),

        createBrokerUser: mutation<CreateBrokerUserReply, CreateBrokerUserRequest>({
            queryFn: createPrivateQueryFn(Client, 'createBrokerUser'),
            onQueryStarted(ard, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Broker User',
                    success: 'Broker User was created'
                });
            },
            invalidatesTags: [api_tags.brokerUsers]
        }),

        updateBrokerUser: mutation<UpdateBrokerUserReply, UpdateBrokerUserRequest>({
            queryFn: createPrivateQueryFn(Client, 'updateBrokerUser'),
            onQueryStarted(ard, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Broker User',
                    success: 'Broker User was updated'
                });
            },
            invalidatesTags: [api_tags.brokerUsers]
        }),

        deleteBrokerUser: mutation<DeleteBrokerUserReply, DeleteBrokerUserRequest>({
            queryFn: createPrivateQueryFn(Client, 'deleteBrokerUser'),
            onQueryStarted(ard, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Broker User',
                    success: 'Broker User was deleted'
                });
            },
            invalidatesTags: [api_tags.brokerUsers]
        }),

        inviteBrokerUser: mutation<InviteBrokerUserReply, InviteBrokerUserRequest>({
            queryFn: createPrivateQueryFn(Client, 'inviteBrokerUser'),
            onQueryStarted(ard, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Inviting Broker User',
                    success: 'Broker User was invited'
                });
            },
            invalidatesTags: [api_tags.brokerUsers]
        }),

        requestFMCSABrokers: query<GetFMCSABrokersReply, GetFMCSABrokersRequest>({
            queryFn: createPrivateQueryFn(Client, 'getFMCSABrokers')
        }),
        getBrokers: query<BrokerGetReply, BrokerGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'brokerGet'),
            providesTags: [api_tags.brokers]
        }),
        retrieveBroker: query<BrokerRetrieveReply, BrokerRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'brokerRetrieve'),
            providesTags: [api_tags.broker]
        }),
        createBroker: mutation<BrokerCreateReply, BrokerCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'brokerCreate'),
            invalidatesTags: [api_tags.brokers],
            onQueryStarted(ard, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Broker',
                    success: 'Broker was created'
                });
            }
        }),
        updateBroker: mutation<BrokerUpdateReply, BrokerUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'brokerUpdate'),
            invalidatesTags: [api_tags.brokers, api_tags.broker],
            onQueryStarted(ard, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Broker',
                    success: 'Broker was updated'
                });
            }
        }),
        deleteBroker: mutation<BrokerDeleteReply, BrokerDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'brokerDelete'),
            invalidatesTags: [api_tags.brokers],
            onQueryStarted(ard, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Broker',
                    success: 'Broker was deleted'
                });
            }
        })
    })
});
