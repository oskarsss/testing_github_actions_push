import { MouseEvent, useMemo } from 'react';
import { hookFabric } from '@/utils/dialog-hook-fabric';
import { Dialog } from '@mui/material';
import themeConfig from '@/configs/themeConfig';
import SendCriticalNotificationHeader from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/components/SendCriticalNotificationHeader';
import { useAppSelector } from '@/store/hooks';
import { useDriverDevices } from '@/store/fleet/drivers/hooks';
import AppNotInstalled from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/components/SendCriticalNotificationErrors/AppNotInstalled';
import AppNotInstalledAndWithoutPhone from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/components/SendCriticalNotificationErrors/AppNotInstalledAndWithoutPhone';
import SendCriticalNotificationAlarm from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/components/SendCriticalNotificationAlarm/SendCriticalNotificationAlarm';
import SendCriticalNotificationMain from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/components/SendCriticalNotificationMain/SendCriticalNotificationMain';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { useDriverById } from '@/store/storage/drivers/hooks/common';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';
import FeatureNotEnabled from './components/SendCriticalNotificationErrors/FeatureNotEnabled';

export const useSendCriticalNotificationDialog = hookFabric(SendCriticalNotification, (props) => {
    const step = useAppSelector((state) => state.drivers.critical_notification.step);
    const handleClose = (e: MouseEvent<HTMLElement>, reason: string) => {
        if (reason === 'backdropClick' && step === 1) {
            return;
        }
        props.onClose();
    };

    return (
        <Dialog
            keepMounted
            open={props.open}
            TransitionProps={{
                timeout : themeConfig.dialogTransitionTimeout,
                onExited: () => props.onExited?.()
            }}
            onClose={handleClose}
            sx={{
                '& .MuiDialog-container': {
                    position      : 'relative',
                    display       : 'flex',
                    justifyContent: 'center',
                    alignItems    : 'center'
                },
                '.MuiDialog-paper': {
                    width   : '800px',
                    maxWidth: 'fit-content'
                }
            }}
        >
            {props.children}
        </Dialog>
    );
});

export type PropsOnlyId = {
    id: string;
};

export default function SendCriticalNotification({ id }: PropsOnlyId) {
    const step = useAppSelector((state) => state.drivers.critical_notification.step);
    const devicesRequest = useDriverDevices(id);
    const driverRequest = useDriverById(id);
    const driversIsLoading = useAppSelector(DriversDataSelectors.getIsLoading);
    const feature_not_enabled = useMemo(
        () => devicesRequest.devices.some((device) => device.criticalNotificationsEnabled),
        [devicesRequest.devices]
    );

    if (devicesRequest.isLoading || driversIsLoading) {
        return (
            <Preloader
                sx={{
                    height: '640px',
                    width : '640px'
                }}
            />
        );
    }

    if (!driverRequest) return null;

    if (!driverRequest.phoneNumber && !devicesRequest.devices.length) {
        return <AppNotInstalledAndWithoutPhone id={id} />;
    }

    if (driverRequest.phoneNumber && !devicesRequest.devices.length) {
        return (
            <AppNotInstalled
                id={id}
                is_phone_exist={!!driverRequest.phoneNumber}
            />
        );
    }

    if (!feature_not_enabled) {
        return (
            <FeatureNotEnabled
                driver_id={id}
                first_name={driverRequest.firstName}
            />
        );
    }

    return (
        driverRequest &&
        devicesRequest.devices && (
            <>
                <SendCriticalNotificationHeader />

                {step === 0 ? (
                    <SendCriticalNotificationMain id={id} />
                ) : (
                    <SendCriticalNotificationAlarm id={id} />
                )}
            </>
        )
    );
}
