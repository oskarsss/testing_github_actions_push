import NotificationsSettingsGrpcService from '@/@grpcServices/services/notifications/notifications-settings.service';
import { useStableArray } from '@/hooks/useStable';
import { useMemo } from 'react';
import Header from '@/views/settings/components/Header/SettingsHeader';
import { Stack } from '@mui/material';
import {
    type NotificationModel_NotificationSetting,
    NotificationModel_NotificationSettingsCategory
} from '@proto/models/model_notification';
import { ManifestsIcon, OrderIcon } from '@/@core/icons/custom-nav-icons/icons';
import { useAccount } from '@/store/app/hooks';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';
import { SettingsNotificationUpdate } from '@proto/settings_notification';
import CategoryWithNotifications from '@/views/settings/tabs/notifications/CategoryWithNotifications';
import NotificationEnabledType from '@/@core/components/notifications/NotificationEnabledType';
import Container from '../../components/Container/Container';
import SettingIcons from '../../icons/icons';

type NotificationByCategory = Record<
    'orders' | 'manifests' | 'others',
    NotificationModel_NotificationSetting[]
>;

export default function NotificationSettingsView() {
    const { user } = useAccount();
    const [updateSettingsNotification] =
        NotificationsSettingsGrpcService.useUpdateNotificationSettingsUserMutation();
    const { data } = NotificationsSettingsGrpcService.useGetNotificationsSettingsQuery({});

    const list = useStableArray(data?.settings);

    const notificationsByCategory = useMemo(
        () =>
            list.reduce(
                (acc: NotificationByCategory, item) => {
                    if (item.category === NotificationModel_NotificationSettingsCategory.ORDER) {
                        acc.orders.push(item);
                    }
                    if (item.category === NotificationModel_NotificationSettingsCategory.MANIFEST) {
                        acc.manifests.push(item);
                    }
                    if (item.category === NotificationModel_NotificationSettingsCategory.OTHER) {
                        acc.others.push(item);
                    }

                    return acc;
                },
                {
                    orders   : [],
                    manifests: [],
                    others   : []
                }
            ),
        [list]
    );

    if (!user || !data?.settings) return null;

    const handleUpdate = (settings: SettingsNotificationUpdate[]) =>
        updateSettingsNotification({ userId: user.userId, settings });

    return (
        <Container>
            <Header
                title="settings:navigation.my_account.notifications"
                icon={<SettingIcons.NotificationIcon />}
            >
                <NotificationEnabledType />
            </Header>

            <Stack
                gap="32px"
                borderTop="1px solid"
                borderColor="semantic.border.secondary"
                paddingTop="16px"
                overflow="auto"
                sx={(theme) => ({ ...getScrollBarStyles(theme) })}
            >
                <CategoryWithNotifications
                    title="settings:notifications.categories.order"
                    category="order"
                    icon={<OrderIcon />}
                    notifications={notificationsByCategory.orders}
                    onHandleUpdate={handleUpdate}
                />

                <CategoryWithNotifications
                    title="settings:notifications.categories.manifest"
                    category="manifest"
                    icon={<ManifestsIcon />}
                    notifications={notificationsByCategory.manifests}
                    onHandleUpdate={handleUpdate}
                />

                <CategoryWithNotifications
                    title="settings:notifications.categories.other"
                    category="other"
                    icon={<SettingIcons.OtherIcon />}
                    notifications={notificationsByCategory.others}
                    onHandleUpdate={handleUpdate}
                />
            </Stack>
        </Container>
    );
}
