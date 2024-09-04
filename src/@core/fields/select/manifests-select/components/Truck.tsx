import { memo } from 'react';
import { useTruckById } from '@/store/storage/trucks/hooks/common';
import { Stack, Typography } from '@mui/material';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';

type Props = {
    truckId: string;
};

function Truck({ truckId }: Props) {
    const truck = useTruckById(truckId);

    if (!truck) return null;

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="4px"
            sx={{
                svg: {
                    height: '16px',
                    width : '16px'
                }
            }}
        >
            {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}

            <Typography
                variant="body1"
                fontSize="12px"
                fontWeight={500}
            >
                {truck.referenceId}
            </Typography>
        </Stack>
    );
}

export default memo(Truck);
