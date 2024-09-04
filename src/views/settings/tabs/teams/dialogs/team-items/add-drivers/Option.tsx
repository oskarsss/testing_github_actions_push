import { DRIVER_STATUS_COLORS } from '@/@core/theme/entities/driver/status';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { Avatar, Stack, Typography } from '@mui/material';
import { StatusChip } from '@/@core/theme/chip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DRIVER_STATUS_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';
import { DriverModel_Driver } from '@proto/models/model_driver';
import { type Option } from '../ChipAutocomplete';

const DriverOption: Option<DriverModel_Driver> = ({ option }) => {
    const { t } = useAppTranslation();
    const { url } = usePrivateFileUrl(option.selfieThumbUrl);
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            sx={{ width: '100%' }}
        >
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="center"
                spacing={1}
            >
                <Avatar
                    alt={`${option.firstName} ${option.lastName}`}
                    src={url}
                    sx={{ width: 40, height: 40, marginRight: '10px', fontSize: '12px' }}
                >
                    {option.firstName?.charAt(0).toUpperCase()}
                    {option.lastName?.charAt(0).toUpperCase()}
                </Avatar>

                <Stack direction="column">
                    <Stack
                        direction="row"
                        alignItems="center"
                        spacing={2}
                        sx={{ width: '100%' }}
                    >
                        {`${option.firstName} ${option.lastName}`}
                    </Stack>
                    {option.phoneNumber && (
                        <Typography variant="caption">Phone: {option.phoneNumber}</Typography>
                    )}
                </Stack>
            </Stack>
            <StatusChip
                color={DRIVER_STATUS_COLORS[option.status]}
                status={t(`state_info:drivers.status.${DRIVER_STATUS_GRPC_ENUM[option.status]}`)}
            />
        </Stack>
    );
};

export default DriverOption;
