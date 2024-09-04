import { memo, useMemo } from 'react';
import CountComponent from '@/layouts/UserLayout/Navigation/components/CountComponents/CountComponent';
import { useAppSelector } from '@/store/hooks';
import { NotificationsSelectors } from '@/store/notifications/slice';
import { useLayoutSettings } from '@/hooks/useLayoutSettings';

function InboxCountComponent() {
    const { settings } = useLayoutSettings();
    const notifications = useAppSelector(NotificationsSelectors.getNotifications);

    const countOfUnreadNotifications = useMemo(
        () => notifications.filter((notification) => !notification.isRead).length,
        [notifications]
    );

    if (settings.navCollapsed) return null;

    return <CountComponent count={countOfUnreadNotifications} />;
}

export default memo(InboxCountComponent);
