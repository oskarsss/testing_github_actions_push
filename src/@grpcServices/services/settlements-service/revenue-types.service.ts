import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import grpcTransport from '@/@grpcServices/grpcTransport';
import {
    RevenueTypeActivateReply,
    RevenueTypeActivateRequest,
    RevenueTypeCreateReply,
    RevenueTypeCreateRequest,
    RevenueTypeDeactivateReply,
    RevenueTypeDeactivateRequest,
    RevenueTypesGetReply,
    RevenueTypesGetRequest,
    RevenueTypeUpdateReply,
    RevenueTypeUpdateRequest,
    RevenueTypeItemCreateRequest,
    RevenueTypeItemCreateReply,
    RevenueTypeItemDeleteReply,
    RevenueTypeItemDeleteRequest,
    RevenueTypeItemUpdateReply,
    RevenueTypeItemUpdateRequest
} from '@proto/revenue_types';
import { handleRequest, invalidateTags, providesList } from '@/store/api';
import { RevenueTypesServiceClient } from '@proto/revenue_types.client';

const Client = new RevenueTypesServiceClient(grpcTransport);

const RevenueTypesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        addRevenueTypeItem: mutation<RevenueTypeItemCreateReply, RevenueTypeItemCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'revenueTypeItemCreate'),
            invalidatesTags: (result) =>
                invalidateTags(result, 'revenue_types', result?.itemId, 'revenue_type'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Creating Revenue Type',
                    success: 'Revenue Type was created'
                });
            }
        }),
        updateRevenueTypeItem: mutation<RevenueTypeItemUpdateReply, RevenueTypeItemUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'revenueTypeItemUpdate'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'revenue_types', arg?.itemId, 'revenue_type'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating Revenue Type Item',
                    success: 'Revenue Type Item was updated'
                });
            }
        }),
        deleteRevenueTypeItem: mutation<RevenueTypeItemDeleteReply, RevenueTypeItemDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'revenueTypeItemDelete'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'revenue_types', arg?.itemId, 'revenue_type'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Revenue Type Item',
                    success: 'Revenue Type Item was deleted'
                });
            }
        }),

        getRevenueTypes: query<RevenueTypesGetReply, RevenueTypesGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'revenueTypesGet'),
            providesTags: (result) =>
                providesList(result?.revenueTypes, 'revenue_types', 'revenueTypeId', 'revenue_type')
        }),
        createRevenueType: mutation<RevenueTypeCreateReply, RevenueTypeCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'revenueTypeCreate'),
            invalidatesTags: (result) => invalidateTags(result, 'revenue_types')
        }),

        updateRevenueType: mutation<RevenueTypeUpdateReply, RevenueTypeUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'revenueTypeUpdate'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'revenue_types', arg.revenueTypeId, 'revenue_type'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating Revenue Type',
                    success: 'Revenue Type was updated'
                });
            }
        }),
        activateRevenueType: mutation<RevenueTypeActivateReply, RevenueTypeActivateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'revenueTypeActivate'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'revenue_types', arg.revenueTypeId, 'revenue_type'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Activating Revenue Type',
                    success: 'Revenue Type was activated'
                });
            }
        }),
        deactivateRevenueType: mutation<RevenueTypeDeactivateReply, RevenueTypeDeactivateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'revenueTypeDeactivate'),
            invalidatesTags: (result, _, arg) =>
                invalidateTags(result, 'revenue_types', arg.revenueTypeId, 'revenue_type'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deactivating Revenue Type',
                    success: 'Revenue Type was deactivated'
                });
            }
        })
    })
});

export default RevenueTypesGrpcService;
