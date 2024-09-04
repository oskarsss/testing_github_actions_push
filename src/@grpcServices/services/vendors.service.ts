import { VendorsServiceClient } from '@proto/vendors.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    VendorCreateReply,
    VendorCreateRequest,
    VendorDeleteReply,
    VendorDeleteRequest,
    VendorGetReply,
    VendorGetRequest,
    VendorRetrieveReply,
    VendorRetrieveRequest,
    VendorUpdateReply,
    VendorUpdateRequest
} from '@proto/vendors';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest, invalidateTag, invalidateTags, tagIdList } from '@/store/api';

const Client = new VendorsServiceClient(grpcTransport);

const VendorsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getVendors: query<VendorGetReply, VendorGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'vendorGet'),
            providesTags: [{ type: 'vendors', id: tagIdList }]
        }),
        createVendor: mutation<VendorCreateReply, VendorCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'vendorCreate'),
            invalidatesTags: (result) => invalidateTag(result, 'vendors'),
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Vendor',
                    success: 'Vendor was created'
                });
            }
        }),
        retrieveVendor: query<VendorRetrieveReply, VendorRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'vendorRetrieve'),
            providesTags: (result, _, arg) => [{ type: 'vendor', id: arg.vendorId }]
        }),
        updateVendor: mutation<VendorUpdateReply, VendorUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'vendorUpdate'),
            invalidatesTags: (result, f, arg) =>
                invalidateTags(result, 'vendors', arg.vendorId, 'vendor'),
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Vendor',
                    success: 'Vendor was updated'
                });
            }
        }),
        deleteVendor: mutation<VendorDeleteReply, VendorDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'vendorDelete'),
            invalidatesTags: (result) => invalidateTag(result, 'vendors'),
            async onQueryStarted(arg, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Vendor',
                    success: 'Vendor was deleted'
                });
            }
        })
    })
});

export default VendorsGrpcService;
