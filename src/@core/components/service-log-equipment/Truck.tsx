import { useTruckById } from '@/store/storage/trucks/hooks/common';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { Typography, Stack } from '@mui/material';
import { memo } from 'react';

type Props = {
    truckId: string;
    fontSize: string;
};

function Truck({
    truckId,
    fontSize
}: Props) {
    const truck = useTruckById(truckId);

    if (!truck) {
        return '-';
    }

    return (
        <Stack
            direction="row"
            display="flex"
            alignItems="center"
            gap="4px"
        >
            {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}

            <Typography
                variant="body1"
                fontSize={fontSize}
                fontWeight={500}
            >
                {truck.referenceId}
            </Typography>

            <Typography
                variant="body2"
                fontSize="inherit"
                fontWeight="inherit"
                overflow="hidden"
                textOverflow="ellipsis"
                whiteSpace="nowrap"
            >
                l {truck.make} {truck.model}
            </Typography>
        </Stack>
    );
}

export default memo(Truck);
