import { TrailersServiceClient } from '@proto/trailers.client';
import {
    TrailerStatusUpdateReply,
    TrailerStatusUpdateRequest,
    TrailerDeleteReply,
    TrailerDeleteRequest,
    TrailerParkingLocationUpdateReply,
    TrailerParkingLocationUpdateRequest,
    TrailerUpdateReply,
    TrailerUpdateRequest,
    TrailerGetRequest,
    TrailerGetReply,
    TrailerCreateReply,
    TrailerCreateRequest,
    TrailerRetrieveReply,
    TrailerRetrieveRequest,
    TrailerCompanyAssignReply,
    TrailerCompanyAssignRequest,
    TrailerCompanyRemoveReply,
    TrailerCompanyRemoveRequest
} from '@proto/trailers';
import { handleRequest } from '@/store/api';
import { UpdateTrailerCacheDataThunk } from '@/store/storage/trailers/actions/cache';
import { TrailerModel_Status } from '@proto/models/model_trailer';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new TrailersServiceClient(grpcTransport);

const TrailersGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        createTrailer: mutation<TrailerCreateReply, TrailerCreateRequest>({
            queryFn: createPrivateQueryFn(Client, 'trailerCreate'),
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Adding Trailer',
                    success       : 'Trailer was added'
                });
            }
        }),
        updateTrailer: mutation<TrailerUpdateReply, TrailerUpdateRequest>({
            queryFn: createPrivateQueryFn(Client, 'trailerUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateTrailerCacheDataThunk({
                        data     : arg,
                        trailerId: arg.trailerId,
                        queryFulfilled
                    })
                );
            }
        }),
        trailerStatusUpdate: mutation<TrailerStatusUpdateReply, TrailerStatusUpdateRequest>({
            queryFn: createPrivateQueryFn(Client, 'trailerStatusUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateTrailerCacheDataThunk({
                        data     : arg,
                        trailerId: arg.trailerId,
                        queryFulfilled
                    })
                );
            }
        }),
        deleteTrailer: mutation<TrailerDeleteReply, TrailerDeleteRequest>({
            queryFn: createPrivateQueryFn(Client, 'trailerDelete'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateTrailerCacheDataThunk({
                        data: {
                            status: TrailerModel_Status.DELETED
                        },
                        trailerId: arg.trailerId,
                        queryFulfilled
                    })
                );
            }
        }),
        updateTrailerParkingLocation: mutation<
            TrailerParkingLocationUpdateReply,
            TrailerParkingLocationUpdateRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'trailerParkingLocationUpdate'),
            onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateTrailerCacheDataThunk({
                        data     : arg,
                        trailerId: arg.trailerId,
                        queryFulfilled
                    })
                );
            }
        }),
        assignCompanyToTrailer: mutation<TrailerCompanyAssignReply, TrailerCompanyAssignRequest>({
            queryFn: createPrivateQueryFn(Client, 'trailerCompanyAssign'),
            async onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateTrailerCacheDataThunk({
                        data     : arg,
                        trailerId: arg.trailerId,
                        queryFulfilled
                    })
                );
            }
        }),
        unAssignCompanyFromTrailer: mutation<
            TrailerCompanyRemoveReply,
            TrailerCompanyRemoveRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'trailerCompanyRemove'),
            async onQueryStarted(arg, {
                dispatch,
                queryFulfilled
            }) {
                dispatch(
                    UpdateTrailerCacheDataThunk({
                        data: {
                            trailerCompanyId: ''
                        },
                        trailerId: arg.trailerId,
                        queryFulfilled
                    })
                );
            }
        })
    })
});

export default TrailersGrpcService;
