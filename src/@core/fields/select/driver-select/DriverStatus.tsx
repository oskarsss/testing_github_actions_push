import Box from '@mui/material/Box';
import { StatusChip } from '@/@core/theme/chip';
import { DRIVER_STATUS_COLORS } from '@/@core/theme/entities/driver/status';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DriverModel_Status } from '@proto/models/model_driver';
import { DRIVER_STATUS_GRPC_ENUM } from '@/models/fleet/drivers/drivers-mappings';

type Props = {
    status: DriverModel_Status;
};

export default function DriverStatus({ status }: Props) {
    const { t } = useAppTranslation();

    return (
        <Box ml="auto">
            <StatusChip
                color={DRIVER_STATUS_COLORS[status]}
                status={t(`state_info:drivers.status.${DRIVER_STATUS_GRPC_ENUM[status]}`)}
            />
        </Box>
    );
}
