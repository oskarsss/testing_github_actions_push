import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import grpcTransport from '@/@grpcServices/grpcTransport';
import { handleRequest } from '@/store/api';
import {
    RemoveStopFromManifestCache,
    UpdateCacheManifestStops
} from '@/store/dispatch/manifests/actions/cashe';
import {
    ManifestStopAddReply,
    ManifestStopAddRequest,
    ManifestStopRemoveReply,
    ManifestStopRemoveRequest,
    ManifestStopSequenceUpdateRequest,
    ManifestStopSequenceUpdateReply,
    ManifestStopUpdateReply,
    ManifestStopUpdateRequest,
    ManifestStopStatusUpdateReply,
    ManifestStopStatusUpdateRequest,
    ManifestStopTakeoutReply,
    ManifestStopTakeoutRequest,
    ManifestStopTakeoutSeparateReply,
    ManifestStopTakeoutSeparateRequest
} from '@proto/manifest_stops';
import { ManifestStopsServiceClient } from '@proto/manifest_stops.client';
import { CountryCode } from '@proto/models/country_code';
import {
    RemoveStopFromLoadsCache,
    UpdateOrderStopsDataCache
} from '../../../store/storage/orders/actions/cache';

const Client = new ManifestStopsServiceClient(grpcTransport);

const ManifestStopsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        takeoutStopsSeparate: mutation<
            ManifestStopTakeoutSeparateReply,
            ManifestStopTakeoutSeparateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'manifestStopTakeOutSeparate'),
            invalidatesTags: (res, _, arg) => [
                { type: 'manifest', id: arg.fromManifestId },
                'manifests',
                'manifest_truck_route'
            ],
            onQueryStarted: async (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Taking out Stops',
                    success       : 'Stops were taken out'
                });
            }
        }),
        takeoutStops: mutation<ManifestStopTakeoutReply, ManifestStopTakeoutRequest>({
            queryFn        : createPrivateQueryFn(Client, 'manifestStopTakeOut'),
            invalidatesTags: (res, _, arg) => [
                { type: 'manifest', id: arg.toManifestId },
                'manifests',
                'manifest_truck_route'
            ],
            onQueryStarted: async (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Taking out Stops',
                    success       : 'Stops were taken out'
                });
            }
        }),
        updateManifestStopStatus: mutation<
            ManifestStopStatusUpdateReply,
            ManifestStopStatusUpdateRequest & { loadId: string }
        >({
            queryFn        : createPrivateQueryFn(Client, 'manifestStopStatusUpdate'),
            invalidatesTags: (res, _, arg) => ['manifest_truck_route'],
            onQueryStarted : async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                // TODO: REMOVE ONEOFKIND PLZ!!!!!!!!!!!
                const stopId =
                    arg.stopStatusUpdates?.stopId.oneofKind === 'loadStop'
                        ? arg.stopStatusUpdates?.stopId.loadStop.stopId
                        : arg.stopStatusUpdates?.stopId.oneofKind === 'manifestStop' &&
                          arg.stopStatusUpdates?.stopId.manifestStop.manifestStopId;

                if (stopId) {
                    if (arg.stopStatusUpdates?.stopId.oneofKind === 'loadStop') {
                        const updateData = {
                            loadStopStatus: arg.stopStatusUpdates?.stopId.loadStop.status
                        };
                        dispatch(
                            UpdateCacheManifestStops(
                                arg.manifestId,
                                stopId,
                                updateData,
                                queryFulfilled
                            )
                        );

                        dispatch(
                            UpdateOrderStopsDataCache(
                                arg.loadId,
                                stopId,
                                updateData,
                                queryFulfilled
                            )
                        );
                    }

                    if (arg.stopStatusUpdates?.stopId.oneofKind === 'manifestStop') {
                        const updateData = {
                            manifestStopStatus: arg.stopStatusUpdates?.stopId.manifestStop.status
                        };
                        dispatch(
                            UpdateCacheManifestStops(
                                arg.manifestId,
                                stopId,
                                updateData,
                                queryFulfilled
                            )
                        );
                        dispatch(
                            UpdateOrderStopsDataCache(
                                arg.loadId,
                                stopId,
                                updateData,
                                queryFulfilled
                            )
                        );
                    }
                }
            }
        }),
        updateManifestStop: mutation<
            ManifestStopUpdateReply,
            ManifestStopUpdateRequest & { loadId: string }
        >({
            queryFn        : createPrivateQueryFn(Client, 'manifestStopUpdate'),
            invalidatesTags: ['manifest_truck_route'],
            onQueryStarted : async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                const stopId = arg.manifestStopId;

                const updateData = {
                    manifestStopType       : arg.type,
                    referenceId            : arg.referenceId,
                    note                   : arg.note,
                    appointmentEndAtLocal  : arg.appointmentEndAt,
                    appointmentStartAtLocal: arg.appointmentStartAt,
                    arrivedAt              : arg.arrivedAt,
                    checkedInAt            : arg.checkedInAt,
                    checkedOutAt           : arg.checkedOutAt,
                    departedAt             : arg.departedAt,
                    location               : {
                        address   : arg.location?.address || '',
                        city      : arg.location?.city || '',
                        country   : CountryCode.US,
                        lat       : arg.location?.lat || 0,
                        lon       : arg.location?.lon || 0,
                        state     : arg.location?.state || '',
                        line1     : arg.location?.line1 || '',
                        line2     : arg.location?.line2 || '',
                        locationId: '',
                        name      : arg.location?.name || '',
                        postalCode: arg.location?.postalCode || '',
                        timezone  : ''
                    }
                };

                if (stopId) {
                    dispatch(
                        UpdateCacheManifestStops(arg.manifestId, stopId, updateData, queryFulfilled)
                    );
                }

                if (arg.loadId && stopId) {
                    dispatch(
                        UpdateOrderStopsDataCache(arg.loadId, stopId, updateData, queryFulfilled)
                    );
                }
            }
        }),

        addStopToManifest: mutation<ManifestStopAddReply, ManifestStopAddRequest>({
            queryFn        : createPrivateQueryFn(Client, 'manifestStopAdd'),
            invalidatesTags: (res, _, arg) => [
                { type: 'manifest', id: arg.manifestId },
                'manifests',
                'manifest_truck_route'
            ],
            onQueryStarted: async (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Adding Stop to Manifest',
                    success       : 'Stop was added to Manifest'
                });
            }
        }),
        removeStopFromManifest: mutation<
            ManifestStopRemoveReply,
            ManifestStopRemoveRequest & { loadId: string }
        >({
            queryFn        : createPrivateQueryFn(Client, 'manifestStopRemove'),
            invalidatesTags: ['manifest_truck_route'],
            onQueryStarted : async (arg, {
                dispatch,
                queryFulfilled
            }) => {
                dispatch(RemoveStopFromLoadsCache(arg.loadId, arg.manifestStopId, queryFulfilled));
                dispatch(
                    RemoveStopFromManifestCache(arg.manifestId, arg.manifestStopId, queryFulfilled)
                );
            }
        }),

        updateStopSequence: mutation<
            ManifestStopSequenceUpdateReply,
            ManifestStopSequenceUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'manifestStopSequenceUpdate'),
            invalidatesTags: (res, _, arg) => [
                { type: 'manifest', id: arg.manifestId },
                'manifests',
                'manifest_truck_route'
            ],
            onQueryStarted: async (arg, api) => {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Updating Stop Sequence',
                    success       : 'Stop Sequence was updated'
                });
            }
        })
    })
});

export default ManifestStopsGrpcService;
