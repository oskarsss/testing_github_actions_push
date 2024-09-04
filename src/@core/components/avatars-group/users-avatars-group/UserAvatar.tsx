import { getPublicURL } from '@/configs/storage';
import { Tooltip, Avatar, SxProps } from '@mui/material';

type Props = {
    userUrl: string;
    initials: string;
    tooltipTitle: string;
    styles?: SxProps;
};

function UserAvatar({
    userUrl,
    initials,
    tooltipTitle,
    styles
}: Props) {
    const url = getPublicURL(userUrl);
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

export default UserAvatar;
