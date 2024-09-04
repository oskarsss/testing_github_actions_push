import { useAppSelector } from '@/store/hooks';
import { NotificationsSelectors } from '@/store/notifications/slice';
import NotificationsGrpcService from '@/@grpcServices/services/notifications/notifications.service';
import VectorIcons from '@/@core/icons/vector_icons';
import { Button, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export default function MarkAllAsReadButton() {
    const { t } = useAppTranslation();
    const notifications = useAppSelector(NotificationsSelectors.getNotifications);
    const [markAsRead] = NotificationsGrpcService.useMarkAsReadNotificationMutation();
    const notificationIds = notifications.map((notification) => notification.notificationId);

    const handleMarkAllAsRead = () => {
        markAsRead({ notificationIds });
    };

    const isDisabled = notifications.every((notification) => notification.isRead);

    return (
        <Button
            variant="text"
            onClick={handleMarkAllAsRead}
            disabled={isDisabled}
            color="primary"
            startIcon={(
                <VectorIcons.Notifications.Notification
                    sx={{
                        width : '16px',
                        height: '16px',
                        fill  : ({ palette }) =>
                            !isDisabled
                                ? palette.semantic.foreground.brand.primary
                                : palette.semantic.foreground.disabled
                    }}
                />
            )}
            sx={{
                '& .MuiButton-startIcon': {
                    marginRight: '4px'
                }
            }}
        >
            <Typography
                variant="body1"
                fontWeight={500}
                fontSize="12px"
                color={!isDisabled ? 'semantic.text.brand.primary' : 'semantic.text.disabled'}
            >
                {t('notifications:buttons.mark_all_as_read')}
            </Typography>
        </Button>
    );
}
