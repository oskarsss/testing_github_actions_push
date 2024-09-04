import {
    LoadInvoiceItemCategoriesGetReply,
    LoadInvoiceItemCategoriesGetRequest,
    LoadInvoiceItemCategoryAddReply,
    LoadInvoiceItemCategoryAddRequest,
    LoadInvoiceItemCategoryDeleteReply,
    LoadInvoiceItemCategoryDeleteRequest,
    LoadInvoiceItemCategoryUpdateReply,
    LoadInvoiceItemCategoryUpdateRequest,
    LoadInvoiceItemCategoryRestoreReply,
    LoadInvoiceItemCategoryRestoreRequest
} from '@proto/load_invoice_item_categories';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { LoadInvoiceItemCategoriesServiceClient } from '@proto/load_invoice_item_categories.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import { handleRequest } from '@/store/api';

const Client = new LoadInvoiceItemCategoriesServiceClient(grpcTransport);

const LoadInvoiceItemCategoriesGrpcService = grpcAPI.injectEndpoints({
    endpoints: (build) => ({
        getInvoiceItemCategories: build.query<
            LoadInvoiceItemCategoriesGetReply,
            LoadInvoiceItemCategoriesGetRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'loadInvoiceItemCategoriesGet'),
            providesTags: ['invoice_item_categories']
        }),
        addInvoiceItemCategory: build.mutation<
            LoadInvoiceItemCategoryAddReply,
            LoadInvoiceItemCategoryAddRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'loadInvoiceItemCategoryAdd'),
            invalidatesTags: ['invoice_item_categories'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Invoice Category',
                    success: 'Invoice Category was added'
                });
            }
        }),
        deleteInvoiceItemCategory: build.mutation<
            LoadInvoiceItemCategoryDeleteReply,
            LoadInvoiceItemCategoryDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'loadInvoiceItemCategoryDelete'),
            invalidatesTags: ['invoice_item_categories'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Invoice Category',
                    success: 'Invoice Category was deleted'
                });
            }
        }),
        updateInvoiceItemCategory: build.mutation<
            LoadInvoiceItemCategoryUpdateReply,
            LoadInvoiceItemCategoryUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'loadInvoiceItemCategoryUpdate'),
            invalidatesTags: ['invoice_item_categories'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating Invoice Category',
                    success: 'Invoice Category was updated'
                });
            }
        }),
        restoreInvoiceItemCategory: build.mutation<
            LoadInvoiceItemCategoryRestoreReply,
            LoadInvoiceItemCategoryRestoreRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'loadInvoiceItemCategoryRestore'),
            invalidatesTags: ['invoice_item_categories'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Restoring Invoice Category',
                    success: 'Invoice Category was restored'
                });
            }
        })
    })
});

export default LoadInvoiceItemCategoriesGrpcService;
