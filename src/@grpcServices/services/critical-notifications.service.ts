import { CriticalNotificationServiceClient } from '@proto/critical_notifications.client';
import {
    CriticalNotificationsClearReply,
    CriticalNotificationsClearRequest,
    CriticalNotificationSendRequest,
    CriticalNotificationSendReply,
    CriticalNotificationsGetRequest,
    CriticalNotificationsGetReply
} from '@proto/critical_notifications';
import { handleRequest, invalidateTags, providesList } from '@/store/api';
import grpcTransport from '../grpcTransport';
import grpcAPI from '../api';
import { createPrivateQueryFn } from '../createQueryFn';

const Client = new CriticalNotificationServiceClient(grpcTransport);

const CriticalNotificationGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getCriticalNotifications: query<
            CriticalNotificationsGetReply,
            CriticalNotificationsGetRequest
        >({
            queryFn     : createPrivateQueryFn(Client, 'criticalNotificationsGet'),
            providesTags: (result) =>
                providesList(result?.criticalNotifications, 'critical_notifications')
        }),
        sendCriticalNotification: mutation<
            CriticalNotificationSendReply,
            CriticalNotificationSendRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'criticalNotificationSend'),
            invalidatesTags: (result) => invalidateTags(result, 'critical_notifications'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Sending Critical Notification',
                    success: 'Critical Notification was sent'
                });
            }
        }),
        clearCriticalNotification: mutation<
            CriticalNotificationsClearReply,
            CriticalNotificationsClearRequest
        >({
            queryFn        : createPrivateQueryFn(Client, 'criticalNotificationsClear'),
            invalidatesTags: (result) => invalidateTags(result, 'critical_notifications'),
            async onQueryStarted(arg, { queryFulfilled }) {
                await handleRequest({
                    queryFulfilled,
                    loading: 'Clearing a history',
                    success: 'History was cleared'
                });
            }
        })
    })
});

export default CriticalNotificationGrpcService;
