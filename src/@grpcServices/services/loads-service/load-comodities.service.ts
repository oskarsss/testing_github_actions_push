import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import grpcTransport from '@/@grpcServices/grpcTransport';
import { handleRequest } from '@/store/api';
import {
    CommodityCreateReply,
    CommodityCreateRequest,
    CommodityDeleteReply,
    CommodityDeleteRequest,
    CommodityRetrieveReply,
    CommodityRetrieveRequest,
    CommodityUpdateReply,
    CommodityUpdateRequest,
    CommodityGetForLoadReply,
    CommodityGetForLoadRequest
} from '@proto/commodities';
import { CommoditiesServiceClient } from '@proto/commodities.client';

const Client = new CommoditiesServiceClient(grpcTransport);

const LoadCommoditiesGrpcService = grpcAPI.injectEndpoints({
    endpoints: (builder) => ({
        getCommoditiesForLoad: builder.query<CommodityGetForLoadReply, CommodityGetForLoadRequest>({
            queryFn     : createPrivateQueryFn(Client, 'commodityGetForLoad'),
            providesTags: (result, error, arg) => [{ type: 'load_commodity', id: arg.loadId }]
        }),
        createCommodity: builder.mutation<CommodityCreateReply, CommodityCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'commodityCreate'),
            invalidatesTags: (result, error, arg) => [
                { type: 'load', id: arg.loadId },
                'loads',
                'manifest',
                { type: 'load_commodity', id: arg.loadId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Creating commodity',
                    success: 'Commodity was created'
                });
            }
        }),
        retrieveCommodity: builder.query<CommodityRetrieveReply, CommodityRetrieveRequest>({
            queryFn: createPrivateQueryFn(Client, 'commodityRetrieve')
        }),
        updateCommodity: builder.mutation<
            CommodityUpdateReply,
            CommodityUpdateRequest & { loadId: string }
        >({
            queryFn        : createPrivateQueryFn(Client, 'commodityUpdate'),
            invalidatesTags: (result, error, arg) => [
                { type: 'load', id: arg.loadId },
                'loads',
                'manifest',
                { type: 'load_commodity', id: arg.loadId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating commodity',
                    success: 'Commodity was updated'
                });
            }
        }),
        deleteCommodity: builder.mutation<
            CommodityDeleteReply,
            CommodityDeleteRequest & {
                loadId: string;
            }
        >({
            queryFn        : createPrivateQueryFn(Client, 'commodityDelete'),
            invalidatesTags: (result, error, arg) => [
                { type: 'load', id: arg.loadId },
                'loads',
                'manifest',
                { type: 'load_commodity', id: arg.loadId }
            ],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting commodity',
                    success: 'Commodity was deleted'
                });
            }
        })
    })
});

export default LoadCommoditiesGrpcService;
