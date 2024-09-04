import { Avatar, Stack, Typography } from '@mui/material';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { memo } from 'react';

type Props = {
    selfieThumbUrl: string;
    firstName: string;
    lastName: string;
};

function DriverTooltipItem({
    selfieThumbUrl,
    firstName,
    lastName
}: Props) {
    const { url } = usePrivateFileUrl(selfieThumbUrl);
    const driverFirstName = firstName?.split(' ')[0];
    const driverLastName = lastName?.split(' ')[1];
    const fullName = `${firstName || ''} ${lastName || ''}`;

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="4px"
        >
            <Avatar
                alt={fullName}
                src={url}
                sx={{
                    width   : '16px',
                    height  : '16px',
                    fontSize: '11px'
                }}
            >
                {driverFirstName && driverFirstName?.charAt(0).toUpperCase()}
                {driverLastName && driverLastName?.charAt(0).toUpperCase()}
                {!driverFirstName && !driverLastName && 'N/A'}
            </Avatar>

            <Typography
                variant="body1"
                fontSize="12px"
                fontWeight={500}
            >
                {fullName}
            </Typography>
        </Stack>
    );
}

export default memo(DriverTooltipItem);
