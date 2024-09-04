import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import type { DriverModel_Driver } from '@proto/models/model_driver';

type Props = {
    driver: DriverModel_Driver;
};

export default function OptionName({ driver }: Props) {
    const { url } = usePrivateFileUrl(driver.selfieThumbUrl);

    return (
        <Stack
            direction="row"
            justifyContent="flex-start"
            alignItems="center"
            spacing={1}
        >
            <Avatar
                alt={`${driver?.firstName || ''} ${driver?.lastName || ''}`}
                src={url}
                sx={{ width: 40, height: 40, marginRight: '10px', fontSize: '12px' }}
            >
                {driver.firstName?.charAt(0).toUpperCase()}
                {driver.lastName?.charAt(0).toUpperCase()}
            </Avatar>

            <Stack direction="column">
                <Stack
                    direction="row"
                    alignItems="center"
                    spacing={2}
                    sx={{ width: '100%' }}
                >
                    {`${driver?.firstName || ''} ${driver?.lastName || ''}`}
                </Stack>
                {driver.phoneNumber && (
                    <Typography variant="caption">Phone: {driver.phoneNumber}</Typography>
                )}
            </Stack>
        </Stack>
    );
}
