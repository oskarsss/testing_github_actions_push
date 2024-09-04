import { ServiceProvidersServiceClient } from '@proto/service_providers.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import { handleRequest } from '@/store/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import API_TAGS from '@/store/api_tags';
import {
    ServiceProviderCreateReply,
    ServiceProviderCreateRequest,
    ServiceProviderDeleteReply,
    ServiceProviderDeleteRequest,
    ServiceProviderGetReply,
    ServiceProviderGetRequest,
    ServiceProviderRetrieveReply,
    ServiceProviderRetrieveRequest,
    ServiceProviderUpdateReply,
    ServiceProviderUpdateRequest
} from '@proto/service_providers';

const Client = new ServiceProvidersServiceClient(grpcTransport);

const ServiceProvidersGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getServiceProviders: query<ServiceProviderGetReply, ServiceProviderGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'serviceProviderGet'),
            providesTags: [API_TAGS.service_providers]
        }),
        retrieveServiceProvider: query<
            ServiceProviderRetrieveReply,
            ServiceProviderRetrieveRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'serviceProviderRetrieve'),
            providesTags: [API_TAGS.service_provider]
        }),
        createServiceProvider: mutation<ServiceProviderCreateReply, ServiceProviderCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'serviceProviderCreate'),
            invalidatesTags: [API_TAGS.service_providers],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Service Provider',
                    success: 'Service Provider was created'
                });
            }
        }),
        updateServiceProvider: mutation<ServiceProviderUpdateReply, ServiceProviderUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'serviceProviderUpdate'),
            invalidatesTags: [API_TAGS.service_providers, API_TAGS.service_provider],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Service Provider',
                    success: 'Service Provider was updated'
                });
            }
        }),
        deleteServiceProvider: mutation<ServiceProviderDeleteReply, ServiceProviderDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'serviceProviderDelete'),
            invalidatesTags: [API_TAGS.service_providers],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Service Provider',
                    success: 'Service Provider was deleted'
                });
            }
        })
    })
});

export default ServiceProvidersGrpcService;
