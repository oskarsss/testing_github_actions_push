import { LoadDriversServiceClient } from '@proto/load_drivers.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    LoadDriverAddReply,
    LoadDriverAddRequest,
    LoadDriverRemoveReply,
    LoadDriverRemoveRequest
} from '@proto/load_drivers';

import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';

const LoadDriversClient = new LoadDriversServiceClient(grpcTransport);

const LoadDriversGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({ mutation }) => ({
        addDriverPay: mutation<LoadDriverAddReply, LoadDriverAddRequest>({
            queryFn: createPrivateQueryFn(LoadDriversClient, 'loadDriverAdd'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Driver Pay',
                    success: 'Driver Pay was added'
                });
            }
        }),
        removeDriverPay: mutation<LoadDriverRemoveReply, LoadDriverRemoveRequest>({
            queryFn: createPrivateQueryFn(LoadDriversClient, 'loadDriverRemove'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Removing Driver Pay',
                    success: 'Driver Pay was removed'
                });
            }
        })
    })
});

export default LoadDriversGrpcService;
