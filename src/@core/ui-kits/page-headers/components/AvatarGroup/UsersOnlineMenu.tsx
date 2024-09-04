import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import React from 'react';
import { styled } from '@mui/material/styles';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import { useUsersMap } from '@/store/hash_maps/hooks';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { getPublicURL } from '@/configs/storage';
import { useUsersPings } from '@/store/streams/events/hooks';
import { Stack } from '@mui/material';
import { latestActivity } from '@/@core/ui-kits/page-headers/components/AvatarGroup/utils';
import Box from '@mui/material/Box';
import { getAvatarProps } from '@/utils/get-avatar-props';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const PerfectScrollbar = styled(PerfectScrollbarComponent)({
    '& .ps__rail-y': {
        width: '6px !important'
    },
    '& .ps__thumb-y': {
        width: '4px !important',
        right: '1px !important'
    }
});

export const useUsersOnlineMenu = menuHookFabric(UsersOnlineMenu);

function UsersOnlineMenu() {
    const usersPings = useUsersPings();
    const { t } = useAppTranslation();

    const users = useUsersMap();

    if (!usersPings || !users) return null;

    return (
        <Stack
            width="280px"
            maxHeight="400px"
            display="flex"
            flexDirection="column"
            overflow="hidden"
        >
            <Typography
                variant="h6"
                fontWeight={700}
                fontSize="16px"
                padding="16px"
            >
                {t('core:basic.page_headers.avatars.contacts')}
            </Typography>
            <PerfectScrollbar
                options={{
                    wheelSpeed      : 1,
                    wheelPropagation: false,
                    suppressScrollX : true
                }}
            >
                <Box
                    component="ul"
                    paddingLeft="16px"
                >
                    {usersPings.map((ping) => {
                        const item = users[ping.userId];
                        const isOnline = Date.now() - ping.timestamp < 1000 * 60 * 3;
                        if (!item) return null;
                        return (
                            <Box
                                component="li"
                                display="flex"
                                flexDirection="row"
                                alignItems="center"
                                gap="10px"
                                padding="8px 0"
                                key={item?.userId || ping.userId}
                            >
                                <Avatar
                                    {...getAvatarProps(
                                        `${item?.firstName} ${item?.lastName}`,
                                        item?.selfieThumbUrl
                                    )}
                                    src={getPublicURL(item?.selfieThumbUrl)}
                                />
                                <Box>
                                    <Typography
                                        fontSize="14px"
                                        fontWeight={500}
                                    >
                                        {`${item?.firstName} ${item?.lastName}`}
                                    </Typography>
                                    <Typography
                                        fontSize="12px"
                                        fontWeight={isOnline ? 500 : 400}
                                        color={(theme) =>
                                            isOnline
                                                ? theme.palette.semantic.border.success.primary
                                                : theme.palette.semantic.text.secondary}
                                    >
                                        {latestActivity(ping.timestamp, t)}
                                    </Typography>
                                </Box>
                            </Box>
                        );
                    })}
                </Box>
            </PerfectScrollbar>
        </Stack>
    );
}
