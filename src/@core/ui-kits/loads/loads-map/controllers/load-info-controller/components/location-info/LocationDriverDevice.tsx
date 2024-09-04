import { Stack, Tooltip, Typography } from '@mui/material';
import LocationComponents from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/location-info/LocationComponents';
import VectorIcons from '@/@core/icons/vector_icons';
import isOnline from '@/utils/is-online';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { getLocationColor } from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/utils';

function isDeviceVersionUpToDate(current_version: string | undefined, device_version: string) {
    if (!current_version) return false;

    const regex = /[^\d]/g;
    const current_version_formatting = current_version.replace(regex, '');
    const device_version_formatting = device_version.replace(regex, '');

    return device_version_formatting >= current_version_formatting;
}

type Props = {
    timeStamp?: number;
    locationLon?: number;
    locationLat?: number;
    locationAddress?: string;
    deviceModel: string;
    deviceOS: string;
    deviceAppVersion: string;
    flyToPoint: (lon: number, lat: number, zoom: number) => void;
    current_version_android: string | undefined;
    current_version_ios: string | undefined;
};
export default function LocationDriverDevice({
    timeStamp,
    locationLat,
    locationLon,
    locationAddress,
    deviceModel,
    deviceOS,
    deviceAppVersion,
    flyToPoint,
    current_version_android,
    current_version_ios
}: Props) {
    const { t } = useAppTranslation('common');

    const is_online = isOnline(timeStamp);
    const location = locationLon && locationLat ? {} : undefined;
    const locationColor = getLocationColor(location, is_online);

    const onClick = () => {
        if (!locationLon || !locationLat) return;
        flyToPoint(locationLon, locationLat, 15);
    };

    const current_version =
        deviceOS.toLowerCase() === 'android' ? current_version_android : current_version_ios;

    const isUpToDateVersion = isDeviceVersionUpToDate(current_version, deviceAppVersion);

    return (
        <Stack
            flexDirection="row"
            gap="inherit"
            height="24px"
            flexGrow={1}
            alignItems="center"
            overflow="hidden"
        >
            <LocationComponents.TitleColumn>
                <Tooltip
                    title={`v${deviceAppVersion} (${
                        isUpToDateVersion ? t('latest') : t('need_update')
                    })`}
                >
                    <Stack flexShrink={0}>
                        {isUpToDateVersion && (
                            <VectorIcons.PhoneCheckMarkIcon sx={{ fontSize: '16px' }} />
                        )}
                        {!isUpToDateVersion && (
                            <VectorIcons.PhoneCrossMarkIcon sx={{ fontSize: '16px' }} />
                        )}
                    </Stack>
                </Tooltip>
                <Typography
                    noWrap
                    variant="body2"
                    fontSize="12px"
                    fontWeight={500}
                    lineHeight={1.5}
                >
                    {deviceModel}
                </Typography>
            </LocationComponents.TitleColumn>
            <LocationComponents.Location
                onClick={onClick}
                color={locationColor}
                disabled={!locationLon || !locationLat}
                location={locationAddress}
            />
            <LocationComponents.Time time={timeStamp} />
        </Stack>
    );
}
