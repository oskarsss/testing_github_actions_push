import LeftStyled from '@/views/fleet/drivers/Details/components/Left/styled';
import { Tooltip } from '@mui/material';
import { applyTestId, TestIDs } from '@/configs/tests';
import VectorIcons from '@/@core/icons/vector_icons';
import Typography from '@mui/material/Typography';
import DriverProfileAvatar from '@/views/fleet/drivers/Details/components/Left/components/DriverProfileAvatar/DriverProfileAvatar';
import EditIcon from '@mui/icons-material/Edit';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { useEditDriverDialog } from '@/views/fleet/drivers/dialogs/EditDriver/EditDriver';
import { useSendCriticalNotificationDialog } from '@/views/fleet/drivers/Details/dialogs/SendCriticalNotification/SendCriticalNotification';
import { useEffect } from 'react';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import DriversTypes from '@/store/fleet/drivers/types';
import { DriverModel_Driver } from '@proto/models/model_driver';

type Props = {
    driver: DriverModel_Driver;
};

export default function DriverProfileHeaderTopContent({ driver }: Props) {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();
    const { isShow } = useAppSelector((state) => state.drivers);

    const editDriverDialog = useEditDriverDialog();
    const sendCriticalNotificationDialog = useSendCriticalNotificationDialog();

    const openSendCriticalNotificationDialog = () => {
        sendCriticalNotificationDialog.open({
            id: driver.driverId
        });
    };

    const editDriver = () => {
        editDriverDialog.open({
            driver_id: driver.driverId
        });
    };

    useEffect(() => {
        if (isShow) {
            editDriver();
        }

        return () => {
            dispatch(DriverActions.isShowEditDriverDialog(false));
        };
    }, [isShow]);

    return (
        <LeftStyled.Header>
            <LeftStyled.Buttons>
                <Tooltip
                    title={t('drivers:profile.left.header.critical_notification.tooltip')}
                    placement="top"
                >
                    <LeftStyled.IconButton
                        color="primary"
                        onClick={openSendCriticalNotificationDialog}
                        {...applyTestId(TestIDs.pages.driverProfile.buttons.criticalNotification)}
                    >
                        <VectorIcons.DetailsIcons.CriticalNotification
                            sx={{
                                fontSize: '24px',
                                color   : (theme) => theme.palette.utility.foreground.error.primary
                            }}
                        />
                    </LeftStyled.IconButton>
                </Tooltip>

                <Typography
                    variant="body1"
                    fontWeight={500}
                >
                    {t('drivers:profile.left.header.critical_notification.title')}
                </Typography>
            </LeftStyled.Buttons>

            <DriverProfileAvatar driver={driver} />

            <LeftStyled.Buttons>
                <LeftStyled.IconButton
                    color="primary"
                    onClick={editDriver}
                    {...applyTestId(TestIDs.pages.driverProfile.buttons.edit)}
                >
                    <EditIcon color="primary" />
                </LeftStyled.IconButton>

                <Typography
                    variant="body1"
                    fontWeight={500}
                >
                    {t('common:button.edit')}
                </Typography>
            </LeftStyled.Buttons>
        </LeftStyled.Header>
    );
}
