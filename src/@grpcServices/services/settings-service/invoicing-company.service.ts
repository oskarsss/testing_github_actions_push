import {
    InvoicingCompanyCreateReply,
    InvoicingCompanyCreateRequest,
    InvoicingCompanyDefaultSetReply,
    InvoicingCompanyDefaultSetRequest,
    InvoicingCompanyDeleteReply,
    InvoicingCompanyDeleteRequest,
    InvoicingCompanyGetReply,
    InvoicingCompanyGetRequest,
    InvoicingCompanyRestoreReply,
    InvoicingCompanyRestoreRequest,
    InvoicingCompanyRetrieveReply,
    InvoicingCompanyRetrieveRequest,
    InvoicingCompanyUpdateReply,
    InvoicingCompanyUpdateRequest
} from '@proto/invoicing_company';
import { InvoicingCompanyServiceClient } from '@proto/invoicing_company.client';
import { handleRequest, tagIdList } from '@/store/api';
import grpcTransport from '../../grpcTransport';
import grpcAPI from '../../api';
import { createPrivateQueryFn } from '../../createQueryFn';

const Client = new InvoicingCompanyServiceClient(grpcTransport);

const InvoicingCompanyGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getInvoicingCompanies: query<InvoicingCompanyGetReply, InvoicingCompanyGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'invoicingCompanyGet'),
            providesTags: [{ type: 'invoicing_company', id: tagIdList }]
        }),
        retrieveInvoicingCompany: query<
            InvoicingCompanyRetrieveReply,
            InvoicingCompanyRetrieveRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'invoicingCompanyRetrieve'),
            providesTags: (result) => [
                { type: 'invoicing_company', id: result?.invoicingCompany?.invoicingCompanyId }
            ]
        }),
        updateInvoicingCompany: mutation<
            InvoicingCompanyUpdateReply,
            InvoicingCompanyUpdateRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'invoicingCompanyUpdate'),

            invalidatesTags: (result, _, arg) => [
                { type: 'invoicing_company', id: arg.invoicingCompanyId },
                { type: 'invoicing_company', id: tagIdList }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Invoicing Company',
                    success: 'Invoicing Company was updated'
                });
            }
        }),
        createInvoicingCompany: mutation<
            InvoicingCompanyCreateReply,
            InvoicingCompanyCreateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'invoicingCompanyCreate'),
            invalidatesTags: [{ type: 'invoicing_company', id: tagIdList }],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Adding Invoicing Company',
                    success: 'Invoicing Company was added'
                });
            }
        }),
        deleteInvoicingCompany: mutation<
            InvoicingCompanyDeleteReply,
            InvoicingCompanyDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'invoicingCompanyDelete'),
            invalidatesTags: [{ type: 'invoicing_company', id: tagIdList }],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Invoicing Company',
                    success: 'Invoicing Company was deleted'
                });
            }
        }),
        restoreInvoicingCompany: mutation<
            InvoicingCompanyRestoreReply,
            InvoicingCompanyRestoreRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'invoicingCompanyRestore'),
            invalidatesTags: [{ type: 'invoicing_company', id: tagIdList }],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Restoring Invoicing Company',
                    success: 'Invoicing Company was restored'
                });
            }
        }),
        setDefaultInvoicingCompany: mutation<
            InvoicingCompanyDefaultSetReply,
            InvoicingCompanyDefaultSetRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'invoicingCompanyDefaultSet'),
            invalidatesTags: (result, _, arg) => [
                { type: 'invoicing_company', id: arg.invoicingCompanyId },
                { type: 'invoicing_company', id: tagIdList }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Setting Default Invoicing Company',
                    success: 'Default Invoicing Company was set'
                });
            }
        })
    })
});

export default InvoicingCompanyGrpcService;
