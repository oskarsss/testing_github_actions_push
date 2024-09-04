import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';
import TruckStatus from '@/@core/fields/select/truck-select/TruckStatus';

type Props = {
    truck: TruckModel_Truck;
};

export default function OptionName({ truck }: Props) {
    return (
        <Stack
            direction="row"
            gap="10px"
            alignItems="center"
            justifyContent="space-between"
            width="100%"
            overflow="hidden"
        >
            <Stack
                direction="row"
                gap="4px"
                alignItems="center"
                overflow="hidden"
            >
                {TRUCK_TYPE_ICONS[TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]]}

                <Stack overflow="hidden">
                    <Typography
                        variant="body1"
                        fontSize="14px"
                    >
                        #{truck.referenceId}
                    </Typography>

                    <Stack
                        direction="row"
                        alignItems="center"
                        gap="4px"
                        overflow="hidden"
                    >
                        <Typography
                            variant="body2"
                            fontSize="12px"
                        >
                            {truck.year}
                        </Typography>

                        <Typography
                            variant="body2"
                            fontSize="12px"
                            whiteSpace="nowrap"
                        >
                            {truck.model.charAt(0).toUpperCase() + truck.model.slice(1)}
                        </Typography>

                        <Typography
                            variant="body2"
                            overflow="hidden"
                            textOverflow="ellipsis"
                            whiteSpace="nowrap"
                            fontSize="12px"
                        >
                            {truck.make.charAt(0).toUpperCase() + truck.make.slice(1)}
                        </Typography>
                    </Stack>
                </Stack>
            </Stack>

            <TruckStatus status={truck.status} />
        </Stack>
    );
}
