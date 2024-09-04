import {
    PlateCreateReply,
    PlateCreateRequest,
    PlateRetrieveReply,
    PlateRetrieveRequest,
    PlateUpdateReply,
    PlateUpdateRequest,
    PlateDeleteRequest,
    PlateDeleteReply,
    PlateStatusUpdateRequest,
    PlateStatusUpdateReply,
    PlateGetReply,
    PlateGetRequest
} from '@proto/plates';
import { PlatesServiceClient } from '@proto/plates.client';
import { CountryCode } from '@proto/models/country_code';
import { Country } from '@/models/country/country';
import { PlateModel_Status, PlateModel_VehicleType } from '@proto/models/model_plate';
import { handleRequest, invalidateTag, invalidateTags, tagIdList } from '@/store/api';
import { PlateStatus, PlateStatuses } from '@/models/fleet/plates/plate-status';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new PlatesServiceClient(grpcTransport);

const PlatesGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getPlates: query<PlateGetReply, PlateGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'plateGet'),
            providesTags: ['plates', { type: 'plates', id: tagIdList }]
        }),
        retrievePlate: query<PlateRetrieveReply, PlateRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'plateRetrieve'),
            providesTags: (result) => invalidateTag(result, 'plate', result?.plate?.plateId)
        }),
        updatePlate: mutation<PlateUpdateReply, PlateUpdateRequest>({
            queryFn: createPrivateQueryFn(Client, 'plateUpdate'),

            invalidatesTags: (result, _, arg) => [
                ...invalidateTags(result, 'plates', arg.plateId, 'plate')
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Plate',
                    success: 'Plate was updated'
                });
            }
        }),
        createPlate: mutation<PlateCreateReply, PlateCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'plateCreate'),
            invalidatesTags: (result) => invalidateTags(result, 'plates'),
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Adding Plate',
                    success: 'Plate was added'
                });
            }
        }),
        deletePlate: mutation<PlateDeleteReply, PlateDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'plateDelete'),
            invalidatesTags: (result) => invalidateTags(result, 'plates'),
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Plate',
                    success: 'Plate was deleted'
                });
            }
        }),
        updatePlateStatus: mutation<PlateStatusUpdateReply, PlateStatusUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'plateStatusUpdate'),
            invalidatesTags: (result, _, arg) => [
                ...invalidateTags(result, 'plates', arg.plateId, 'plate')
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Plate Status',
                    success: 'Plate Status was updated'
                });
            }
        })
    })
});

export default PlatesGrpcService;

export const CountryCodeGrpc: Record<Country, CountryCode> = {
    CA: CountryCode.CA,
    MX: CountryCode.MX,
    US: CountryCode.US
};

export const CountryCodeGrpcReverse: Record<CountryCode, Country> = {
    [CountryCode.CA]         : 'CA',
    [CountryCode.MX]         : 'MX',
    [CountryCode.US]         : 'US',
    [CountryCode.UNSPECIFIED]: 'US'
};

export const VehicleTypeGrpc: Record<string, PlateModel_VehicleType> = {
    truck  : PlateModel_VehicleType.TRUCK,
    trailer: PlateModel_VehicleType.TRAILER
};

export const VehicleTypeGrpcReverse: Record<PlateModel_VehicleType, string> = {
    [PlateModel_VehicleType.TRUCK]      : 'truck',
    [PlateModel_VehicleType.TRAILER]    : 'trailer',
    [PlateModel_VehicleType.UNSPECIFIED]: 'truck'
};

export const PlateStatusGrpc: Record<PlateModel_Status, PlateStatus> = {
    [PlateModel_Status.ACTIVE]              : PlateStatuses.ACTIVE,
    [PlateModel_Status.CANCELLED]           : PlateStatuses.CANCELLED,
    [PlateModel_Status.UNSPECIFIED]         : PlateStatuses.ACTIVE,
    [PlateModel_Status.DELETED]             : PlateStatuses.DELETED,
    [PlateModel_Status.PENDING_CANCELLATION]: PlateStatuses.PENDING_CANCELLATION
};

export const PlateStatusGrpcReverse: Record<PlateStatus, PlateModel_Status> = {
    [PlateStatuses.ACTIVE]              : PlateModel_Status.ACTIVE,
    [PlateStatuses.CANCELLED]           : PlateModel_Status.CANCELLED,
    [PlateStatuses.DELETED]             : PlateModel_Status.DELETED,
    [PlateStatuses.PENDING_CANCELLATION]: PlateModel_Status.PENDING_CANCELLATION
};
