import { ServiceLogItemServiceClient } from '@proto/service_log_item.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    ServiceLogItemGetReply,
    ServiceLogItemGetRequest,
    ServiceLogItemRetrieveReply,
    ServiceLogItemRetrieveRequest,
    ServiceLogItemCreateReply,
    ServiceLogItemCreateRequest,
    ServiceLogItemUpdateReply,
    ServiceLogItemUpdateRequest,
    ServiceLogItemDeleteReply,
    ServiceLogItemDeleteRequest
} from '@proto/service_log_item';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';
import API_TAGS from '@/store/api_tags';

const Client = new ServiceLogItemServiceClient(grpcTransport);

const ServiceLogItemGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getServiceLogItems: query<ServiceLogItemGetReply, ServiceLogItemGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'serviceLogItemGet'),
            providesTags: ['service_log_items']
        }),
        retrieveServiceLogItem: query<ServiceLogItemRetrieveReply, ServiceLogItemRetrieveRequest>({
            queryFn     : createPrivateQueryFn(Client, 'serviceLogItemRetrieve'),
            providesTags: ['service_log_item']
        }),
        createServiceLogItem: mutation<ServiceLogItemCreateReply, ServiceLogItemCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'serviceLogItemCreate'),
            invalidatesTags: [
                API_TAGS.service_log_items,
                API_TAGS.service_logs,
                API_TAGS.service_log
            ],
            onQueryStarted(args, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating service item',
                    success: 'Service item was created'
                });
            }
        }),
        updateServiceLogItem: mutation<ServiceLogItemUpdateReply, ServiceLogItemUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'serviceLogItemUpdate'),
            invalidatesTags: [
                API_TAGS.service_log_items,
                API_TAGS.service_logs,
                API_TAGS.service_log
            ],
            onQueryStarted(args, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating service item',
                    success: 'Service item was updated'
                });
            }
        }),
        deleteServiceLogItem: mutation<ServiceLogItemDeleteReply, ServiceLogItemDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'serviceLogItemDelete'),
            invalidatesTags: [
                API_TAGS.service_log_items,
                API_TAGS.service_logs,
                API_TAGS.service_log
            ],
            onQueryStarted(args, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting service item',
                    success: 'Service item was deleted'
                });
            }
        })
    })
});

export default ServiceLogItemGrpcService;
