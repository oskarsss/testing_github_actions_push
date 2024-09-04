import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { Avatar, Stack, Typography } from '@mui/material';
import getInitials from '@/utils/get-initials';

export type Props = {
    selfie_thumb_url: string;
    full_name: string;
};
export const Driver = ({
    selfie_thumb_url,
    full_name
}: Props) => {
    const { url } = usePrivateFileUrl(selfie_thumb_url);
    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="4px"
        >
            <Avatar
                alt={full_name}
                src={url}
                sx={{
                    width   : 24,
                    height  : 24,
                    fontSize: '10px'
                }}
            >
                {getInitials(full_name)}
            </Avatar>

            <Typography
                fontSize="14px"
                fontWeight={500}
                color="semantic.foreground.primary"
            >
                {full_name}
            </Typography>
        </Stack>
    );
};
