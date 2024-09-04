import * as Proto from '@proto/vehicle_warranty.coverage_item';
import { VehicleWarrantyCoverageItemServiceClient } from '@proto/vehicle_warranty.coverage_item.client';
import { handleRequest, tagIdList } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new VehicleWarrantyCoverageItemServiceClient(grpcTransport);

const VehicleWarrantyCoverageItemGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getWarrantyItems: query<Proto.WarrantyItemGetReply, Proto.WarrantyItemGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'warrantyItemGet'),
            providesTags: [{ type: 'warranty_items', id: tagIdList }]
        }),
        warrantyItemCreate: mutation<
            Proto.WarrantyItemCreateReply,
            Proto.WarrantyItemCreateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'warrantyItemCreate'),
            invalidatesTags: ['warranty_items'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Warranty Item',
                    success: 'Warranty Item was created'
                });
            }
        }),
        warrantyItemRetrieve: query<
            Proto.WarrantyItemRetrieveReply,
            Proto.WarrantyItemRetrieveRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'warrantyItemRetrieve'),
            providesTags: ['warranty_items']
        }),
        warrantyItemUpdate: mutation<
            Proto.WarrantyItemUpdateReply,
            Proto.WarrantyItemUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'warrantyItemUpdate'),
            invalidatesTags: ['warranty_items'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Warranty Item',
                    success: 'Warranty Item was updated'
                });
            }
        }),
        warrantyItemDelete: mutation<
            Proto.WarrantyItemDeleteReply,
            Proto.WarrantyItemDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'warrantyItemDelete'),
            invalidatesTags: ['warranty_items'],
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Warranty Item',
                    success: 'Warranty Item was deleted'
                });
            }
        })
    })
});

export default VehicleWarrantyCoverageItemGrpcService;
