import grpcAPI from '@/@grpcServices/api';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import grpcTransport from '@/@grpcServices/grpcTransport';
import { handleRequest, tagIdList } from '@/store/api';
import {
    ManifestDriverPayItemAddReply,
    ManifestDriverPayItemAddRequest,
    ManifestDriverPayItemDeleteReply,
    ManifestDriverPayItemDeleteRequest,
    ManifestDriverPayItemRetrieveReply,
    ManifestDriverPayItemRetrieveRequest,
    ManifestDriverPayItemUpdateReply,
    ManifestDriverPayItemUpdateRequest
} from '@proto/manifest_driver_pay_items';
import { ManifestDriverPayItemsServiceClient } from '@proto/manifest_driver_pay_items.client';

const Client = new ManifestDriverPayItemsServiceClient(grpcTransport);

const ManifestDriverPayService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        addManifestDriverPayItem: mutation<
            ManifestDriverPayItemAddReply,
            ManifestDriverPayItemAddRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'manifestDriverPayItemAdd'),
            invalidatesTags: (res, _, arg) => [{ type: 'manifests_drivers', id: arg.manifestId }],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Adding Driver Pay Item',
                    success: 'Driver Pay Item was added'
                });
            }
        }),
        deleteManifestDriverPayItem: mutation<
            ManifestDriverPayItemDeleteReply,
            ManifestDriverPayItemDeleteRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'manifestDriverPayItemDelete'),
            invalidatesTags: (res, _, arg) => [{ type: 'manifests_drivers', id: arg.manifestId }],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Driver Pay Item',
                    success: 'Driver Pay Item was deleted'
                });
            }
        }),
        retrieveManifestDriverPayItems: query<
            ManifestDriverPayItemRetrieveReply,
            ManifestDriverPayItemRetrieveRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'manifestDriverPayItemRetrieve'),
            providesTags: (res, _, arg) => [{ type: 'manifests_drivers', id: arg.manifestId }]
        }),
        updateManifestDriverPayItem: mutation<
            ManifestDriverPayItemUpdateReply,
            ManifestDriverPayItemUpdateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'manifestDriverPayItemUpdate'),
            invalidatesTags: (res, _, arg) => [{ type: 'manifests_drivers', id: arg.manifestId }],
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating Driver Pay Item',
                    success: 'Driver Pay Item was updated'
                });
            }
        })
    })
});

export default ManifestDriverPayService;
