import { Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import List from '@mui/material/List';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    app_version: string;
    os_with_version: string;
};

export default function DeviceDetails({
    app_version,
    os_with_version
}: Props) {
    const { t } = useAppTranslation('drivers');

    return (
        <AccordionDetails
            sx={{
                padding: 0
            }}
        >
            <List disablePadding>
                <RightStyled.DeviceDetailsListItem>
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        fontSize={16}
                    >
                        {t('profile.right.mobile_app.device.app_version')}
                    </Typography>
                    <Typography>{app_version}</Typography>
                </RightStyled.DeviceDetailsListItem>
                <RightStyled.DeviceDetailsListItem>
                    <Typography
                        variant="body2"
                        fontWeight="bold"
                        fontSize={16}
                    >
                        {t('profile.right.mobile_app.device.operating_system')}
                    </Typography>
                    <Typography>{os_with_version}</Typography>
                </RightStyled.DeviceDetailsListItem>
            </List>
        </AccordionDetails>
    );
}
