import {
    CustomerPortalCodeClearReply,
    CustomerPortalCodeClearRequest,
    CustomerPortalCodeSetReply,
    CustomerPortalCodeSetRequest,
    CustomerPortalCreateReply,
    CustomerPortalCreateRequest,
    CustomerPortalDeleteReply,
    CustomerPortalDeleteRequest,
    CustomerPortalDomainCreateReply,
    CustomerPortalDomainCreateRequest,
    CustomerPortalDomainDeleteReply,
    CustomerPortalDomainDeleteRequest,
    CustomerPortalDomainGetReply,
    CustomerPortalDomainGetRequest,
    CustomerPortalGetReply,
    CustomerPortalGetRequest,
    CustomerPortalUpdateReply,
    CustomerPortalUpdateRequest
} from '@proto/customer_portal';
import { CustomerPortalServiceClient } from '@proto/customer_portal.client';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new CustomerPortalServiceClient(grpcTransport);

const CustomerPortalGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        customerPortalCodeClear: mutation<
            CustomerPortalCodeClearReply,
            CustomerPortalCodeClearRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'customerPortalCodeClear'),
            invalidatesTags: ['customer_portal'],
            onQueryStarted : (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Code clearing...',
                    success       : 'Code cleared successfully'
                });
            }
        }),
        customerPortalCodeSet: mutation<CustomerPortalCodeSetReply, CustomerPortalCodeSetRequest>({
            queryFn        : createPrivateQueryFn(Client, 'customerPortalCodeSet'),
            invalidatesTags: ['customer_portal'],
            onQueryStarted : (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Code setting...',
                    success       : 'Code set successfully'
                });
            }
        }),
        customerPortalCreate: mutation<CustomerPortalCreateReply, CustomerPortalCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'customerPortalCreate'),
            invalidatesTags: ['customer_portal'],
            onQueryStarted : (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Creating customer portal...',
                    success       : 'Customer portal created successfully'
                });
            }
        }),
        customerPortalDelete: mutation<CustomerPortalDeleteReply, CustomerPortalDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'customerPortalDelete'),
            invalidatesTags: ['customer_portal'],
            onQueryStarted : (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Deleting customer portal...',
                    success       : 'Customer portal deleted successfully'
                });
            }
        }),
        customerPortalGet: query<CustomerPortalGetReply, CustomerPortalGetRequest>({
            queryFn: createPrivateQueryFn(Client, 'customerPortalGet')
        }),

        customerPortalUpdate: mutation<CustomerPortalUpdateReply, CustomerPortalUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'customerPortalUpdate'),
            invalidatesTags: ['customer_portal'],
            onQueryStarted : (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Updating customer portal...',
                    success       : 'Customer portal updated successfully'
                });
            }
        }),

        customerPortalDomainCreate: mutation<
            CustomerPortalDomainCreateReply,
            CustomerPortalDomainCreateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'customerPortalDomainCreate'),
            invalidatesTags: ['customer_portal_domains'],
            onQueryStarted : (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Creating domain...',
                    success       : 'Domain created successfully'
                });
            }
        }),
        customerPortalDomainDelete: mutation<
            CustomerPortalDomainDeleteReply,
            CustomerPortalDomainDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'customerPortalDomainDelete'),
            invalidatesTags: ['customer_portal_domains'],
            onQueryStarted : (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Deleting domain...',
                    success       : 'Domain deleted successfully'
                });
            }
        }),
        customerPortalDomainGet: query<
            CustomerPortalDomainGetReply,
            CustomerPortalDomainGetRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'customerPortalDomainGet'),
            providesTags: ['customer_portal_domains']
        })
    })
});

export default CustomerPortalGrpcService;
