import { useAppSelector } from '@/store/hooks';
import { NotificationsSelectors } from '@/store/notifications/slice';
import { Stack } from '@mui/material';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';
import Notification from './Notification';

export default function Content() {
    const notifications = useAppSelector(NotificationsSelectors.getNotifications);

    return (
        <Stack
            height="100%"
            sx={(theme) => ({
                overflowX: 'auto',
                ...getScrollBarStyles(theme)
            })}
        >
            {notifications.map((notification) => (
                <Notification
                    key={notification.notificationId}
                    notification={notification}
                />
            ))}
        </Stack>
    );
}
