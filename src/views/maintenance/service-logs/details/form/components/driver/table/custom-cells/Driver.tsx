import { memo } from 'react';
import { useDriverById } from '@/store/storage/drivers/hooks/common';
import { Avatar, Stack, Typography } from '@mui/material';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

type Props = {
    driverId: string;
};

function Driver({ driverId }: Props) {
    const driver = useDriverById(driverId);
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
            <Avatar
                alt={driver ? `${driver.firstName} ${driver.lastName}` : 'N/A'}
                src={url}
                sx={{ width: 24, height: 24, fontSize: '8px' }}
            >
                {driverFirstName && driverFirstName?.charAt(0).toUpperCase()}
                {driverLastName && driverLastName?.charAt(0).toUpperCase()}
                {!driverFirstName && !driverLastName && 'N/A'}
            </Avatar>

            <Typography
                variant="body2"
                fontSize="14px"
                fontWeight={500}
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
