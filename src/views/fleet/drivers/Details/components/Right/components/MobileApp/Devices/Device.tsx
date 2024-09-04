import Stack from '@mui/material/Stack';
import MobileAppIcons from '@/views/fleet/drivers/Details/components/Right/components/MobileApp/mobile_app_icons';
import Typography from '@mui/material/Typography';
import RightStyled from '@/views/fleet/drivers/Details/components/Right/styled';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { latestActivity } from '@/@core/ui-kits/page-headers/components/AvatarGroup/utils';
import { useSettings } from '@/store/settings/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';

type Props = {
    os: string;
    model: string;
    app_version: string;
    ping_timestamp: number;
};

export default function Device({
    os,
    model,
    app_version,
    ping_timestamp
}: Props) {
    const { driverPpp } = useSettings();
    const { t } = useAppTranslation();

    if (!driverPpp) {
        return null;
    }

    const {
        androidAppVersion,
        iosAppVersion
    } = driverPpp;

    const last_seen = latestActivity(ping_timestamp, t);

    const change_model_title = model.split('_').join(' ');

    return (
        <RightStyled.Device expandIcon={<ExpandMoreIcon />}>
            <Stack
                flexDirection="row"
                alignItems="center"
                gap="8px"
            >
                <Stack>
                    {((os.toLowerCase() === 'ios' && iosAppVersion) ||
                        (os.toLowerCase() === 'android' && androidAppVersion)) === app_version ? (
                            <MobileAppIcons.UpToDateVersionIcon />
                        ) : (
                            <MobileAppIcons.OutdatedVersionIcon />
                        )}
                </Stack>
                <Typography>{change_model_title}</Typography>
            </Stack>

            <RightStyled.PartnerOnline>
                <RightStyled.Marker current={last_seen === 'online'} />
                {last_seen}
            </RightStyled.PartnerOnline>
        </RightStyled.Device>
    );
}
