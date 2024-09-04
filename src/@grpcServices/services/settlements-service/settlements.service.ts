import { SettlementsServiceClient } from '@proto/settlements.client';
import {
    BatchCreateSettlementsReply,
    BatchCreateSettlementsRequest,
    PeriodSyncReply,
    PeriodSyncRequest,
    RetrieveSettlementReply,
    RetrieveSettlementRequest,
    SendSettlementReply,
    SendSettlementRequest,
    SettlementAssignLoadReply,
    SettlementAssignLoadRequest,
    SettlementAssignTruckReply,
    SettlementAssignTruckRequest,
    SettlementAssignVendorReply,
    SettlementAssignVendorRequest,
    SettlementBatchUpdateStatusReply,
    SettlementBatchUpdateStatusRequest,
    SettlementDeleteReply,
    SettlementDeleteRequest,
    SettlementDriverPayDeductFuelUpdateReply,
    SettlementDriverPayDeductFuelUpdateRequest,
    SettlementDriverPayDeductTollsUpdateReply,
    SettlementDriverPayDeductTollsUpdateRequest,
    SettlementFuelDiscountsEnabledUpdateReply,
    SettlementFuelDiscountsEnabledUpdateRequest,
    SettlementGeneratePDFReply,
    SettlementGeneratePDFRequest,
    SettlementRemoveLoadReply,
    SettlementRemoveLoadRequest,
    SettlementSyncReply,
    SettlementSyncRequest,
    SettlementUnassignVendorReply,
    SettlementUnassignVendorRequest,
    SettlementUpdateStatusReply,
    SettlementUpdateStatusRequest,
    SettlementPayDateUpdateReply,
    SettlementPayDateUpdateRequest,
    SettlementBatchExportReply,
    SettlementBatchExportRequest,
    SettlementDeleteBatchReply,
    SettlementDeleteBatchRequest,
    SettlementSendBatchPreviewReply,
    SettlementSendBatchPreviewRequest,
    SettlementTollAssignReply,
    SettlementTollAssignRequest,
    SettlementTollUnassignReply,
    SettlementTollUnassignRequest,
    SettlementManifestAssignRequest,
    SettlementManifestAssignReply,
    SettlementManifestUnassignRequest,
    SettlementManifestUnassignReply,
    SettlementFuelTransactionAssignReply,
    SettlementFuelTransactionAssignRequest,
    SettlementFuelTransactionUnassignReply,
    SettlementFuelTransactionUnassignRequest,
    SettlementGetReply,
    SettlementGetRequest
} from '@proto/settlements';
import { api, handleRequest } from '@/store/api';
import { Dispatch } from 'redux';
import { invalidateSettlement } from '@/store/accounting/settlements/utils';
import grpcTransport from '../../grpcTransport';
import grpcAPI from '../../api';
import { createPrivateQueryFn } from '../../createQueryFn';

export const SettlementsService = new SettlementsServiceClient(grpcTransport);

// export const useSendSettlementStream = () => {

// };

const SettlementsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getSettlements: query<SettlementGetReply, SettlementGetRequest>({
            queryFn     : createPrivateQueryFn(SettlementsService, 'settlementGet'),
            providesTags: ['settlements']
        }),
        assignTollTransaction: mutation<SettlementTollAssignReply, SettlementTollAssignRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'tollAssign'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Assigning toll transaction',
                    success: 'Toll transaction was assigned'
                });
            }
        }),

        unasssignTollTransaction: mutation<
            SettlementTollUnassignReply,
            SettlementTollUnassignRequest
        >({
            queryFn        : createPrivateQueryFn(SettlementsService, 'tollUnassign'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unassigning toll transaction',
                    success: 'Toll transaction was unassigned'
                });
            }
        }),

        batchSendSettlementPreview: query<
            SettlementSendBatchPreviewReply,
            SettlementSendBatchPreviewRequest
        >({
            queryFn: createPrivateQueryFn(SettlementsService, 'settlementSendBatchPreview')
        }),

        batchExportSettlement: mutation<SettlementBatchExportReply, SettlementBatchExportRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'settlementBatchExport'),
            invalidatesTags: ['settlements'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Exporting settlements',
                    success: 'Settlements were exported'
                });
            }
        }),
        batchDeleteSettlement: mutation<SettlementDeleteBatchReply, SettlementDeleteBatchRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'settlementDeleteBatch'),
            invalidatesTags: ['settlements', 'settlement_periods'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting settlements',
                    success: 'Settlements were deleted'
                });
            }
        }),

        batchUpdateStatus: mutation<
            SettlementBatchUpdateStatusReply,
            SettlementBatchUpdateStatusRequest
        >({
            queryFn        : createPrivateQueryFn(SettlementsService, 'settlementBatchUpdateStatus'),
            invalidatesTags: ['settlements'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating settlement status',
                    success: 'Settlement status was updated'
                });
            }
        }),
        createSettlements: mutation<BatchCreateSettlementsReply, BatchCreateSettlementsRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'batchCreateSettlements'),
            invalidatesTags: ['settlements', 'settlement_periods'],
            onQueryStarted(arg, { queryFulfilled }) {
                const settlementsNumber = arg.settlements.length;
                handleRequest({
                    queryFulfilled,
                    loading: `Creating  ${settlementsNumber === 1 ? 'settlement' : 'settlements'}`,
                    success: `${settlementsNumber === 1 ? 'Settlement' : 'Settlements'} was create`
                });
            }
        }),
        assignTruckToSettlement: mutation<SettlementAssignTruckReply, SettlementAssignTruckRequest>(
            {
                queryFn        : createPrivateQueryFn(SettlementsService, 'assignTruck'),
                invalidatesTags: invalidateSettlement,
                onQueryStarted(arg, { queryFulfilled }) {
                    handleRequest({
                        queryFulfilled,
                        loading: 'Assigning truck to settlement',
                        success: 'Truck was assigned to settlement'
                    });
                }
            }
        ),
        updateDriverPayDeductFuel: mutation<
            SettlementDriverPayDeductFuelUpdateReply,
            SettlementDriverPayDeductFuelUpdateRequest
        >({
            queryFn: createPrivateQueryFn(
                SettlementsService,
                'settlementDriverPayDeductFuelUpdate'
            ),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating driver pay deduct fuel',
                    success: 'Driver pay deduct fuel was updated'
                });
            }
        }),
        updateDriverPayDeductTolls: mutation<
            SettlementDriverPayDeductTollsUpdateReply,
            SettlementDriverPayDeductTollsUpdateRequest
        >({
            queryFn: createPrivateQueryFn(
                SettlementsService,
                'settlementDriverPayDeductTollsUpdate'
            ),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating driver pay deduct tolls',
                    success: 'Driver pay deduct tolls was updated'
                });
            }
        }),
        downloadPDF: mutation<SettlementGeneratePDFReply, SettlementGeneratePDFRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'settlementGeneratePDF'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Generating PDF',
                    success: 'PDF was generated'
                });
            }
        }),
        downloadPDFWithoutToast: mutation<SettlementGeneratePDFReply, SettlementGeneratePDFRequest>(
            {
                queryFn        : createPrivateQueryFn(SettlementsService, 'settlementGeneratePDF'),
                invalidatesTags: invalidateSettlement
            }
        ),
        assignVendorToSettlement: mutation<
            SettlementAssignVendorReply,
            SettlementAssignVendorRequest
        >({
            queryFn        : createPrivateQueryFn(SettlementsService, 'assignVendor'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Assigning vendor to settlement',
                    success: 'Vendor was assigned to settlement'
                });
            }
        }),
        unassignVendorFromSettlement: mutation<
            SettlementUnassignVendorReply,
            SettlementUnassignVendorRequest
        >({
            queryFn        : createPrivateQueryFn(SettlementsService, 'unassignVendor'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unassigning vendor from settlement',
                    success: 'Vendor was unassigned from settlement'
                });
            }
        }),
        sendSettlement: mutation<SendSettlementReply, SendSettlementRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'sendSettlement'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Sending settlement',
                    success: 'Settlement was sent'
                });
            }
        }),
        syncSettlement: mutation<SettlementSyncReply, SettlementSyncRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'sync'),
            invalidatesTags: (result, _, arg) => [{ type: 'settlement', id: arg.settlementId }],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Syncing settlement',
                    success: 'Settlement was synced'
                });
            }
        }),
        syncSettlementTurnOffToast: query<SettlementSyncReply, SettlementSyncRequest>({
            queryFn     : createPrivateQueryFn(SettlementsService, 'sync'),
            providesTags: (result, _, arg) => [{ type: 'settlement_sync', id: arg.settlementId }],
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                await queryFulfilled;
                dispatch(
                    api.util.invalidateTags([
                        { type: 'settlement', id: arg.settlementId },
                        'settlements',
                        'settlement_periods'
                    ])
                );
            }
        }),
        syncPeriod: mutation<PeriodSyncReply, PeriodSyncRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'periodSync'),
            invalidatesTags: ['settlements', 'settlement_periods'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Syncing period',
                    success: 'Period was synced'
                });
            }
        }),
        retrieveSettlement: query<RetrieveSettlementReply, RetrieveSettlementRequest>({
            queryFn: createPrivateQueryFn(SettlementsService, 'retrieveSettlement'),
            providesTags(result, _, arg) {
                return [{ type: 'settlement', id: arg.settlementId }];
            }
        }),
        assignLoad: mutation<SettlementAssignLoadReply, SettlementAssignLoadRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'assignLoad'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Assigning load to settlement',
                    success: 'Load was assigned to settlement'
                });
            }
        }),
        unassignLoad: mutation<SettlementRemoveLoadReply, SettlementRemoveLoadRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'removeLoad'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unassigning load from settlement',
                    success: 'Load was unassigned from settlement'
                });
            }
        }),
        updateSettlementStatus: mutation<
            SettlementUpdateStatusReply,
            SettlementUpdateStatusRequest
        >({
            queryFn        : createPrivateQueryFn(SettlementsService, 'settlementUpdateStatus'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating settlement status',
                    success: 'Settlement status was updated'
                });
            }
        }),
        updateFuelDiscountsEnabled: mutation<
            SettlementFuelDiscountsEnabledUpdateReply,
            SettlementFuelDiscountsEnabledUpdateRequest
        >({
            queryFn: createPrivateQueryFn(
                SettlementsService,
                'settlementFuelDiscountsEnabledUpdate'
            ),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating fuel discounts enabled',
                    success: 'Fuel discounts enabled was updated'
                });
            }
        }),
        deleteSettlement: mutation<SettlementDeleteReply, SettlementDeleteRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'delete'),
            invalidatesTags: ['settlements', 'settlement_periods'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Settlement',
                    success: 'Settlement was deleted'
                });
            }
        }),
        updateSettlementPayDate: mutation<
            SettlementPayDateUpdateReply,
            SettlementPayDateUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(SettlementsService, 'settlementPayDateUpdate'),
            invalidatesTags: invalidateSettlement

            // onQueryStarted(arg, { queryFulfilled }) {
            //     handleRequest({
            //         queryFulfilled,
            //         loading: 'Updating settlement pay date',
            //         success: 'Settlement pay date was updated'
            //     });
            // }
        }),
        assignManifest: mutation<SettlementManifestAssignReply, SettlementManifestAssignRequest>({
            queryFn        : createPrivateQueryFn(SettlementsService, 'settlementManifestAssign'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Assigning manifest to settlement',
                    success: 'Manifest was assigned to settlement'
                });
            }
        }),
        unassignManifest: mutation<
            SettlementManifestUnassignReply,
            SettlementManifestUnassignRequest
        >({
            queryFn        : createPrivateQueryFn(SettlementsService, 'settlementManifestUnassign'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unassigning manifest from settlement',
                    success: 'Manifest was unassigned from settlement'
                });
            }
        }),
        unassignFuelTransaction: mutation<
            SettlementFuelTransactionUnassignReply,
            SettlementFuelTransactionUnassignRequest
        >({
            queryFn        : createPrivateQueryFn(SettlementsService, 'settlementFuelTransactionUnassign'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Unassigning fuel transaction from settlement',
                    success: 'Fuel transaction was unassigned from settlement'
                });
            }
        }),
        assignFuelTransaction: mutation<
            SettlementFuelTransactionAssignReply,
            SettlementFuelTransactionAssignRequest
        >({
            queryFn        : createPrivateQueryFn(SettlementsService, 'settlementFuelTransactionAssign'),
            invalidatesTags: invalidateSettlement,
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Assigning fuel transaction to settlement',
                    success: 'Fuel transaction was assigned to settlement'
                });
            }
        })
    })
});

// set thunk action creators
export const invalidateRetrieveSettlement = (settlementId: string) => (dispatch: Dispatch) => {
    dispatch(grpcAPI.util.invalidateTags([{ id: settlementId, type: 'settlement' }]));
};

export default SettlementsGrpcService;
