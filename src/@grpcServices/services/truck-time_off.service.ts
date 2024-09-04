import {
    TruckTimeOffCreateReply,
    TruckTimeOffCreateRequest,
    TruckTimeOffDeleteReply,
    TruckTimeOffDeleteRequest,
    TruckTimeOffUpdateReply,
    TruckTimeOffUpdateRequest
} from '@proto/truck.time_off';
import { TruckTimeOffServiceClient } from '@proto/truck.time_off.client';
import { handleRequest, invalidateTags } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new TruckTimeOffServiceClient(grpcTransport);

const TruckTimeOffGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        addTimeOff: mutation<TruckTimeOffCreateReply, TruckTimeOffCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'truckTimeOffCreate'),
            invalidatesTags: (result) => invalidateTags(result, 'scheduling'),
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Adding Time Off',
                    success: 'Time Off was added'
                });
            }
        }),
        editTimeOff: mutation<TruckTimeOffUpdateReply, TruckTimeOffUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'truckTimeOffUpdate'),
            invalidatesTags: (result) => invalidateTags(result, 'scheduling'),
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Changing Time Off',
                    success: 'Time Off was changed'
                });
            }
        }),
        deleteTimeOff: mutation<TruckTimeOffDeleteReply, TruckTimeOffDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'truckTimeOffDelete'),
            invalidatesTags: (result) => invalidateTags(result, 'scheduling'),
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Time Off',
                    success: 'Time Off was deleted'
                });
            }
        })
    })
});

export default TruckTimeOffGrpcService;
