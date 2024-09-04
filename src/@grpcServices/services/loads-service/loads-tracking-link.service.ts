import { LoadsServiceClient } from '@proto/loads.client';
import {
    LoadCreateTrackingLinkReply,
    LoadCreateTrackingLinkRequest,
    LoadRevokeTrackingLinkReply,
    LoadRevokeTrackingLinkRequest,
    LoadGetTrackingLinkReply,
    LoadGetTrackingLinkRequest,
    LoadUpdateTrackingLinkReply,
    LoadUpdateTrackingLinkRequest
} from '@proto/loads';
import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import grpcTransport from '@/@grpcServices/grpcTransport';
import { handleRequest } from '@/store/api';

const LoadTrackingLinkService = new LoadsServiceClient(grpcTransport);

const getTruckingLink = createPrivateQueryFn(LoadTrackingLinkService, 'loadGetTrackingLink');
const createTruckingLink = createPrivateQueryFn(LoadTrackingLinkService, 'loadCreateTrackingLink');

const LoadTrackingLinkGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        createTrackingLink: mutation<LoadCreateTrackingLinkReply, LoadCreateTrackingLinkRequest>({
            queryFn        : createPrivateQueryFn(LoadTrackingLinkService, 'loadCreateTrackingLink'),
            invalidatesTags: ['trackingLink'],
            async onQueryStarted(arg, {
                queryFulfilled,
                dispatch
            }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Creating tracking link',
                    success: 'Tracking link created'
                });
            }
        }),
        revokeTrackingLink: mutation<LoadRevokeTrackingLinkReply, LoadRevokeTrackingLinkRequest>({
            queryFn        : createPrivateQueryFn(LoadTrackingLinkService, 'loadRevokeTrackingLink'),
            invalidatesTags: ['trackingLink'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Revoking tracking link',
                    success: 'Tracking link revoked'
                });
            }
        }),
        getTrackingLink: query<LoadGetTrackingLinkReply, LoadGetTrackingLinkRequest>({
            queryFn: async (arg, api, extra) => {
                let response = await getTruckingLink(arg, api, extra);
                if (!response.data?.token) {
                    const createResponse = await createTruckingLink(arg, api, extra);
                    if (createResponse.error) {
                        return createResponse;
                    }
                    response = await getTruckingLink(arg, api, extra);
                }
                return response;
            },
            providesTags: ['trackingLink']
        }),
        updateTrackingLink: mutation<LoadUpdateTrackingLinkReply, LoadUpdateTrackingLinkRequest>({
            queryFn        : createPrivateQueryFn(LoadTrackingLinkService, 'loadUpdateTrackingLink'),
            invalidatesTags: ['trackingLink'],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating tracking link',
                    success: 'Tracking link updated'
                });
            }
        })
    })
});

export default LoadTrackingLinkGrpcService;
