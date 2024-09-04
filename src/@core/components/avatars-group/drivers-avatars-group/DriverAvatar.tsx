import { Tooltip, Avatar, SxProps } from '@mui/material';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';

type Props = {
    driverUrl: string;
    initials: string;
    tooltipTitle: string;
    styles?: SxProps;
};

function DriverAvatar({
    driverUrl,
    initials,
    tooltipTitle,
    styles
}: Props) {
    const { url } = usePrivateFileUrl(driverUrl);
    return (
        <Tooltip
            title={tooltipTitle}
            disableHoverListener={!tooltipTitle}
        >
            <Avatar
                src={url}
                sx={styles}
            >
                {initials}
            </Avatar>
        </Tooltip>
    );
}

export default DriverAvatar;
