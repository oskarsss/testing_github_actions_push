import * as Proto from '@proto/vehicle_warranty';
import { VehicleWarrantyServiceClient } from '@proto/vehicle_warranty.client';
import { handleRequest } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new VehicleWarrantyServiceClient(grpcTransport);

const VehicleWarrantyGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        warrantyCreate: mutation<Proto.WarrantyCreateReply, Proto.WarrantyCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'warrantyCreate'),
            invalidatesTags: ['warranties'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Warranty',
                    success: 'Warranty was created'
                });
            }
        }),
        warrantyRetrieve: query<Proto.WarrantyRetrieveReply, Proto.WarrantyRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'warrantyRetrieve'),
            providesTags: ['warranties']
        }),

        warrantyUpdate: mutation<Proto.WarrantyUpdateReply, Proto.WarrantyUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'warrantyUpdate'),
            invalidatesTags: ['warranties', 'warranty_items']
        }),

        warrantyDelete: mutation<Proto.WarrantyDeleteReply, Proto.WarrantyDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'warrantyDelete'),
            invalidatesTags: ['warranties'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Warranty',
                    success: 'Warranty was deleted'
                });
            }
        })
    })
});

export default VehicleWarrantyGrpcService;
