import { TrailerTypesServiceClient } from '@proto/trailer.types.client';
import {
    TrailerTypesCreateReply,
    TrailerTypesCreateRequest,
    TrailerTypesDeleteReply,
    TrailerTypesDeleteRequest,
    TrailerTypesGetReply,
    TrailerTypesGetRequest,
    TrailerTypesUpdateReply,
    TrailerTypesUpdateRequest
} from '@proto/trailer.types';
import { handleRequest } from '@/store/api';
import grpcTransport from '../../grpcTransport';
import grpcAPI from '../../api';
import { createPrivateQueryFn } from '../../createQueryFn';

const TrailerTypesService = new TrailerTypesServiceClient(grpcTransport);

const TrailerTypesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getTrailerTypes: query<TrailerTypesGetReply, TrailerTypesGetRequest>({
            queryFn     : createPrivateQueryFn(TrailerTypesService, 'get'),
            providesTags: ['trailer_types']
        }),
        createTrailerType: mutation<TrailerTypesCreateReply, TrailerTypesCreateRequest>({
            queryFn        : createPrivateQueryFn(TrailerTypesService, 'create'),
            invalidatesTags: ['trailer_types'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Trailer Types',
                    success: 'Trailer Types was created'
                });
            }
        }),
        updateTrailerType: mutation<TrailerTypesUpdateReply, TrailerTypesUpdateRequest>({
            queryFn        : createPrivateQueryFn(TrailerTypesService, 'update'),
            invalidatesTags: ['trailer_types'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Trailer Types',
                    success: 'Trailer Types was updated'
                });
            }
        }),
        deleteTrailerType: mutation<TrailerTypesDeleteReply, TrailerTypesDeleteRequest>({
            queryFn        : createPrivateQueryFn(TrailerTypesService, 'delete'),
            invalidatesTags: ['trailer_types'],
            onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Trailer Types',
                    success: 'Trailer Types was deleted'
                });
            }
        })
    })
});

export default TrailerTypesGrpcService;
