import {
    NotificationGetReply,
    NotificationGetRequest,
    NotificationMarkAsReadReply,
    NotificationMarkAsReadRequest,
    NotificationRetrieveReply,
    NotificationRetrieveRequest
} from '@proto/notification';
import { NotificationServiceClient } from '@proto/notification.client';
import { NotificationsActions } from '@/store/notifications/slice';
import toast from 'react-hot-toast';
import grpcTransport from '../../grpcTransport';
import grpcAPI from '../../api';
import { createPrivateQueryFn } from '../../createQueryFn';

const Client = new NotificationServiceClient(grpcTransport);

const NotificationsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getNotifications: query<NotificationGetReply, NotificationGetRequest>({
            queryFn          : createPrivateQueryFn(Client, 'notificationGet'),
            keepUnusedDataFor: 0
        }),

        retrieveNotification: query<NotificationRetrieveReply, NotificationRetrieveRequest>({
            queryFn: createPrivateQueryFn(Client, 'notificationRetrieve')
        }),

        markAsReadNotification: mutation<
            NotificationMarkAsReadReply,
            NotificationMarkAsReadRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'notificationMarkAsRead'),
            onQueryStarted(args, {
                dispatch,
                queryFulfilled
            }) {
                queryFulfilled
                    ?.then(() => {
                        dispatch(NotificationsActions.MarkAsReadNotification(args.notificationIds));
                    })
                    .catch((e) => {
                        toast.error(e.error.message, {
                            position: 'top-right'
                        });
                    });
            }
        })
    })
});

export default NotificationsGrpcService;
