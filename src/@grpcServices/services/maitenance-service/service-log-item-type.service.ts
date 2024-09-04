import { ServiceLogItemTypeServiceClient } from '@proto/service_log_item_type.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    ServiceLogItemTypeGetReply,
    ServiceLogItemTypeGetRequest,
    ServiceLogItemTypeCreateReply,
    ServiceLogItemTypeCreateRequest
} from '@proto/service_log_item_type';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';

const Client = new ServiceLogItemTypeServiceClient(grpcTransport);

const ServiceLogItemTypeGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getServiceLogItemTypes: query<ServiceLogItemTypeGetReply, ServiceLogItemTypeGetRequest>({
            queryFn     : createPrivateQueryFn(Client, 'serviceLogItemTypeGet'),
            providesTags: ['service_log_item_types']
        }),
        createServiceLogItemType: mutation<
            ServiceLogItemTypeCreateReply,
            ServiceLogItemTypeCreateRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'serviceLogItemTypeCreate'),
            invalidatesTags: ['service_log_item_types'],
            onQueryStarted(_, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Service Log Item Type',
                    success: 'Service Log Item Type Created'
                });
            }
        })
    })
});

export default ServiceLogItemTypeGrpcService;
