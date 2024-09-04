import { memo } from 'react';
import { isEqual } from 'lodash';
import TabContentWrapper from '@/@core/ui-kits/profiles/components/tabs/reusable/TabContentWrapper';
import { Stack, Typography } from '@mui/material';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import VectorIcons from '@/@core/icons/vector_icons';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';
import type { GetCustomerUsersReply_User } from '@proto/customers';
import NotificationEnabledType from '@/@core/components/notifications/NotificationEnabledType';
import UserNotifications from './CustomerUserNotifications';

type Props = {
    customerId: string;
    users: GetCustomerUsersReply_User[];
};

function BrokerUsersNotifications({
    customerId,
    users
}: Props) {
    const { t } = useAppTranslation();

    return (
        <TabContentWrapper>
            <Stack
                direction="row"
                gap="5px"
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack
                    direction="row"
                    gap="10px"
                    alignItems="center"
                >
                    <VectorIcons.NotificationIcon
                        sx={{
                            fill: ({ palette }) => palette.semantic.foreground.brand.primary
                        }}
                    />

                    <Typography
                        fontSize="18px"
                        fontWeight={700}
                        color="semantic.text.primary"
                    >
                        {t('common:profile.center.title.notifications')}
                    </Typography>
                </Stack>

                <NotificationEnabledType />
            </Stack>

            <Stack
                overflow="auto"
                sx={(theme) => ({ ...getScrollBarStyles(theme) })}
            >
                {users.map((user) => (
                    <UserNotifications
                        key={user.userId}
                        customerId={customerId}
                        userId={user.userId}
                        selfieThumbUrl={user.selfieThumbUrl}
                        fullName={`${user.firstName} ${user.lastName}`}
                    />
                ))}
            </Stack>
        </TabContentWrapper>
    );
}

export default memo(BrokerUsersNotifications, isEqual);
