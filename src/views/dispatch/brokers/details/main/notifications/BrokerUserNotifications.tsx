import { memo } from 'react';
import NotificationsSettingsGrpcService from '@/@grpcServices/services/notifications/notifications-settings.service';
import { useStableArray } from '@/hooks/useStable';
import type { SettingsNotificationUpdate } from '@proto/settings_notification';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import UserNotification from '@/@core/components/notifications';

type Props = {
    userId: string;
    brokerId: string;
    selfieThumbUrl: string;
    fullName: string;
};

function BrokerUserNotifications({
    userId,
    brokerId,
    selfieThumbUrl,
    fullName
}: Props) {
    const { url } = usePrivateFileUrl(selfieThumbUrl);
    const { data } = NotificationsSettingsGrpcService.useGetBrokerNotificationsSettingsQuery(
        {
            userId,
            brokerId
        },
        {
            skip: !brokerId || !userId
        }
    );
    const [updateUserNotification] =
        NotificationsSettingsGrpcService.useUpdateNotificationSettingsBrokerUserMutation();

    const notifications = useStableArray(data?.settings);

    const handleUpdate = (settings: SettingsNotificationUpdate[]) =>
        updateUserNotification({
            userId,
            brokerId,
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

export default memo(BrokerUserNotifications);
