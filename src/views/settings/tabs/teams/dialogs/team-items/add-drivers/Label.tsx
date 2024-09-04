import { Avatar, Stack, Typography } from '@mui/material';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { type Label } from '../ChipAutocomplete';

const DriverLabel: Label<DriverModel_Driver> = ({ option }) => {
    const { url } = usePrivateFileUrl(option.selfieThumbUrl);
    const initials = (option.firstName[0] || '') + (option.lastName[0] || '');

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap={1}
        >
            <Avatar
                sizes="8px"
                alt={`${option.firstName} ${option.lastName}`}
                sx={{
                    height  : '16px',
                    width   : '16px',
                    fontSize: '10px'
                }}
                src={url}
            >
                {initials}
            </Avatar>
            <Typography
                variant="body1"
                color="initial"
                fontSize="12px"
            >
                {`${option.firstName} ${option.lastName}`}
            </Typography>
        </Stack>
    );
};

export default DriverLabel;
