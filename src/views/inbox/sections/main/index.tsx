import { Stack } from '@mui/material';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { useAppDispatch } from '@/store/hooks';
import { NotificationsActions } from '@/store/notifications/slice';
import NotificationsGrpcService from '@/@grpcServices/services/notifications/notifications.service';
import { useEffect } from 'react';
import Notification from './notification';
import Notifications from './notifications';
import Header from './header';

export default function InboxView() {
    const dispatch = useAppDispatch();
    const { isLoading } = NotificationsGrpcService.endpoints.getNotifications.useQueryState({});

    useEffect(
        () => () => {
            dispatch(NotificationsActions.SelectNotification(null));
        },
        []
    );

    if (isLoading) {
        return <Preloader />;
    }

    return (
        <Stack
            direction="row"
            margin={0}
            height="100%"
            position="relative"
            overflow="hidden"
        >
            <Stack
                height="100%"
                overflow="hidden"
                flex={1}
                gap="12px"
            >
                <Header />

                <Notifications />
            </Stack>

            <Notification />
        </Stack>
    );
}
