import React from 'react';
import { useLastDriverPing } from '@/store/streams/events/hooks';

import moment from 'moment-timezone';
import Tooltip from '@/@core/ui-kits/page-headers/components/AvatarGroup/Tooltip';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

type Props = {
    row: {
        driverId: string;
        selfieThumbUrl: string;
        firstName: string;
        lastName: string;
    };
    children: React.ReactNode;
};

export default function TooltipDriverPing({
    row,
    children
}: Props) {
    const driverPing = useLastDriverPing(row.driverId);
    const { url } = usePrivateFileUrl(row.selfieThumbUrl);

    let isOnline = false;
    let onlineAge = '';

    if (driverPing) {
        isOnline = Date.now() - driverPing.timestamp < 1000 * 60 * 3;
        onlineAge = moment(driverPing.timestamp).fromNow(true);
    }
    return (
        <Tooltip
            onlineAge={onlineAge}
            isOnline={isOnline}
            selfie={row.selfieThumbUrl}
            fullName={`${row.firstName} ${row.lastName || ''}`}
            avatarProps={{
                src: url,
                sx : {
                    bgcolor: (theme) => theme.palette.semantic.background.primary,
                    color  : (theme) => theme.palette.semantic.text.secondary
                }
            }}
            containerStyle={{
                display       : 'flex',
                alignItems    : 'center',
                justifyContent: 'flex-start',
                width         : '100%',
                height        : '100%',
                overflow      : 'hidden',
                paddingLeft   : '16px',
                fontWeight    : 500
            }}
        >
            {children}
        </Tooltip>
    );
}
