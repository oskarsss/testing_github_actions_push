import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

import { Avatar } from '@mui/material';
import React from 'react';
import type { DriverModel_Driver } from '@proto/models/model_driver';

type Props = {
    driver: DriverModel_Driver;
};

export default function DriverAvatar({ driver }: Props) {
    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl);

    return (
        <Avatar
            src={url}
            alt={driver?.firstName}
            sx={{
                fontSize: '14px',
                width   : 36,
                height  : 36
            }}
        >
            {driver?.firstName?.[0] || ''}
            {driver?.lastName?.[0] || ''}
        </Avatar>
    );
}
