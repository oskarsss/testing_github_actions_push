import { NotificationModel_NotificationSetting } from '@proto/models/model_notification';
import { Stack } from '@mui/material';
import { memo, type ReactNode } from 'react';
import { isEqual } from 'lodash';
import type { IntlMessageKey } from '@/@types/next-intl';
import { SettingsNotificationUpdate } from '@proto/settings_notification';
import Notification from '@/@core/components/notifications/Notification';
import MainNotificationType from '@/@core/components/notifications/MainNotificationType';
import Category from './Category';

type Props = {
    title: IntlMessageKey;
    icon: ReactNode;
    category: 'order' | 'manifest' | 'other';
    notifications: NotificationModel_NotificationSetting[];
    onHandleUpdate: (settings: SettingsNotificationUpdate[]) => Promise<unknown>;
};

function CategoryWithNotifications({
    onHandleUpdate,
    title,
    category,
    icon,
    notifications
}: Props) {
    return (
        <Stack
            direction="row"
            gap="32px"
        >
            <Category
                icon={icon}
                title={title}
            />

            <Stack flex={3}>
                <MainNotificationType
                    title={`common:notifications.titles.${category}`}
                    notifications={notifications}
                    onHandleUpdate={onHandleUpdate}
                />

                {notifications.map((notification) => (
                    <Notification
                        key={notification.notificationType}
                        notification={notification}
                        onHandleUpdate={onHandleUpdate}
                    />
                ))}
            </Stack>
        </Stack>
    );
}

export default memo(CategoryWithNotifications, isEqual);
