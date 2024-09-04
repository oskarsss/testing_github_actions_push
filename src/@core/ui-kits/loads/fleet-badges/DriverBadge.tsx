import Badge from '@/@core/ui-kits/basic/badge/Badge';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import Avatar from '@mui/material/Avatar';
import getInitials from '@/utils/get-initials';
import { ComponentProps } from 'react';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

type Props = {
    driverId?: string;
    badgeProps?: Partial<ComponentProps<typeof Badge>>;
};

export default function DriverBadge({
    driverId = '',
    badgeProps
}: Props) {
    const driversMap = useDriversMap();
    const driver = driversMap[driverId];
    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl || '');

    if (!driver) return null;

    const fullName = `${driver.firstName} ${driver.lastName || ''}`;
    return (
        <Badge
            variant="filled"
            backgroundColor={(theme) => theme.palette.semantic.foreground.secondary}
            textColor={(theme) => theme.palette.semantic.text.primary}
            icon={(
                <Avatar
                    src={url}
                    sx={{
                        width     : '16px',
                        height    : '16px',
                        fontSize  : '8px',
                        flexShrink: 0
                    }}
                    alt={fullName}
                >
                    {getInitials(fullName).slice(0, 2)}
                </Avatar>
            )}
            text={`${driver.firstName} ${driver.lastName || ''}`}
            {...(badgeProps || {})}
        />
    );
}
