import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import { Button } from '@mui/material';
import { memo } from 'react';
import DriversTypes from '@/store/fleet/drivers/types';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import AddIcon from '@mui/icons-material/Add';
import Devices from '@/views/fleet/drivers/Details/components/Right/components/MobileApp/Devices/Devices';
import { useInviteDriverDialog } from '@/views/fleet/drivers/dialogs/InviteDriver/InviteDriver';
import { DriverModel_Status } from '@proto/models/model_driver';

type Props = {
    driver: DriversTypes.Driver;
};

const MobileApp = ({ driver }: Props) => {
    const { t } = useAppTranslation();
    const dialog = useInviteDriverDialog();

    const openDialog = () => {
        dialog.open({
            email       : driver.email,
            phone_number: driver.phoneNumber
        });
    };

    return (
        <RightStyled.IconBlock>
            <Box>
                <Typography>{t('drivers:profile.right.mobile_app.title')}</Typography>

                <Button
                    onClick={openDialog}
                    startIcon={<AddIcon />}
                    disabled={driver.status === DriverModel_Status.DELETED}
                >
                    {t('common:actions.invite')}
                </Button>
            </Box>
            <Devices driverId={driver.driverId} />
        </RightStyled.IconBlock>
    );
};

export default memo(MobileApp);
