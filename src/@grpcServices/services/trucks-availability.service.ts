import { TrucksAvailabilityServiceClient } from '@proto/trucks_availability.client';
import {
    GetTrucksAvailabilityReply,
    GetTrucksAvailabilityRequest,
    TruckAvailabilitySetOfflineReply,
    TruckAvailabilitySetOfflineRequest,
    TruckAvailabilitySetOnlineReply,
    TruckAvailabilitySetOnlineRequest,
    UpdateTruckAvailabilityReply,
    UpdateTruckAvailabilityRequest,
    LinkGetReply,
    LinkGetRequest,
    LinkRevokeRequest,
    LinkRevokeReply
} from '@proto/trucks_availability';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

// const builder = GrpcService.createEndpointBuilder(TrucksAvailabilityServiceClient, GrpcAPI);

const trucksAvailabilityClient = new TrucksAvailabilityServiceClient(grpcTransport);

const getCapListLiveShareLink = createPrivateQueryFn(trucksAvailabilityClient, 'linkGet');
const createCapListShareLink = createPrivateQueryFn(trucksAvailabilityClient, 'linkCreate');

const trucksAvailabilityService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getCapListShareLink: query<LinkGetReply, LinkGetRequest>({
            queryFn: async (arg, api, extra) => {
                let response = await getCapListLiveShareLink(arg, api, extra);

                if (!response.data?.token) {
                    const createResponse = await createCapListShareLink(arg, api, extra);
                    if (createResponse.error) {
                        return createResponse;
                    }
                    response = await getCapListLiveShareLink(arg, api, extra);
                }
                return response;
            },
            providesTags: ['cap_list_share_link']
        }),
        revokeCapListShareLink: mutation<LinkRevokeReply, LinkRevokeRequest>({
            queryFn: createPrivateQueryFn(trucksAvailabilityClient, 'linkRevoke'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Revoking cap list link',
                    success: 'Cap list link revoked'
                });
            },
            invalidatesTags: ['cap_list_share_link']
        }),

        getTrucksAvailability: query<GetTrucksAvailabilityReply, GetTrucksAvailabilityRequest>({
            queryFn     : createPrivateQueryFn(trucksAvailabilityClient, 'getTrucksAvailability'),
            providesTags: ['trucks_availability']
        }),

        truckAvailabilitySetOnline: mutation<
            TruckAvailabilitySetOnlineReply,
            TruckAvailabilitySetOnlineRequest
        >({
            queryFn        : createPrivateQueryFn(trucksAvailabilityClient, 'truckAvailabilitySetOnline'),
            invalidatesTags: ['trucks_availability'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Setting Driver online',
                    success       : 'Driver was set online'
                });
            }
        }),
        truckAvailabilitySetOffline: mutation<
            TruckAvailabilitySetOfflineReply,
            TruckAvailabilitySetOfflineRequest
        >({
            queryFn        : createPrivateQueryFn(trucksAvailabilityClient, 'truckAvailabilitySetOffline'),
            invalidatesTags: ['trucks_availability'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Setting Driver offline',
                    success       : 'Driver was set offline'
                });
            }
        }),
        updateTruckAvailability: mutation<
            UpdateTruckAvailabilityReply,
            UpdateTruckAvailabilityRequest
        >({
            queryFn        : createPrivateQueryFn(trucksAvailabilityClient, 'updateTruckAvailability'),
            invalidatesTags: ['trucks_availability'],
            onQueryStarted(arg, api) {
                handleRequest({
                    queryFulfilled: api.queryFulfilled,
                    loading       : 'Updating Driver availability',
                    success       : 'Driver availability was updated'
                });
            }
        })
    })
});

// const keyGenerator = GrpcService.createApiKeyGenerator('trucksAvailabilityService');

// const trucksAvailabilityService = {
//     getTrucksAvailability: builder.query<GetTrucks
// AvailabilityRequest, GetTrucksAvailabilityReply>({
//         storeKey: keyGenerator('getTrucksAvailability'),
//         Request : GetTrucksAvailabilityRequest,
//         method  : 'getTrucksAvailability'
//     }),
//     updateTruckAvailability: builder.mutation<
//         UpdateTruckAvailabilityRequest,
//         UpdateTruckAvailabilityReply
//     >({
//         storeKey: keyGenerator('updateTruckAvailability'),
//         Request : UpdateTruckAvailabilityRequest,
//         method  : 'updateTruckAvailability',

//         onQueryStarted: (arg, { queryFulfilled }) => {
//             grpcHandleRequest({
//                 queryFulfilled,
//                 loading: 'Updating Driver availability',
//                 success: 'Driver availability was updated',
//                 onSuccess() {
//                     trucksAvailabilityService.getTrucksAvailability.invalidate();
//                 }
//             });
//         }
//     }),
//     truckAvailabilitySetOnline: builder.mutation<
//         TruckAvailabilitySetOnlineRequest,
//         TruckAvailabilitySetOnlineReply
//     >({
//         storeKey: keyGenerator('truckAvailabilitySetOnline'),
//         Request : TruckAvailabilitySetOnlineRequest,
//         method  : 'truckAvailabilitySetOnline',

//         onQueryStarted: (arg, { queryFulfilled }) => {
//             grpcHandleRequest({
//                 queryFulfilled,
//                 loading: 'Setting Driver online',
//                 success: 'Driver was set online',
//                 onSuccess() {
//                     trucksAvailabilityService.getTrucksAvailability.invalidate();
//                 }
//             });
//         }
//     }),
//     truckAvailabilitySetOffline: builder.mutation<
//         TruckAvailabilitySetOfflineRequest,
//         TruckAvailabilitySetOfflineReply
//     >({
//         storeKey: keyGenerator('truckAvailabilitySetOffline'),
//         Request : TruckAvailabilitySetOfflineRequest,
//         method  : 'truckAvailabilitySetOffline',

//         onQueryStarted: (arg, { queryFulfilled }) => {
//             grpcHandleRequest({
//                 queryFulfilled,
//                 loading: 'Setting Driver offline',
//                 success: 'Driver was set offline',
//                 onSuccess() {
//                     trucksAvailabilityService.getTrucksAvailability.invalidate();
//                 }
//             });
//         }
//     })
// };

export default trucksAvailabilityService;
