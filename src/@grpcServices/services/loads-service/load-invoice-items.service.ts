import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    LoadInvoiceItemAddRequest,
    LoadInvoiceItemAddReply,
    LoadInvoiceItemDeleteRequest,
    LoadInvoiceItemDeleteReply,
    LoadInvoiceItemUpdateRequest,
    LoadInvoiceItemUpdateReply,
    LoadInvoiceItemGetForLoadRequest,
    LoadInvoiceItemGetForLoadReply
} from '@proto/load_invoice_items';
import { LoadsInvoiceItemServiceClient } from '@proto/load_invoice_items.client';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';

const LoadInvoiceItemsClient = new LoadsInvoiceItemServiceClient(grpcTransport);

const LoadInvoiceItemsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getInvoiceItemsForLoad: query<
            LoadInvoiceItemGetForLoadReply,
            LoadInvoiceItemGetForLoadRequest
        >({
            queryFn     : createPrivateQueryFn(LoadInvoiceItemsClient, 'loadInvoiceItemGetForLoad'),
            providesTags: (res, _, arg) => [{ type: 'load_invoice_items', id: arg.loadId }]
        }),
        addInvoiceItem: mutation<LoadInvoiceItemAddReply, LoadInvoiceItemAddRequest>({
            queryFn        : createPrivateQueryFn(LoadInvoiceItemsClient, 'loadInvoiceItemAdd'),
            invalidatesTags: (res, _, arg) => [
                'manifests_drivers',
                { type: 'load_invoice_items', id: arg.loadId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Invoice Item',
                    success: 'Invoice Item was added'
                });
            }
        }),
        updateInvoiceItem: mutation<LoadInvoiceItemUpdateReply, LoadInvoiceItemUpdateRequest>({
            queryFn        : createPrivateQueryFn(LoadInvoiceItemsClient, 'loadInvoiceItemUpdate'),
            invalidatesTags: (res, _, arg) => [
                'manifests_drivers',
                { type: 'load_invoice_items', id: arg.loadId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating Invoice Item',
                    success: 'Invoice Item was updated'
                });
            }
        }),
        deleteInvoiceItem: mutation<LoadInvoiceItemDeleteReply, LoadInvoiceItemDeleteRequest>({
            queryFn        : createPrivateQueryFn(LoadInvoiceItemsClient, 'loadInvoiceItemDelete'),
            invalidatesTags: (res, _, arg) => [{ type: 'load_invoice_items', id: arg.loadId }],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Invoice Item',
                    success: 'Invoice Item was deleted'
                });
            }
        })
    })
});

export default LoadInvoiceItemsGrpcService;
