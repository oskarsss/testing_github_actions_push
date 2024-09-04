import SendCriticalNotificationButton from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/components/SendCriticalNotificationButton';
import { useDriverCriticalNotification } from '@/store/fleet/drivers/hooks';
import { PropsOnlyId } from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/SendCriticalNotification';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEffect, useMemo } from 'react';
import { Typography } from '@mui/material';
import CriticalNotificationGrpcService from '@/@grpcServices/services/critical-notifications.service';
import CriticalNotificationStyled from '../../styled';

export default function SendCriticalNotificationActiveSiren({ id }: PropsOnlyId) {
    const dispatch = useAppDispatch();
    const {
        text,
        notification_id
    } = useAppSelector(
        (state) => state.drivers.critical_notification
    );
    const {
        critical_notifications,
        isLoading: isCriticalNotificationLoading
    } =
        useDriverCriticalNotification(id);
    const [clearCriticalNotificationHistory, { isLoading: isClearing }] =
        CriticalNotificationGrpcService.useClearCriticalNotificationMutation();

    const current_notification = useMemo(
        () =>
            critical_notifications.find(
                (notification) => notification_id === notification.notificationId
            ),
        [critical_notifications, notification_id]
    );

    const close = () => {
        dispatch(
            DriverActions.updateCriticalNotification({
                step           : 0,
                text           : '',
                notification_id: ''
            })
        );
    };

    const stop_siren = () => {
        clearCriticalNotificationHistory({ driverId: id }).unwrap().then(close);
    };

    useEffect(() => {
        if (!isCriticalNotificationLoading && current_notification?.confirmed) {
            close();
        }
    }, [current_notification?.confirmed]);

    return (
        <CriticalNotificationStyled.SirenMessageWrapper>
            <CriticalNotificationStyled.SirenMessage>
                <Typography
                    variant="body2"
                    fontSize={16}
                >
                    {text}
                </Typography>
            </CriticalNotificationStyled.SirenMessage>

            <SendCriticalNotificationButton
                submit={stop_siren}
                isLoading={isClearing}
                disabled={isClearing}
                text="modals:drivers.send_critical_notification.stop_button"
            />
        </CriticalNotificationStyled.SirenMessageWrapper>
    );
}
