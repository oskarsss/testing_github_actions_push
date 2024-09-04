import { Stack, Typography } from '@mui/material';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { Label } from '../ChipAutocomplete';

const TruckLabel: Label<TruckModel_Truck> = ({ option }) => (
    <Stack
        direction="row"
        alignItems="center"
        spacing={1}
    >
        {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[option.type]]}

        <Typography
            fontSize="12px"
            variant="body1"
            fontWeight={400}
        >
            #{option.referenceId}
        </Typography>
    </Stack>
);
export default TruckLabel;
