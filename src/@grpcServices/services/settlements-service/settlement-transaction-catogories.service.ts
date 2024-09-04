import { SettlementTransactionCategoriesServiceClient } from '@proto/settlements.transaction_category.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    SettlementTransactionCategoryGetReply,
    SettlementTransactionCategoryGetRequest,
    SettlementTransactionCategoryRetrieveRequest,
    SettlementTransactionCategoryRetrieveReply,
    SettlementTransactionCategoryCreateReply,
    SettlementTransactionCategoryCreateRequest,
    SettlementTransactionCategoryUpdateReply,
    SettlementTransactionCategoryUpdateRequest,
    SettlementTransactionCategoryDeleteReply,
    SettlementTransactionCategoryDeleteRequest,
    SettlementTransactionCategoryRestoreReply,
    SettlementTransactionCategoryRestoreRequest
} from '@proto/settlements.transaction_category';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest, tagIdList } from '@/store/api';

const Client = new SettlementTransactionCategoriesServiceClient(grpcTransport);

const SettlementTransactionCategoriesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getCategories: query<
            SettlementTransactionCategoryGetReply,
            SettlementTransactionCategoryGetRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'settlementTransactionCategoryGet'),
            providesTags: [{ type: 'recurring_transaction_categories', id: tagIdList }]
        }),
        retrieveCategory: query<
            SettlementTransactionCategoryRetrieveReply,
            SettlementTransactionCategoryRetrieveRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'settlementTransactionCategoryRetrieve'),
            providesTags: (res, _, arg) => [
                { type: 'recurring_transaction_category', id: arg.settlementTransactionCategoryId }
            ]
        }),
        createCategory: mutation<
            SettlementTransactionCategoryCreateReply,
            SettlementTransactionCategoryCreateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementTransactionCategoryCreate'),
            invalidatesTags: [{ type: 'recurring_transaction_categories', id: 'LIST' }],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Creating Category',
                    success       : 'Category was created'
                });
            }
        }),
        updateCategory: mutation<
            SettlementTransactionCategoryUpdateReply,
            SettlementTransactionCategoryUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementTransactionCategoryUpdate'),
            invalidatesTags: (result, _, { settlementTransactionCategoryId }) => [
                { type: 'recurring_transaction_categories', id: 'LIST' },
                { type: 'recurring_transaction_category', id: settlementTransactionCategoryId }
            ],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Category',
                    success: 'Category was updated'
                });
            }
        }),
        deleteCategory: mutation<
            SettlementTransactionCategoryDeleteReply,
            SettlementTransactionCategoryDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementTransactionCategoryDelete'),
            invalidatesTags: [{ type: 'recurring_transaction_categories', id: 'LIST' }],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Category',
                    success: 'Category was deleted'
                });
            }
        }),
        restoreSettlementTransactionCategory: mutation<
            SettlementTransactionCategoryRestoreReply,
            SettlementTransactionCategoryRestoreRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'settlementTransactionCategoryRestore'),
            invalidatesTags: [{ type: 'recurring_transaction_categories', id: 'LIST' }],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Restoring Category',
                    success: 'Category was restored'
                });
            }
        })
    })
});

export default SettlementTransactionCategoriesGrpcService;
