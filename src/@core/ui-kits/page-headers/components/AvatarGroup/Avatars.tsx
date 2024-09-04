import { memo, MouseEvent } from 'react';

import Tooltip from '@/@core/ui-kits/page-headers/components/AvatarGroup/Tooltip';
import TooltipMUI from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';

import { useUsersOnlineMenu } from '@/@core/ui-kits/page-headers/components/AvatarGroup/UsersOnlineMenu';
import { useUsersPings } from '@/store/streams/events/hooks';
import moment from 'moment-timezone';
import { Skeleton, Stack } from '@mui/material';
import Fade from '@mui/material/Fade';
import { useUsersMap } from '@/store/hash_maps/hooks';
import { getAvatarProps } from '@/utils/get-avatar-props';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { AvatarGroup, BadgeOnlineContainer } from './styled';

const MAX_AVATARS = 3;

/**
 * shows all users, avatars, name, last time they were online
 */
const Avatars = () => {
    const { t } = useAppTranslation();
    const users_pings = useUsersPings();
    const users = useUsersMap();

    const usersOnlineMenu = useUsersOnlineMenu();

    const openUsersMenu = (event: MouseEvent<HTMLElement>) => {
        usersOnlineMenu.open({})({ ...event, clientY: 64 });
    };

    if (!users_pings.length || !Object.keys(users).length) {
        return (
            <Stack direction="row">
                {Array(MAX_AVATARS + 1)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton
                            variant="circular"
                            width={40}
                            height={40}
                            // eslint-disable-next-line react/no-array-index-key
                            key={index}
                            sx={{
                                marginLeft: '-4px'
                            }}
                        />
                    ))}
            </Stack>
        );
    }

    return (
        <Fade
            in
            timeout={500}
        >
            <AvatarGroup onClick={openUsersMenu}>
                {users_pings.slice(0, MAX_AVATARS).map((ping) => {
                    const item = users[ping.userId];
                    const isOnline = Date.now() - ping.timestamp < 1000 * 60 * 3;
                    const online_age = moment(ping.timestamp).fromNow(true);
                    if (!item) return null;
                    return (
                        <Tooltip
                            fullName={`${item.firstName} ${item.lastName}`}
                            selfie={item.selfieThumbUrl}
                            isOnline={isOnline}
                            onlineAge={online_age}
                            key={item.userId}
                        >
                            <BadgeOnlineContainer
                                isOnline={isOnline}
                                key={item.userId}
                            >
                                <Avatar
                                    {...getAvatarProps(
                                        `${item.firstName} ${item.lastName}`,
                                        item.selfieThumbUrl
                                    )}
                                />
                            </BadgeOnlineContainer>
                        </Tooltip>
                    );
                })}
                {users_pings.length > MAX_AVATARS && (
                    <TooltipMUI title={t('core:basic.page_headers.avatars.tooltips.contact')}>
                        <Avatar
                            sx={{
                                cursor   : 'pointer',
                                '&:hover': {
                                    opacity: 0.8
                                }
                            }}
                        >
                            {`+${users_pings.length - MAX_AVATARS}`}
                        </Avatar>
                    </TooltipMUI>
                )}
            </AvatarGroup>
        </Fade>
    );
};

export default memo(Avatars);
