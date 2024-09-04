import {
    SettingsNotificationBrokerUserGetReply,
    SettingsNotificationBrokerUserGetRequest,
    SettingsNotificationBrokerUserUpdateReply,
    SettingsNotificationBrokerUserUpdateRequest,
    SettingsNotificationCustomerUserGetReply,
    SettingsNotificationCustomerUserGetRequest,
    SettingsNotificationCustomerUserUpdateReply,
    SettingsNotificationCustomerUserUpdateRequest,
    SettingsNotificationGetReply,
    SettingsNotificationGetRequest,
    SettingsNotificationUserUpdateReply,
    SettingsNotificationUserUpdateRequest
} from '@proto/settings_notification';
import { SettingsNotificationServiceClient } from '@proto/settings_notification.client';
import { updateNotification } from '@/@grpcServices/services/notifications/utils';
import { handleRequest } from '@/store/api';
import grpcTransport from '../../grpcTransport';
import grpcAPI from '../../api';
import { createPrivateQueryFn } from '../../createQueryFn';

const Client = new SettingsNotificationServiceClient(grpcTransport);

const NotificationsSettingsGrpcService = grpcAPI.injectEndpoints({
    endpoints: ({
        mutation,
        query
    }) => ({
        getNotificationsSettings: query<
            SettingsNotificationGetReply,
            SettingsNotificationGetRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'settingsNotificationGet')
        }),
        getBrokerNotificationsSettings: query<
            SettingsNotificationBrokerUserGetReply,
            SettingsNotificationBrokerUserGetRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'settingsNotificationBrokerUserGet')
        }),
        getCustomerNotificationsSettings: query<
            SettingsNotificationCustomerUserGetReply,
            SettingsNotificationCustomerUserGetRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'settingsNotificationCustomerUserGet')
        }),

        updateNotificationSettingsBrokerUser: mutation<
            SettingsNotificationBrokerUserUpdateReply,
            SettingsNotificationBrokerUserUpdateRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'settingsNotificationBrokerUserUpdate'),
            async onQueryStarted(args, {
                dispatch,
                queryFulfilled
            }) {
                const patchResult = dispatch(
                    NotificationsSettingsGrpcService.util.updateQueryData(
                        'getBrokerNotificationsSettings',
                        {
                            userId  : args.userId,
                            brokerId: args.brokerId
                        },
                        (draft) => {
                            updateNotification(draft.settings, args.settings);
                        }
                    )
                );

                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating user notification type',
                    success: 'User notification type was updated',
                    onError: () => {
                        patchResult.undo();
                    }
                });
            }
        }),

        updateNotificationSettingsCustomerUser: mutation<
            SettingsNotificationCustomerUserUpdateReply,
            SettingsNotificationCustomerUserUpdateRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'settingsNotificationCustomerUserUpdate'),
            async onQueryStarted(args, {
                dispatch,
                queryFulfilled
            }) {
                const patchResult = dispatch(
                    NotificationsSettingsGrpcService.util.updateQueryData(
                        'getCustomerNotificationsSettings',
                        {
                            userId    : args.userId,
                            customerId: args.customerId
                        },
                        (draft) => {
                            updateNotification(draft.settings, args.settings);
                        }
                    )
                );

                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating user notification type',
                    success: 'User notification type was updated',
                    onError: () => {
                        patchResult.undo();
                    }
                });
            }
        }),

        updateNotificationSettingsUser: mutation<
            SettingsNotificationUserUpdateReply,
            SettingsNotificationUserUpdateRequest
        >({
            queryFn: createPrivateQueryFn(Client, 'settingsNotificationUserUpdate'),
            async onQueryStarted(args, {
                dispatch,
                queryFulfilled
            }) {
                const patchResult = dispatch(
                    NotificationsSettingsGrpcService.util.updateQueryData(
                        'getNotificationsSettings',
                        {},
                        (draft) => {
                            updateNotification(draft.settings, args.settings);
                        }
                    )
                );

                await handleRequest({
                    queryFulfilled,
                    loading: 'Updating user notification type',
                    success: 'User notification type was updated',
                    onError: () => {
                        patchResult.undo();
                    }
                });
            }
        })
    })
});

export default NotificationsSettingsGrpcService;
