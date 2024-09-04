import {
    LoadDriverPayItemCategoryAddRequest,
    LoadDriverPayItemCategoryAddReply,
    LoadDriverPayItemCategoryDeleteRequest,
    LoadDriverPayItemCategoryDeleteReply,
    LoadDriverPayItemCategoryUpdateRequest,
    LoadDriverPayItemCategoryUpdateReply,
    LoadDriverPayItemCategoriesGetRequest,
    LoadDriverPayItemCategoriesGetReply,
    LoadDriverPayItemCategoryRestoreReply,
    LoadDriverPayItemCategoryRestoreRequest
} from '@proto/load_driver_pay_item_categories';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { LoadDriverPayItemCategoryServiceClient } from '@proto/load_driver_pay_item_categories.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import { handleRequest } from '@/store/api';

const Client = new LoadDriverPayItemCategoryServiceClient(grpcTransport);

const LoadDriverPayItemCategoriesGrpcService = grpcAPI.injectEndpoints({
    endpoints: (build) => ({
        getDriverPayItemCategories: build.query<
            LoadDriverPayItemCategoriesGetReply,
            LoadDriverPayItemCategoriesGetRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'loadDriverPayItemCategoriesGet'),
            providesTags: ['driver_pay_item_categories']
        }),
        addDriverPayCategory: build.mutation<
            LoadDriverPayItemCategoryAddReply,
            LoadDriverPayItemCategoryAddRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'loadDriverPayItemCategoryAdd'),
            invalidatesTags: ['driver_pay_item_categories'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Driver Pay Category',
                    success: 'Driver Pay Category was added'
                });
            }
        }),
        deleteDriverPayCategory: build.mutation<
            LoadDriverPayItemCategoryDeleteReply,
            LoadDriverPayItemCategoryDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'loadDriverPayItemCategoryDelete'),
            invalidatesTags: ['driver_pay_item_categories'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Driver Pay Category',
                    success: 'Driver Pay Category was deleted'
                });
            }
        }),
        updateDriverPayCategory: build.mutation<
            LoadDriverPayItemCategoryUpdateReply,
            LoadDriverPayItemCategoryUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'loadDriverPayItemCategoryUpdate'),
            invalidatesTags: ['driver_pay_item_categories'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating Driver Pay Category',
                    success: 'Driver Pay Category was updated'
                });
            }
        }),
        restoreDriverPayCategory: build.mutation<
            LoadDriverPayItemCategoryRestoreReply,
            LoadDriverPayItemCategoryRestoreRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'loadDriverPayItemCategoryRestore'),
            invalidatesTags: ['driver_pay_item_categories'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Restoring Driver Pay Category',
                    success: 'Driver Pay Category was restored'
                });
            }
        })
    })
});

export default LoadDriverPayItemCategoriesGrpcService;
