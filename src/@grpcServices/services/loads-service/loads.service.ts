import { LoadsServiceClient } from '@proto/loads.client';
import {
    OrderInvoicingCompanyUpdateReply,
    OrderInvoicingCompanyUpdateRequest,
    GetLoadEtaStatesRequest,
    GetLoadEtaStatesReply,
    RetrieveLoadReply,
    RetrieveLoadRequest,
    LoadClientReferenceIDCheckDuplicateReply,
    LoadClientReferenceIDCheckDuplicateRequest,
    LoadClientReferenceIDUpdateReply,
    LoadClientReferenceIDUpdateRequest,
    LoadUpdateEmptyMilesReply,
    LoadUpdateEmptyMilesRequest,
    LoadUpdateLoadedMilesReply,
    LoadUpdateLoadedMilesRequest,
    LoadStatusUpdateRequest,
    LoadStatusUpdateReply,
    LoadInvoicePaperworkVerifiedUpdateReply,
    LoadInvoicePaperworkVerifiedUpdateRequest,
    LoadInvoiceStatusUpdateReply,
    LoadInvoiceStatusUpdateRequest,
    LoadUpdateReply,
    LoadUpdateRequest,
    LoadInvoiceDownloadReply,
    LoadInvoiceDownloadRequest,
    LoadDispatcherUpdateReply,
    LoadDispatcherUpdateRequest,
    LoadInvoiceFactoringCompanyUpdateReply,
    LoadInvoiceFactoringCompanyUpdateRequest,
    LoadTemperatureUpdateReply,
    LoadTemperatureUpdateRequest,
    LoadDeleteReply,
    LoadDeleteRequest,
    LoadClientUpdateReply,
    LoadClientUpdateRequest,
    LoadTruckRouteRetrieveReply,
    LoadTruckRouteRetrieveRequest,
    LoadStatsGetReply,
    LoadStatsGetRequest,
    OrderBrokerUserAssignReply,
    OrderBrokerUserAssignRequest,
    OrderBrokerUserRemoveReply,
    OrderBrokerUserRemoveRequest,
    OrderCustomerUserAssignReply,
    OrderCustomerUserAssignRequest,
    OrderCustomerUserRemoveReply,
    OrderCustomerUserRemoveRequest,
    OrderInvoiceSendReply,
    OrderInvoiceSendRequest,
    OrderUnarchivedGetReply,
    OrderUnarchivedGetRequest,
    OrderClientGetReply,
    OrderClientGetRequest,
    LoadData_Load,
    LoadInvoiceBatchDownloadReply,
    LoadInvoiceBatchDownloadRequest,
    LoadInvoiceStatusBatchUpdateReply,
    LoadInvoiceStatusBatchUpdateRequest,
    OrderInvoiceBatchSendReply,
    OrderInvoiceBatchSendRequest
} from '@proto/loads';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';
import { LoadModel, LoadModel_Status } from '@proto/models/model_load';
import { ref } from 'yup';
import { UpdateOrderDataCacheThunk } from '../../../store/storage/orders/actions/cache';

export const LoadsClient = new LoadsServiceClient(grpcTransport);

const LoadsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        // ---- QUERIES ----
        getLoadStats: query<LoadStatsGetReply, LoadStatsGetRequest>({
            queryFn          : createPrivateQueryFn(LoadsClient, 'loadStatsGet'),
            providesTags     : ['loads'],
            keepUnusedDataFor: 0
        }),
        getLoadTruckRoute: query<LoadTruckRouteRetrieveReply, LoadTruckRouteRetrieveRequest>({
            queryFn          : createPrivateQueryFn(LoadsClient, 'loadTruckRouteRetrieve'),
            providesTags     : ['load_truck_route'],
            keepUnusedDataFor: 0
        }),
        getLoadEtaStates: query<GetLoadEtaStatesReply, GetLoadEtaStatesRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'getLoadEtaStates')
        }),

        getLoad: query<RetrieveLoadReply, RetrieveLoadRequest>({
            queryFn          : createPrivateQueryFn(LoadsClient, 'retrieveLoad'),
            providesTags     : (result, _, arg) => [{ type: 'load', id: arg.loadId }],
            keepUnusedDataFor: 0
        }),

        sendOrderInvoice: mutation<OrderInvoiceSendReply, OrderInvoiceSendRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'orderInvoiceSend'),
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Sending Invoice',
                    success       : 'Invoice was sent'
                });
            }
        }),

        clientCheckDuplicateRefId: mutation<
            LoadClientReferenceIDCheckDuplicateReply,
            LoadClientReferenceIDCheckDuplicateRequest
        >({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadClientReferenceIDCheckDuplicate')
        }),

        // ---- MUTATIONS WITH CACHE UPDATES ----

        // +need to cache update
        updateLoadClient: mutation<LoadClientUpdateReply, LoadClientUpdateRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadClientUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.loadId,
                            updateData: arg
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        batchDownloadInvoice: mutation<
            LoadInvoiceBatchDownloadReply,
            LoadInvoiceBatchDownloadRequest
        >({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadInvoiceBatchDownload'),
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Downloading Invoices',
                    success       : 'Invoices were downloaded'
                });
            }
        }),

        batchUpdateInvoiceStatus: mutation<
            LoadInvoiceStatusBatchUpdateReply,
            LoadInvoiceStatusBatchUpdateRequest
        >({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadInvoiceStatusBatchUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                const { loadIds } = arg;
                const updateData: Partial<LoadData_Load> = {
                    invoiceStatus: arg.newInvoiceStatus
                };
                loadIds.forEach((loadId) => {
                    dispatch(
                        UpdateOrderDataCacheThunk(
                            {
                                loadId,
                                updateData
                            },
                            queryFulfilled
                        )
                    );
                });
            }
        }),

        batchSendInvoice: mutation<OrderInvoiceBatchSendReply, OrderInvoiceBatchSendRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'orderInvoiceBatchSend'),
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Sending Invoices',
                    success       : 'Invoices were sent'
                });
            }
        }),

        // +need to cache update
        updateLoadRefId: mutation<
            LoadClientReferenceIDUpdateReply,
            LoadClientReferenceIDUpdateRequest
        >({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadClientReferenceIDUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                const data: Partial<LoadData_Load> = {
                    referenceId: arg.newClientReferenceId
                };
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.loadId,
                            updateData: data
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        // +need to cache update
        updateEmptyMiles: mutation<LoadUpdateEmptyMilesReply, LoadUpdateEmptyMilesRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'updateEmptyMiles'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.loadId,
                            updateData: arg
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        // +need to cache update
        updateLoadedMiles: mutation<LoadUpdateLoadedMilesReply, LoadUpdateLoadedMilesRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'updateLoadedMiles'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.loadId,
                            updateData: arg
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        // +need to cache update
        updateLoadStatus: mutation<LoadStatusUpdateReply, LoadStatusUpdateRequest>({
            queryFn        : createPrivateQueryFn(LoadsClient, 'loadStatusUpdate'),
            invalidatesTags: ['loads'],
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                const updateData: Partial<LoadData_Load> = {
                    status: arg.newStatus
                };

                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId: arg.loadId,
                            updateData
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        // +need to cache update
        updateInvoicePaperworkVerified: mutation<
            LoadInvoicePaperworkVerifiedUpdateReply,
            LoadInvoicePaperworkVerifiedUpdateRequest
        >({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadInvoicePaperworkVerifiedUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.loadId,
                            updateData: arg
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        // +need to cache update
        updateInvoiceStatus: mutation<LoadInvoiceStatusUpdateReply, LoadInvoiceStatusUpdateRequest>(
            {
                queryFn        : createPrivateQueryFn(LoadsClient, 'loadInvoiceStatusUpdate'),
                invalidatesTags: ['loads'],
                onQueryStarted(arg, {
                    dispatch,
                    queryFulfilled
                }) {
                    const updateData: Partial<LoadData_Load> = {
                        invoiceStatus: arg.newInvoiceStatus
                    };

                    dispatch(
                        UpdateOrderDataCacheThunk(
                            {
                                loadId: arg.loadId,
                                updateData
                            },
                            queryFulfilled
                        )
                    );
                }
            }
        ),

        // +need to cache update
        updateLoad: mutation<LoadUpdateReply, LoadUpdateRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.loadId,
                            updateData: arg
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        downloadLoadInvoice: mutation<LoadInvoiceDownloadReply, LoadInvoiceDownloadRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadInvoiceDownload'),
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Downloading Invoice',
                    success       : 'Invoice was downloaded'
                });
            }
        }),

        // +need to cache update
        updateLoadDispatcher: mutation<LoadDispatcherUpdateReply, LoadDispatcherUpdateRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadDispatcherUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.loadId,
                            updateData: arg
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        // +need to cache update
        updateLoadInvoiceFactoringCompany: mutation<
            LoadInvoiceFactoringCompanyUpdateReply,
            LoadInvoiceFactoringCompanyUpdateRequest
        >({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadInvoiceFactoringCompanyUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.loadId,
                            updateData: arg
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        // +need to cache update
        updateLoadTemperature: mutation<LoadTemperatureUpdateReply, LoadTemperatureUpdateRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadTemperatureUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.loadId,
                            updateData: arg
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        // +need to cache update
        deleteLoad: mutation<LoadDeleteReply, LoadDeleteRequest>({
            queryFn: createPrivateQueryFn(LoadsClient, 'loadDelete'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.loadId,
                            updateData: {
                                status: LoadModel_Status.deleted
                            }
                        },
                        queryFulfilled
                    )
                );
            }
        }),

        getUsersAssignedToOrder: query<OrderClientGetReply, OrderClientGetRequest>({
            queryFn     : createPrivateQueryFn(LoadsClient, 'orderClientGet'),
            providesTags: (res, _, arg) => [{ type: 'order_users', id: arg.loadId }]
        }),
        assignBrokerUserToOrder: mutation<OrderBrokerUserAssignReply, OrderBrokerUserAssignRequest>(
            {
                queryFn        : createPrivateQueryFn(LoadsClient, 'orderBrokerUserAssign'),
                invalidatesTags: (result, _, arg) => [{ type: 'order_users', id: arg.loadId }]
            }
        ),
        removeBrokerUserFromOrder: mutation<
            OrderBrokerUserRemoveReply,
            OrderBrokerUserRemoveRequest
        >({
            queryFn        : createPrivateQueryFn(LoadsClient, 'orderBrokerUserRemove'),
            invalidatesTags: (result, _, arg) => [{ type: 'order_users', id: arg.loadId }]
        }),
        assignCustomerUserToOrder: mutation<
            OrderCustomerUserAssignReply,
            OrderCustomerUserAssignRequest
        >({
            queryFn        : createPrivateQueryFn(LoadsClient, 'orderCustomerUserAssign'),
            invalidatesTags: (result, _, arg) => [{ type: 'order_users', id: arg.loadId }]
        }),
        removeCustomerUserFromOrder: mutation<
            OrderCustomerUserRemoveReply,
            OrderCustomerUserRemoveRequest
        >({
            queryFn        : createPrivateQueryFn(LoadsClient, 'orderCustomerUserRemove'),
            invalidatesTags: (result, _, arg) => [{ type: 'order_users', id: arg.loadId }]
        }),
        updateOrderInvoicingCompany: mutation<
            OrderInvoicingCompanyUpdateReply,
            OrderInvoicingCompanyUpdateRequest
        >({
            queryFn: createPrivateQueryFn(LoadsClient, 'orderInvoicingCompanyUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateOrderDataCacheThunk(
                        {
                            loadId    : arg.orderId,
                            updateData: arg
                        },
                        queryFulfilled
                    )
                );
            }
        })
    })
});

export default LoadsGrpcService;
