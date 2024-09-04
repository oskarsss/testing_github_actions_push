import Box from '@mui/material/Box';
import { StatusChip } from '@/@core/theme/chip';
import { TRUCK_STATUS_COLORS } from '@/@core/theme/entities/truck/status';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { TRUCK_STATUS_TO_LOCALE } from '@/models/fleet/trucks/trucks-mappings';
import { TruckModel_Truck } from '@proto/models/model_truck';

type Props = {
    status: TruckModel_Truck['status'];
};

export default function TruckStatus({ status }: Props) {
    const { t } = useAppTranslation();

    return (
        <Box ml="auto">
            <StatusChip
                color={TRUCK_STATUS_COLORS[TRUCK_STATUS_TO_LOCALE[status]]}
                status={t(`state_info:trucks.status.${TRUCK_STATUS_TO_LOCALE[status]}`)}
            />
        </Box>
    );
}
