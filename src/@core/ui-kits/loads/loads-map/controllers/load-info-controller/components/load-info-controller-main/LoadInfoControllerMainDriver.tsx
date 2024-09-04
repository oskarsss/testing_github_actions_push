import OverviewDriverAvatar from '@/@core/components/overview-driver-avatar/OverviewDriverAvatar';
import { Tooltip, Stack, Typography } from '@mui/material';
import { useLastDriverLocation, useLastDriverPing } from '@/store/streams/events/hooks';
import { formatPhoneNumber } from '@/utils/formatting';
import VectorIcons from '@/@core/icons/vector_icons';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { FlyToPoint } from '@/views/dispatch/tracking/map';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import LoadInfoControllerFleetLocationBtn from './LoadInfoControllerLocationBtn';
import LoadInfoControllerFleetSkeleton from './LoadInfoControllerMainSkeleton';

type Props = {
    driverId: string;
    flyToPoint: FlyToPoint;
};

export default function LoadInfoControllerMainDriver({
    driverId,
    flyToPoint
}: Props) {
    const driversMap = useDriversMap();

    const { t } = useAppTranslation('common');
    const ping = useLastDriverPing(driverId);
    const location = useLastDriverLocation(driverId);

    if (!Object.keys(driversMap).length) {
        return (
            <LoadInfoControllerFleetSkeleton>
                <LoadInfoControllerFleetLocationBtn
                    location={location}
                    flyToPoint={flyToPoint}
                />
            </LoadInfoControllerFleetSkeleton>
        );
    }

    const driver = driversMap[driverId];
    if (!driver) return null;

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="12px"
            justifyContent="space-between"
            overflow="hidden"
            width="100%"
            height="38px"
            flex={1}
        >
            <Stack
                overflow="hidden"
                direction="row"
                alignItems="center"
                height="100%"
                gap="4px"
            >
                <OverviewDriverAvatar
                    fullName={`${driver?.firstName || ''} ${driver?.lastName || ''}`}
                    selfieThumbUrl={driver.selfieThumbUrl}
                    driverTypeId={driver.driverTypeId}
                    slots={{
                        avatarProps: {
                            sx: {
                                width : '32px',
                                height: '32px'
                            }
                        }
                    }}
                />

                <Stack
                    direction="column"
                    overflow="hidden"
                >
                    <Typography
                        fontSize="12px"
                        fontWeight={600}
                        lineHeight={1.5}
                        color={(theme) => theme.palette.semantic.text.primary}
                        noWrap
                    >
                        {`${driver.firstName} ${driver.lastName}`}
                    </Typography>

                    <Stack
                        flexDirection="row"
                        alignItems="center"
                        overflow="hidden"
                        mt="-2px"
                    >
                        {!ping && (
                            <Tooltip title={t('tooltips.not_using_the_app')}>
                                <Stack>
                                    <VectorIcons.PhoneCrossMarkIcon sx={{ fontSize: '13px' }} />
                                </Stack>
                            </Tooltip>
                        )}

                        <Typography
                            fontSize="12px"
                            fontWeight={500}
                            lineHeight={1.5}
                            color={(theme) => theme.palette.semantic.text.secondary}
                            noWrap
                        >
                            {driver.phoneNumber ? formatPhoneNumber(driver.phoneNumber) : '-'}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>

            <LoadInfoControllerFleetLocationBtn
                location={location}
                flyToPoint={flyToPoint}
            />
        </Stack>
    );
}
