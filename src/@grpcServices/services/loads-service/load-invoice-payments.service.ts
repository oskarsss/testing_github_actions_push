import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    LoadInvoicePaymentItemAddReply,
    LoadInvoicePaymentItemAddRequest,
    LoadInvoicePaymentItemDeleteReply,
    LoadInvoicePaymentItemDeleteRequest,
    LoadInvoicePaymentItemUpdateReply,
    LoadInvoicePaymentItemUpdateRequest,
    LoadInvoicePaymentItemGetForLoadReply,
    LoadInvoicePaymentItemGetForLoadRequest
} from '@proto/load_invoice_payment_items';
import { LoadInvoicePaymentItemsServiceClient } from '@proto/load_invoice_payment_items.client';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';

const LoadInvoicePaymentClient = new LoadInvoicePaymentItemsServiceClient(grpcTransport);

const LoadInvoicePaymentsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getInvoicePaymentItems: query<
            LoadInvoicePaymentItemGetForLoadReply,
            LoadInvoicePaymentItemGetForLoadRequest
        >({
            queryFn: createPrivateQueryFn(
                LoadInvoicePaymentClient,
                'loadInvoicePaymentItemGetForLoad'
            ),
            providesTags: (result, _, arg) => [{ type: 'load_invoice_payments', id: arg.loadId }]
        }),

        addInvoicePaymentItem: mutation<
            LoadInvoicePaymentItemAddReply,
            LoadInvoicePaymentItemAddRequest
        >({
            queryFn        : createPrivateQueryFn(LoadInvoicePaymentClient, 'loadInvoicePaymentItemAdd'),
            invalidatesTags: (result, _, arg) => [
                { type: 'load_invoice_payments', id: arg.loadId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Invoice Payment Item',
                    success: 'Invoice Payment Item was added'
                });
            }
        }),
        updateInvoicePaymentItem: mutation<
            LoadInvoicePaymentItemUpdateReply,
            LoadInvoicePaymentItemUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(LoadInvoicePaymentClient, 'loadInvoicePaymentItemUpdate'),
            invalidatesTags: (result, _, arg) => [
                { type: 'load_invoice_payments', id: arg.loadId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating Invoice Payment Item',
                    success: 'Invoice Payment Item was updated'
                });
            }
        }),
        deleteInvoicePaymentItem: mutation<
            LoadInvoicePaymentItemDeleteReply,
            LoadInvoicePaymentItemDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(LoadInvoicePaymentClient, 'loadInvoicePaymentItemDelete'),
            invalidatesTags: (result, _, arg) => [
                { type: 'load_invoice_payments', id: arg.loadId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Invoice Payment Item',
                    success: 'Invoice Payment Item was deleted'
                });
            }
        })
    })
});

export default LoadInvoicePaymentsGrpcService;
