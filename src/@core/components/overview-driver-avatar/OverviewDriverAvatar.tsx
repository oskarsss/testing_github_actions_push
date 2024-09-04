import Avatar, { AvatarProps } from '@mui/material/Avatar';
import { BadgeProps } from '@mui/material/Badge';
import DriverTypeBadge from '@/@core/components/overview-driver-avatar/DriverTypeBadge';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

type Props = {
    driverTypeId: string;
    selfieThumbUrl: string;
    fullName: string;
    slots?: {
        avatarProps?: Omit<AvatarProps, 'src' | 'alt'>;
        badgeProps?: Omit<BadgeProps, 'badgeContent'>;
    };
};

export default function OverviewDriverAvatar({
    driverTypeId,
    selfieThumbUrl,
    fullName,
    slots
}: Props) {
    const { url } = usePrivateFileUrl(selfieThumbUrl);

    return (
        <DriverTypeBadge
            driverTypeId={driverTypeId}
            badgeProps={slots?.badgeProps}
        >
            <Avatar
                {...slots?.avatarProps}
                alt={fullName}
                src={url}
                sx={{
                    width : '40px',
                    height: '40px',
                    ...slots?.avatarProps?.sx
                }}
            >
                {fullName?.[0]}
            </Avatar>
        </DriverTypeBadge>
    );
}
