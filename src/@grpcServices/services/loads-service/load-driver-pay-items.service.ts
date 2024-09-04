import { LoadsDriverPayItemsServiceClient } from '@proto/load_driver_pay_items.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    LoadDriverPayItemAddRequest,
    LoadDriverPayItemAddReply,
    LoadDriverPayItemDeleteReply,
    LoadDriverPayItemDeleteRequest,
    LoadDriverPayItemUpdateRequest,
    LoadDriverPayItemUpdateReply
} from '@proto/load_driver_pay_items';

import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';

const LoadDriverPayItemClient = new LoadsDriverPayItemsServiceClient(grpcTransport);

const LoadDriverPayItemGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({ mutation }) => ({
        addDriverPayItem: mutation<LoadDriverPayItemAddReply, LoadDriverPayItemAddRequest>({
            queryFn: createPrivateQueryFn(LoadDriverPayItemClient, 'loadDriverPayItemAdd'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Driver Pay Item',
                    success: 'Driver Pay Item was added'
                });
            }
        }),
        deleteDriverPayItem: mutation<LoadDriverPayItemDeleteReply, LoadDriverPayItemDeleteRequest>(
            {
                queryFn: createPrivateQueryFn(LoadDriverPayItemClient, 'loadDriverPayItemDelete'),
                async onQueryStarted(arg, { queryFulfilled }) {
                    await handleRequest({
                        queryFulfilled,
                        loading: 'Deleting Driver Pay Item',
                        success: 'Driver Pay Item was deleted'
                    });
                }
            }
        ),
        updateDriverPayItem: mutation<LoadDriverPayItemUpdateReply, LoadDriverPayItemUpdateRequest>(
            {
                queryFn: createPrivateQueryFn(LoadDriverPayItemClient, 'loadDriverPayItemUpdate'),
                async onQueryStarted(arg, { queryFulfilled }) {
                    await handleRequest({
                        queryFulfilled,
                        loading: 'Updating Driver Pay Item',
                        success: 'Driver Pay Item was updated'
                    });
                }
            }
        )
    })
});

export default LoadDriverPayItemGrpcService;
