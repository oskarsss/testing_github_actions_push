import {
    IP_Quickbooks_GetItemsReply,
    IP_Quickbooks_GetItemsRequest,
    IP_Quickbooks_Item_UpdateLoadInvoiceItemCategoryReply,
    IP_Quickbooks_Item_UpdateLoadInvoiceItemCategoryRequest,
    IP_Quickbooks_Invoice_CreateReply,
    IP_Quickbooks_Invoice_CreateRequest,
    IP_Quickbooks_Invoice_GetReply,
    IP_Quickbooks_Invoice_GetRequest,
    IP_Quickbooks_Customer_UpdateSystemBrokerIDReply,
    IP_Quickbooks_Customer_UpdateSystemBrokerIDRequest,
    IP_Quickbooks_Customer_UpdateSystemCustomerIDReply,
    IP_Quickbooks_Customer_UpdateSystemCustomerIDRequest,
    IP_Quickbooks_GetCustomersReply,
    IP_Quickbooks_GetCustomersRequest,
    IP_Quickbooks_Invoice_DeleteReply,
    IP_Quickbooks_Invoice_DeleteRequest,
    IP_Quickbooks_Invoice_SendReply,
    IP_Quickbooks_Invoice_SendRequest,
    IP_Quickbooks_Invoice_SyncReply,
    IP_Quickbooks_Invoice_SyncRequest,
    IP_Quickbooks_Invoice_VoidReply,
    IP_Quickbooks_Invoice_VoidRequest,
    IP_Quickbooks_GetVendorsRequest,
    IP_Quickbooks_GetVendorsReply,
    IP_Quickbooks_Vendor_UpdateSystemDriverIDReply,
    IP_Quickbooks_Vendor_UpdateSystemDriverIDRequest,
    IP_Quickbooks_Vendor_UpdateSystemVendorIDReply,
    IP_Quickbooks_Vendor_UpdateSystemVendorIDRequest,
    IP_Quickbooks_Account_UpdateSettlementRevenueTypeReply,
    IP_Quickbooks_Account_UpdateSettlementRevenueTypeRequest,
    IP_Quickbooks_Account_UpdateSettlementTransactionCategoryReply,
    IP_Quickbooks_Account_UpdateSettlementTransactionCategoryRequest,
    IP_Quickbooks_GetAccountsReply,
    IP_Quickbooks_GetAccountsRequest,
    IP_Quickbooks_GetOauthURLWithoutCompanyReply,
    IP_Quickbooks_GetOauthURLWithoutCompanyRequest,
    IP_Quickbooks_SignUpReply,
    IP_Quickbooks_SignUpRequest,
    IP_Quickbooks_Account_UpdateBankAccountReply,
    IP_Quickbooks_Account_UpdateBankAccountRequest,
    IP_Quickbooks_Bill_CreateReply,
    IP_Quickbooks_Bill_CreateRequest,
    IP_Quickbooks_Bill_DeleteRequest,
    IP_Quickbooks_Bill_DeleteReply,
    IP_Quickbooks_Bill_GetReply,
    IP_Quickbooks_Bill_GetRequest,
    IP_Quickbooks_Bill_SyncReply,
    IP_Quickbooks_Bill_SyncRequest,
    IP_Quickbooks_BillPayment_CreateReply,
    IP_Quickbooks_BillPayment_CreateRequest,
    IP_Quickbooks_BillPayment_DeleteReply,
    IP_Quickbooks_BillPayment_DeleteRequest,
    IP_Quickbooks_BillPayment_GetReply,
    IP_Quickbooks_BillPayment_GetRequest,
    IP_Quickbooks_BillPayment_SyncReply,
    IP_Quickbooks_BillPayment_SyncRequest,
    IP_Quickbooks_BillPayment_VoidReply,
    IP_Quickbooks_BillPayment_VoidRequest,
    IP_Quickbooks_DisconnectByCodeReply,
    IP_Quickbooks_DisconnectByCodeRequest,
    IP_Quickbooks_GetDisconnectOAuthURLReply,
    IP_Quickbooks_GetDisconnectOAuthURLRequest,
    IP_Quickbooks_GetClassesReply,
    IP_Quickbooks_GetClassesRequest,
    IP_Quickbooks_Class_UpdateTruckReply,
    IP_Quickbooks_Class_UpdateTruckRequest
} from '@proto/integration_provider_quickbooks';
import { IntegrationProviderQuickbooksServiceClient } from '@proto/integration_provider_quickbooks.client';
import { PROVIDER_ID } from '@/views/settings/tabs/Integrations/constants';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const IntegrationsQuickbooksService = new IntegrationProviderQuickbooksServiceClient(grpcTransport);

const IntegrationQuickbooksGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        // === IntegrationQuickbooksItems ===
        getIntegrationQuickbooksItems: query<
            IP_Quickbooks_GetItemsReply,
            IP_Quickbooks_GetItemsRequest
        >({
            queryFn     : createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksGetItems'),
            providesTags: ['integration.quickbooks.items']
        }),
        updateQuickbooksItemInvoiceItemCategory: mutation<
            IP_Quickbooks_Item_UpdateLoadInvoiceItemCategoryReply,
            IP_Quickbooks_Item_UpdateLoadInvoiceItemCategoryRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksItemUpdateLoadInvoiceItemCategory'
            ),
            invalidatesTags: ['integration.quickbooks.items']
        }),

        // === IntegrationQuickbooksInvoice ===
        getInvoiceQuickbooks: query<
            IP_Quickbooks_Invoice_GetReply,
            IP_Quickbooks_Invoice_GetRequest
        >({
            queryFn     : createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksInvoiceGet'),
            providesTags: ['integration.quickbooks.invoice']
        }),
        createInvoiceQuickbooks: mutation<
            IP_Quickbooks_Invoice_CreateReply,
            IP_Quickbooks_Invoice_CreateRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksInvoiceCreate'
            ),
            invalidatesTags: ['integration.quickbooks.invoice'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Creating QuickBooks invoice...',
                    success       : 'QuickBooks invoice created'
                });
            }
        }),
        voidInvoiceQuickbooks: mutation<
            IP_Quickbooks_Invoice_VoidReply,
            IP_Quickbooks_Invoice_VoidRequest
        >({
            queryFn        : createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksInvoiceVoid'),
            invalidatesTags: ['integration.quickbooks.invoice'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Voiding QuickBooks invoice...',
                    success       : 'QuickBooks invoice voided'
                });
            }
        }),
        deleteInvoiceQuickbooks: mutation<
            IP_Quickbooks_Invoice_DeleteReply,
            IP_Quickbooks_Invoice_DeleteRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksInvoiceDelete'
            ),
            invalidatesTags: ['integration.quickbooks.invoice'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Deleting QuickBooks invoice...',
                    success       : 'QuickBooks invoice deleted'
                });
            }
        }),
        sendInvoiceQuickbooks: mutation<
            IP_Quickbooks_Invoice_SendReply,
            IP_Quickbooks_Invoice_SendRequest
        >({
            queryFn        : createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksInvoiceSend'),
            invalidatesTags: ['integration.quickbooks.invoice'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Sending QuickBooks invoice...',
                    success       : 'QuickBooks invoice sent'
                });
            }
        }),

        syncInvoiceQuickbooks: mutation<
            IP_Quickbooks_Invoice_SyncReply,
            IP_Quickbooks_Invoice_SyncRequest
        >({
            queryFn        : createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksInvoiceSync'),
            invalidatesTags: ['integration.quickbooks.invoice'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Syncing QuickBooks invoice...',
                    success       : 'QuickBooks invoice synced'
                });
            }
        }),

        // === CustomersQuickbooks ===
        getCustomersQuickbooks: query<
            IP_Quickbooks_GetCustomersReply,
            IP_Quickbooks_GetCustomersRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksGetCustomers'
            ),
            providesTags: ['integration.quickbooks.customers']
        }),

        updateSystemCustomerIDQuickbooks: mutation<
            IP_Quickbooks_Customer_UpdateSystemCustomerIDReply,
            IP_Quickbooks_Customer_UpdateSystemCustomerIDRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksCustomerUpdateSystemCustomerID'
            ),
            invalidatesTags: ['integration.quickbooks.customers']
        }),

        updateSystemBrokerIDQuickbooks: mutation<
            IP_Quickbooks_Customer_UpdateSystemBrokerIDReply,
            IP_Quickbooks_Customer_UpdateSystemBrokerIDRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksCustomerUpdateSystemBrokerID'
            ),
            invalidatesTags: ['integration.quickbooks.customers']
        }),

        // === VendorsQuickbooks ===
        getVendorsQuickbooks: query<IP_Quickbooks_GetVendorsReply, IP_Quickbooks_GetVendorsRequest>(
            {
                queryFn: createPrivateQueryFn(
                    IntegrationsQuickbooksService,
                    'iPQuickbooksGetVendors'
                ),
                providesTags: ['integration.quickbooks.vendors']
            }
        ),
        updateSystemVendorIDQuickbooks: mutation<
            IP_Quickbooks_Vendor_UpdateSystemVendorIDReply,
            IP_Quickbooks_Vendor_UpdateSystemVendorIDRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksVendorUpdateSystemVendorID'
            ),
            invalidatesTags: ['integration.quickbooks.vendors']
        }),
        updateSystemDriverIDQuickbooks: mutation<
            IP_Quickbooks_Vendor_UpdateSystemDriverIDReply,
            IP_Quickbooks_Vendor_UpdateSystemDriverIDRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksVendorUpdateSystemDriverID'
            ),
            invalidatesTags: ['integration.quickbooks.vendors']
        }),

        updateAccountSettlementTransactionCategoryQuickbooks: mutation<
            IP_Quickbooks_Account_UpdateSettlementTransactionCategoryReply,
            IP_Quickbooks_Account_UpdateSettlementTransactionCategoryRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksAccountUpdateSettlementTransactionCategory'
            ),
            invalidatesTags: ['integration.quickbooks.accounts']
        }),
        updateAccountSettlementRevenueTypeQuickbooks: mutation<
            IP_Quickbooks_Account_UpdateSettlementRevenueTypeReply,
            IP_Quickbooks_Account_UpdateSettlementRevenueTypeRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksAccountUpdateSettlementRevenueType'
            ),
            invalidatesTags: ['integration.quickbooks.accounts']
        }),
        getAccountsQuickbooks: query<
            IP_Quickbooks_GetAccountsReply,
            IP_Quickbooks_GetAccountsRequest
        >({
            queryFn     : createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksGetAccounts'),
            providesTags: ['integration.quickbooks.accounts']
        }),
        getOauthURLWithoutCompanyQuickbooks: mutation<
            IP_Quickbooks_GetOauthURLWithoutCompanyReply,
            IP_Quickbooks_GetOauthURLWithoutCompanyRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksGetOauthURLWithoutCompany'
            )
        }),
        signUpQuickbooks: mutation<IP_Quickbooks_SignUpReply, IP_Quickbooks_SignUpRequest>({
            queryFn: createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksSignUp')
        }),
        quickbooksDisconnectByCode: mutation<
            IP_Quickbooks_DisconnectByCodeReply,
            IP_Quickbooks_DisconnectByCodeRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksDisconnectByCode'
            ),
            invalidatesTags: ['integrations', { type: 'integration', id: PROVIDER_ID.QUICKBOOKS }]
        }),
        quickbooksGetDisconnectOAuthURL: mutation<
            IP_Quickbooks_GetDisconnectOAuthURLReply,
            IP_Quickbooks_GetDisconnectOAuthURLRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksGetDisconnectOAuthURL'
            ),
            invalidatesTags: ['integrations', { type: 'integration', id: PROVIDER_ID.QUICKBOOKS }]
        }),
        updateBankAccountQuickbooks: mutation<
            IP_Quickbooks_Account_UpdateBankAccountReply,
            IP_Quickbooks_Account_UpdateBankAccountRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksAccountUpdateBankAccount'
            ),
            invalidatesTags: ['integration.quickbooks.accounts'] // TODO: check if this is correct
        }),

        // === BillsQuickbooks ===
        getBillQuickbooks: query<IP_Quickbooks_Bill_GetReply, IP_Quickbooks_Bill_GetRequest>({
            queryFn     : createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksBillGet'),
            providesTags: ['integration.quickbooks.bill']
        }),
        createBillQuickbooks: mutation<
            IP_Quickbooks_Bill_CreateReply,
            IP_Quickbooks_Bill_CreateRequest
        >({
            queryFn        : createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksBillCreate'),
            invalidatesTags: ['integration.quickbooks.bill'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Creating QuickBooks bill...',
                    success       : 'QuickBooks bill created'
                });
            }
        }),
        deleteBillQuickbooks: mutation<
            IP_Quickbooks_Bill_DeleteReply,
            IP_Quickbooks_Bill_DeleteRequest
        >({
            queryFn        : createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksBillDelete'),
            invalidatesTags: ['integration.quickbooks.bill'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Deleting QuickBooks bill...',
                    success       : 'QuickBooks bill deleted'
                });
            }
        }),
        syncBillQuickbooks: mutation<IP_Quickbooks_Bill_SyncReply, IP_Quickbooks_Bill_SyncRequest>({
            queryFn        : createPrivateQueryFn(IntegrationsQuickbooksService, 'iPQuickbooksBillSync'),
            invalidatesTags: ['integration.quickbooks.bill'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Syncing QuickBooks bill...',
                    success       : 'QuickBooks bill synced'
                });
            }
        }),

        // === BillPaymentsQuickbooks ===
        getBillPaymentQuickbooks: query<
            IP_Quickbooks_BillPayment_GetReply,
            IP_Quickbooks_BillPayment_GetRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksBillPaymentGet'
            ),
            providesTags: ['integration.quickbooks.bill.payment']
        }),
        createBillPaymentQuickbooks: mutation<
            IP_Quickbooks_BillPayment_CreateReply,
            IP_Quickbooks_BillPayment_CreateRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksBillPaymentCreate'
            ),
            invalidatesTags: ['integration.quickbooks.bill.payment', 'integration.quickbooks.bill'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Creating QuickBooks bill payment...',
                    success       : 'QuickBooks bill payment created'
                });
            }
        }),
        deleteBillPaymentQuickbooks: mutation<
            IP_Quickbooks_BillPayment_DeleteReply,
            IP_Quickbooks_BillPayment_DeleteRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksBillPaymentDelete'
            ),
            invalidatesTags: ['integration.quickbooks.bill.payment', 'integration.quickbooks.bill'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Deleting QuickBooks bill payment...',
                    success       : 'QuickBooks bill payment deleted'
                });
            }
        }),
        syncBillPaymentQuickbooks: mutation<
            IP_Quickbooks_BillPayment_SyncReply,
            IP_Quickbooks_BillPayment_SyncRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksBillPaymentSync'
            ),
            invalidatesTags: ['integration.quickbooks.bill.payment', 'integration.quickbooks.bill'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Syncing QuickBooks bill payment...',
                    success       : 'QuickBooks bill payment synced'
                });
            }
        }),
        voidBillPaymentQuickbooks: mutation<
            IP_Quickbooks_BillPayment_VoidReply,
            IP_Quickbooks_BillPayment_VoidRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksBillPaymentVoid'
            ),
            invalidatesTags: ['integration.quickbooks.bill.payment', 'integration.quickbooks.bill'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Voiding QuickBooks bill payment...',
                    success       : 'QuickBooks bill payment voided'
                });
            }
        }),
        getClassesQuickbooks: query<IP_Quickbooks_GetClassesReply, IP_Quickbooks_GetClassesRequest>(
            {
                queryFn: createPrivateQueryFn(
                    IntegrationsQuickbooksService,
                    'iPQuickbooksGetClasses'
                ),
                providesTags: ['integration.quickbooks.classes']
            }
        ),
        updateTruckClassQuickbooks: mutation<
            IP_Quickbooks_Class_UpdateTruckReply,
            IP_Quickbooks_Class_UpdateTruckRequest
        >({
            queryFn: createPrivateQueryFn(
                IntegrationsQuickbooksService,
                'iPQuickbooksClassUpdateTruck'
            ),
            invalidatesTags: ['integration.quickbooks.classes']
        })
    })
});

export default IntegrationQuickbooksGrpcService;
