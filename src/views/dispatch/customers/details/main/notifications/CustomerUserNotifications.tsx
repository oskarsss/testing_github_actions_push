import { memo } from 'react';
import NotificationsSettingsGrpcService from '@/@grpcServices/services/notifications/notifications-settings.service';
import { useStableArray } from '@/hooks/useStable';
import type { SettingsNotificationUpdate } from '@proto/settings_notification';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import UserNotification from '@/@core/components/notifications';

type Props = {
    userId: string;
    customerId: string;
    selfieThumbUrl: string;
    fullName: string;
};

function CustomerUserNotifications({
    userId,
    customerId,
    selfieThumbUrl,
    fullName
}: Props) {
    const { url } = usePrivateFileUrl(selfieThumbUrl);
    const { data } = NotificationsSettingsGrpcService.useGetCustomerNotificationsSettingsQuery(
        {
            userId,
            customerId
        },
        {
            skip: !customerId || !userId
        }
    );
    const [updateUserNotification] =
        NotificationsSettingsGrpcService.useUpdateNotificationSettingsCustomerUserMutation();

    const notifications = useStableArray(data?.settings);

    const handleUpdate = (settings: SettingsNotificationUpdate[]) =>
        updateUserNotification({
            userId,
            customerId,
            settings
        });

    return (
        <UserNotification
            userId={userId}
            url={url}
            fullName={fullName}
            notifications={notifications}
            onHandleUpdate={handleUpdate}
        />
    );
}

export default memo(CustomerUserNotifications);
