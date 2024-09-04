import { memo, useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { NotificationsSelectors } from '@/store/notifications/slice';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ERROR_SCREEN_ICONS from '@/@core/ui-kits/error-screen/error-screen-icons';
import NotificationIcons from '@/@core/icons/all-icons/notification';

function EmptyState() {
    const { t } = useAppTranslation();
    const notifications = useAppSelector(NotificationsSelectors.getNotifications);

    const countOfUnreadNotifications = useMemo(
        () => notifications.filter((notification) => !notification.isRead).length,
        [notifications]
    );

    return (
        <Stack
            flex={2}
            height="100%"
            alignItems="center"
            justifyContent="center"
            position="relative"
            borderLeft="1px solid"
            borderColor="semantic.border.secondary"
        >
            <ERROR_SCREEN_ICONS.SquaresBackgroundIcon />
            <NotificationIcons.EmptyState />

            <Typography
                variant="h6"
                fontWeight={600}
                zIndex={1}
            >
                {t('notifications:empty_state.unread_notifications', {
                    count: countOfUnreadNotifications
                })}
            </Typography>
        </Stack>
    );
}

export default memo(EmptyState);
