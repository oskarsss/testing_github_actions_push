import { getPublicURL } from '@/configs/storage';
import type { NotificationModel_Notification } from '@proto/models/model_notification';
import { Avatar, Stack } from '@mui/material';
import { useUsersMap } from '@/store/hash_maps/hooks';
import ManifestDetailsIcons from '@/views/dispatch/manifests/details/icons';
import { memo } from 'react';
import { isEqual } from 'lodash';

type Props = {
    notification: NotificationModel_Notification;
    isOrderNotification: boolean;
};

function NotificationAvatar({
    notification,
    isOrderNotification
}: Props) {
    const user = useUsersMap(notification.fromEntityId);
    const url = getPublicURL(user?.selfieThumbUrl);

    return (
        <Stack position="relative">
            <Avatar
                src={url}
                alt={`${user?.firstName || ''} ${user?.lastName || ''}`}
                sx={{
                    width   : 40,
                    height  : 40,
                    fontSize: '16px'
                }}
            >
                {user?.firstName?.charAt(0).toUpperCase()}
                {user?.lastName?.charAt(0).toUpperCase()}
            </Avatar>

            <Stack
                height="18px"
                width="18px"
                alignItems="center"
                justifyContent="center"
                position="absolute"
                right={0}
                bottom={0}
                border="1px solid"
                borderColor="semantic.foreground.white.secondary"
                borderRadius="50%"
                bgcolor="semantic.foreground.brand.primary"
            >
                {isOrderNotification ? (
                    <ManifestDetailsIcons.Loads
                        sx={{
                            color   : ({ palette }) => palette.semantic.foreground.white.secondary,
                            fontSize: '10px'
                        }}
                    />
                ) : (
                    <ManifestDetailsIcons.Related
                        sx={{
                            color   : ({ palette }) => palette.semantic.foreground.white.secondary,
                            fontSize: '10px'
                        }}
                    />
                )}
            </Stack>
        </Stack>
    );
}

export default memo(NotificationAvatar, isEqual);
