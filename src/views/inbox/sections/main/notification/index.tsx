import { Stack } from '@mui/material';
import { useAppSelector } from '@/store/hooks';
import { NotificationsSelectors } from '@/store/notifications/slice';
import SafetyManifestDetails from '@/views/dispatch/manifests/details';
import { NotificationModel_NotificationEntityType } from '@proto/models/model_notification';
import { useMemo } from 'react';
import Load from './Load';
import EmptyState from './EmptyState';

export default function Notification() {
    const selectedNotification = useAppSelector(NotificationsSelectors.getSelectedNotification);

    const isManifestNotification = useMemo(
        () =>
            selectedNotification?.entityType === NotificationModel_NotificationEntityType.MANIFEST,
        [selectedNotification]
    );

    if (!selectedNotification) {
        return <EmptyState />;
    }

    return (
        <Stack
            flex={2}
            height="100%"
            overflow="hidden"
            borderLeft="1px solid"
            borderColor="semantic.border.secondary"
        >
            {isManifestNotification ? (
                <SafetyManifestDetails manifestId={selectedNotification?.entityId || ''} />
            ) : (
                <Load loadId={selectedNotification?.entityId} />
            )}
        </Stack>
    );
}
