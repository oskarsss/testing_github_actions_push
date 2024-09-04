import { LoadsStopsServiceClient } from '@proto/load_stops.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    LoadStopAddReply,
    LoadStopAddRequest,
    LoadStopDeleteReply,
    LoadStopDeleteRequest,
    LoadStopUpdateRequest,
    LoadStopUpdateReply,
    LoadStopUpdateStatusReply,
    LoadStopUpdateStatusRequest,
    LoadStopCommodityAssignReply,
    LoadStopCommodityAssignRequest,
    LoadStopCommodityGetReply,
    LoadStopCommodityGetRequest,
    LoadStopCommodityUnassignReply,
    LoadStopCommodityUnassignRequest,
    LoadStopAddCommodityGetForNewReply,
    LoadStopAddCommodityGetForNewRequest
} from '@proto/load_stops';

import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';
import { CountryCode } from '@proto/models/country_code';
import {
    RemoveStopFromManifestCache,
    UpdateCacheManifestStops
} from '@/store/dispatch/manifests/actions/cashe';
import {
    RemoveStopFromLoadsCache,
    UpdateOrderStopsDataCache
} from '../../../store/storage/orders/actions/cache';

const LoadStopsClient = new LoadsStopsServiceClient(grpcTransport);

const LoadStopsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        addStop: mutation<LoadStopAddReply, LoadStopAddRequest>({
            queryFn        : createPrivateQueryFn(LoadStopsClient, 'loadStopAdd'),
            invalidatesTags: (result, error, arg) => ['manifest_truck_route', 'load_truck_route'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Stop',
                    success: 'Stop was added'
                });
            }
        }),
        deleteStop: mutation<LoadStopDeleteReply, LoadStopDeleteRequest & { manifestId: string }>({
            queryFn        : createPrivateQueryFn(LoadStopsClient, 'loadStopDelete'),
            invalidatesTags: (result, error, arg) => ['manifest_truck_route', 'load_truck_route'],
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                dispatch(RemoveStopFromManifestCache(arg.manifestId, arg.stopId, queryFulfilled));
                dispatch(RemoveStopFromLoadsCache(arg.loadId, arg.stopId, queryFulfilled));
            }
        }),
        updateStop: mutation<LoadStopUpdateReply, LoadStopUpdateRequest & { manifestId: string }>({
            queryFn        : createPrivateQueryFn(LoadStopsClient, 'loadStopUpdate'),
            invalidatesTags: (result, error, arg) => [
                'manifest_truck_route',
                'load_truck_route',
                { type: 'load_commodity', id: arg.loadId }
            ],
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                const { stopId } = arg;

                const updateData = {
                    loadStopType           : arg.type,
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

                if (stopId && arg.manifestId) {
                    dispatch(
                        UpdateCacheManifestStops(arg.manifestId, stopId, updateData, queryFulfilled)
                    );
                }

                if (arg.loadId && stopId) {
                    dispatch(
                        UpdateOrderStopsDataCache(arg.loadId, stopId, updateData, queryFulfilled)
                    );
                }

                // await handleRequest({
                //     queryFulfilled,
                //     loading: 'Updating Stop',
                //     success: 'Stop was updated'
                // });
            }
        }),
        assignCommodity: mutation<LoadStopCommodityAssignReply, LoadStopCommodityAssignRequest>({
            queryFn        : createPrivateQueryFn(LoadStopsClient, 'loadStopCommodityAssign'),
            invalidatesTags: (result, error, arg) => [
                { type: 'load', id: arg.loadId },
                'loads',
                'manifest',
                { type: 'load_commodity', id: arg.loadId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Assigning commodity',
                    success: 'Commodity was assigned'
                });
            }
        }),
        getCommodity: query<LoadStopCommodityGetReply, LoadStopCommodityGetRequest>({
            queryFn     : createPrivateQueryFn(LoadStopsClient, 'loadStopCommodityGet'),
            providesTags: (r, e, a) => [{ type: 'load_commodity', id: a.loadId }]
        }),
        unassignCommodity: mutation<
            LoadStopCommodityUnassignReply,
            LoadStopCommodityUnassignRequest
        >({
            queryFn        : createPrivateQueryFn(LoadStopsClient, 'loadStopCommodityUnassign'),
            invalidatesTags: (result, error, arg) => [
                { type: 'load', id: arg.loadId },
                'loads',
                'manifest',
                { type: 'load_commodity', id: arg.loadId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Unassigning commodity',
                    success: 'Commodity was unassigned'
                });
            }
        }),
        getCommodityForNew: query<
            LoadStopAddCommodityGetForNewReply,
            LoadStopAddCommodityGetForNewRequest
        >({
            queryFn     : createPrivateQueryFn(LoadStopsClient, 'loadStopCommodityGetForNew'),
            providesTags: (r, e, a) => [{ type: 'load_commodity', id: a.loadId }]
        })
    })
});

export default LoadStopsGrpcService;
