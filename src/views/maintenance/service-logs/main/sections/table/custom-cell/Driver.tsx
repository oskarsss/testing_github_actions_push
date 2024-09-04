import { memo } from 'react';
import { Avatar, Stack, Typography } from '@mui/material';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { useDriverTypesMap } from '@/store/hash_maps/hooks';
import { DRIVER_TYPE_ICONS } from '@/@core/theme/entities/driver/type';
import { useDriverById } from '@/store/storage/drivers/hooks/common';

type Props = {
    driverId: string;
};

function Driver({ driverId }: Props) {
    const driver = useDriverById(driverId);
    const driverType = useDriverTypesMap(driver?.driverTypeId);
    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl);
    const driverFirstName = driver?.firstName?.split(' ')[0];
    const driverLastName = driver?.lastName?.split(' ')[1];

    if (!driver) {
        return '-';
    }

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="4px"
        >
            <Stack position="relative">
                <Avatar
                    alt={driver ? `${driver.firstName} ${driver.lastName}` : 'N/A'}
                    src={url}
                    sx={{ width: 24, height: 24, fontSize: '8px' }}
                >
                    {driverFirstName && driverFirstName?.charAt(0).toUpperCase()}
                    {driverLastName && driverLastName?.charAt(0).toUpperCase()}
                    {!driverFirstName && !driverLastName && 'N/A'}
                </Avatar>

                {driverType && (
                    <Stack
                        height="10px"
                        width="10px"
                        alignItems="center"
                        position="absolute"
                        bottom={0}
                        right={0}
                    >
                        {DRIVER_TYPE_ICONS[driverType.icon]}
                    </Stack>
                )}
            </Stack>

            <Typography
                variant="body2"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                {`${driver.firstName} ${driver.lastName}`}
            </Typography>
        </Stack>
    );
}

export default memo(Driver);
