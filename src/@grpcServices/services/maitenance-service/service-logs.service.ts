import { ServiceLogServiceClient } from '@proto/service_log.client';
import grpcTransport from '@/@grpcServices/grpcTransport';
import grpcAPI from '@/@grpcServices/api';
import {
    ServiceLogGetReply,
    ServiceLogGetRequest,
    ServiceLogCreateReply,
    ServiceLogCreateRequest,
    ServiceLogRetrieveReply,
    ServiceLogRetrieveRequest,
    ServiceLogUpdateReply,
    ServiceLogUpdateRequest,
    ServiceLogDeleteReply,
    ServiceLogDeleteRequest,
    ServiceLogStatsRetrieveReply,
    ServiceLogStatsRetrieveRequest,
    ServiceLogStatsGetReply,
    ServiceLogStatsGetRequest
} from '@proto/service_log';
import { createPrivateQueryFn } from '@/@grpcServices/createQueryFn';
import { handleRequest } from '@/store/api';
import API_TAGS from '@/store/api_tags';

const Client = new ServiceLogServiceClient(grpcTransport);

const ServiceLogsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        query,
        mutation
    }) => ({
        getServiceLogs: query<ServiceLogGetReply, ServiceLogGetRequest>({
            queryFn          : createPrivateQueryFn(Client, 'serviceLogGet'),
            providesTags     : [API_TAGS.service_logs],
            keepUnusedDataFor: 0
        }),
        getServiceLogsStats: query<ServiceLogStatsGetReply, ServiceLogStatsGetRequest>({
            queryFn          : createPrivateQueryFn(Client, 'serviceLogStatsGet'),
            providesTags     : [API_TAGS.service_logs_stats],
            keepUnusedDataFor: 0
        }),
        retrieveServiceLog: query<ServiceLogRetrieveReply, ServiceLogRetrieveRequest>({
            queryFn          : createPrivateQueryFn(Client, 'serviceLogRetrieve'),
            providesTags     : [API_TAGS.service_log],
            keepUnusedDataFor: 0
        }),
        retrieveServiceLogStats: query<
            ServiceLogStatsRetrieveReply,
            ServiceLogStatsRetrieveRequest
        >({
            queryFn          : createPrivateQueryFn(Client, 'serviceLogStatsRetrieve'),
            providesTags     : [API_TAGS.service_logs_stats],
            keepUnusedDataFor: 0
        }),
        createServiceLog: mutation<ServiceLogCreateReply, ServiceLogCreateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'serviceLogCreate'),
            invalidatesTags: [API_TAGS.service_logs],
            onQueryStarted(_, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Creating Service Log',
                    success: 'Service Log created'
                });
            }
        }),
        updateServiceLog: mutation<ServiceLogUpdateReply, ServiceLogUpdateRequest>({
            queryFn        : createPrivateQueryFn(Client, 'serviceLogUpdate'),
            invalidatesTags: [API_TAGS.service_logs, API_TAGS.service_log],
            onQueryStarted(_, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Updating Service Log',
                    success: 'Service Log updated'
                });
            }
        }),
        deleteServiceLog: mutation<ServiceLogDeleteReply, ServiceLogDeleteRequest>({
            queryFn        : createPrivateQueryFn(Client, 'serviceLogDelete'),
            invalidatesTags: [API_TAGS.service_logs],
            onQueryStarted(_, { queryFulfilled }) {
                handleRequest({
                    queryFulfilled,
                    loading: 'Deleting Service Log',
                    success: 'Service Log deleted'
                });
            }
        })
    })
});

export default ServiceLogsGrpcService;
