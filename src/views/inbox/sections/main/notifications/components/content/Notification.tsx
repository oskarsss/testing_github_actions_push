import { isEqual } from 'lodash';
import { memo, useMemo } from 'react';
import {
    type NotificationModel_Notification,
    NotificationModel_NotificationEntityType
} from '@proto/models/model_notification';
import NotificationsGrpcService from '@/@grpcServices/services/notifications/notifications.service';
import { Stack, Typography } from '@mui/material';
import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useDispatch } from 'react-redux';
import { NotificationsActions, NotificationsSelectors } from '@/store/notifications/slice';
import { useAppSelector } from '@/store/hooks';
import NotificationAvatar from './NotificationAvatar';
import NotificationCreatedAt from './NotificationCreatedAt';

type Props = {
    notification: NotificationModel_Notification;
};

function Notification({ notification }: Props) {
    const manifests = useAppSelector((state) => state.manifests.liveMode.rows);
    const { t } = useAppTranslation();
    const dispatch = useDispatch();
    const selectedNotification = useAppSelector(NotificationsSelectors.getSelectedNotification);
    const [markAsRead] = NotificationsGrpcService.useMarkAsReadNotificationMutation();

    const isOrderNotification =
        notification.entityType === NotificationModel_NotificationEntityType.ORDER;

    const { data: loadData } = LoadsGrpcService.useGetLoadQuery(
        {
            loadId: notification.entityId
        },
        {
            skip: !isOrderNotification
        }
    );

    const manifest = useMemo(
        () => manifests.find((manifest) => manifest.manifestId === notification.entityId),
        [manifests, notification.entityId]
    );

    const handleMarkAsRead = () => {
        dispatch(NotificationsActions.SelectNotification(notification));
        if (notification.isRead) return;
        markAsRead({ notificationIds: [notification.notificationId] });
    };

    return (
        <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
            gap="16px"
            marginLeft="3px"
            padding="2px"
            onClick={handleMarkAsRead}
            sx={{
                cursor: 'pointer',

                '&:last-child': {
                    paddingBottom: '10px'
                }
            }}
        >
            <Stack
                overflow="hidden"
                justifyContent="space-between"
                gap="16px"
                direction="row"
                alignItems="flex-end"
                padding="4px 16px"
                sx={{
                    ...(selectedNotification?.notificationId === notification.notificationId && {
                        background  : ({ palette }) => palette.semantic.foreground.chinquary,
                        borderRadius: '6px'
                    })
                }}
            >
                <Stack
                    direction="row"
                    gap="8px"
                    alignItems="center"
                    overflow="hidden"
                >
                    <NotificationAvatar
                        notification={notification}
                        isOrderNotification={isOrderNotification}
                    />

                    <Stack overflow="hidden">
                        <Stack
                            direction="row"
                            alignItems="center"
                            spacing={1}
                            overflow="hidden"
                        >
                            <Typography
                                component="span"
                                fontWeight={600}
                                sx={{
                                    ...(!notification.isRead && {
                                        background: ({ palette }) =>
                                            palette.semantic.foreground.brand.primary,
                                        width       : '8px',
                                        height      : '8px',
                                        borderRadius: '50%'
                                    })
                                }}
                            />
                            <Typography
                                variant="body1"
                                fontSize="14px"
                                fontWeight={500}
                                sx={{
                                    color: ({ palette }) =>
                                        notification.isRead
                                            ? palette.semantic.text.secondary
                                            : palette.semantic.text.primary
                                }}
                            >
                                {t(
                                    `common:${
                                        isOrderNotification ? 'loads' : 'manifests'
                                    }.friendlyId`,
                                    {
                                        friendlyId: isOrderNotification
                                            ? loadData?.load?.friendlyId
                                            : manifest?.friendlyId
                                    }
                                )}
                            </Typography>
                        </Stack>

                        <Typography
                            variant="body1"
                            fontSize="14px"
                            fontWeight={400}
                            noWrap
                            textOverflow="ellipsis"
                            sx={{
                                color: ({ palette }) =>
                                    notification.isRead
                                        ? palette.semantic.text.disabled
                                        : palette.semantic.text.primary
                            }}
                        >
                            {notification.body}
                        </Typography>
                    </Stack>
                </Stack>

                <NotificationCreatedAt notificationCreatedAt={notification.createdAt} />
            </Stack>
        </Stack>
    );
}

export default memo(Notification, isEqual);
