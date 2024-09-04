import { CustomersServiceClient } from '@proto/customers.client';
import grpcAPI from '@/@grpcServices/api';
import grpcTransport from '@/@grpcServices/grpcTransport';
import {
    CustomerGetReply,
    CustomerGetRequest,
    CustomerCreateReply,
    CustomerCreateRequest,
    CustomerUpdateReply,
    CustomerUpdateRequest,
    CustomerDeleteReply,
    CustomerDeleteRequest,
    CustomerRetrieveReply,
    CustomerRetrieveRequest,
    CreateCustomerUserReply,
    CreateCustomerUserRequest,
    DeleteCustomerUserReply,
    DeleteCustomerUserRequest,
    UpdateCustomerUserReply,
    UpdateCustomerUserRequest,
    GetCustomerUsersReply,
    GetCustomerUsersRequest,
    InviteCustomerUserReply,
    InviteCustomerUserRequest
} from '@proto/customers';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';
import api_tags from '@/store/api_tags';

const Client = new CustomersServiceClient(grpcTransport);

const CustomersGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getCustomerUsers: query<GetCustomerUsersReply, GetCustomerUsersRequest>({
            queryFn          : createPrivateQueryFn(Client, 'getCustomerUsers'),
            providesTags     : [api_tags.customerUsers],
            keepUnusedDataFor: 0
        }),

        createCustomerUser: mutation<CreateCustomerUserReply, CreateCustomerUserRequest>({
            queryFn        : createPrivateQueryFn(Client, 'createCustomerUser'),
            invalidatesTags: [api_tags.customerUsers],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Customer User',
                    success: 'Customer User was created'
                });
            }
        }),

        updateCustomerUser: mutation<UpdateCustomerUserReply, UpdateCustomerUserRequest>({
            queryFn        : createPrivateQueryFn(Client, 'updateCustomerUser'),
            invalidatesTags: [api_tags.customerUsers],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Customer User',
                    success: 'Customer User was updated'
                });
            }
        }),

        inviteCustomerUser: mutation<InviteCustomerUserReply, InviteCustomerUserRequest>({
            queryFn        : createPrivateQueryFn(Client, 'inviteCustomerUser'),
            invalidatesTags: [api_tags.customerUsers],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Inviting Customer User',
                    success: 'Customer User was invited'
                });
            }
        }),

        deleteCustomerUser: mutation<DeleteCustomerUserReply, DeleteCustomerUserRequest>({
            queryFn        : createPrivateQueryFn(Client, 'deleteCustomerUser'),
            invalidatesTags: [api_tags.customerUsers],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Customer User',
                    success: 'Customer User was deleted'
                });
            }
        }),

        getCustomers: query<CustomerGetReply, CustomerGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'customerGet'),
            providesTags: [api_tags.customers]
        }),
        retrieveCustomer: query<CustomerRetrieveReply, CustomerRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'customerRetrieve'),
            providesTags: [api_tags.customer]
        }),
        createCustomer: mutation<CustomerCreateReply, CustomerCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'customerCreate'),
            invalidatesTags: [api_tags.customers],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Customer',
                    success: 'Customer was created'
                });
            }
        }),
        updateCustomer: mutation<CustomerUpdateReply, CustomerUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'customerUpdate'),
            invalidatesTags: [api_tags.customers, api_tags.customer],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Customer',
                    success: 'Customer was updated'
                });
            }
        }),
        deleteCustomer: mutation<CustomerDeleteReply, CustomerDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'customerDelete'),
            invalidatesTags: [api_tags.customers],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Customer',
                    success: 'Customer was deleted'
                });
            }
        })
    })
});

export default CustomersGrpcService;
