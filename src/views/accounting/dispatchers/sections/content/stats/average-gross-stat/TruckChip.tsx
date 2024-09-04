import { TruckType } from '@/models/fleet/trucks/truck-type';
import { Stack, Typography } from '@mui/material';
import { TRUCK_TYPE_ICONS } from '@/@core/theme/entities/truck/type';
import Dispatch from '@/store/accounting/dispatchers/types';
import { TRUCK_TYPE_TO_GRPC_REVERSE_ENUM } from '@/models/fleet/trucks/trucks-mappings';

type Props = {
    trucks: Dispatch.Truck[] | null;
};

export default function TruckChip({ trucks }: Props) {
    const truck_types = trucks?.map((truck) => TRUCK_TYPE_TO_GRPC_REVERSE_ENUM[truck.type]) || [];
    const countOccurrencesMap = () => {
        const occurrences = new Map();
        truck_types.forEach((item) => {
            if (occurrences.has(item)) {
                occurrences.set(item, occurrences.get(item) + 1);
            } else {
                occurrences.set(item, 1);
            }
        });

        return occurrences;
    };
    const occurrencesMap: Map<TruckType, number> = countOccurrencesMap();

    const occurrencesArray = Array.from(occurrencesMap, ([truckType, truckAmount]) => ({
        truckType,
        truckAmount
    }));

    return (
        <Stack
            direction="row"
            gap="2px"
        >
            {occurrencesArray.map((el) => (
                <Stack
                    key={el.truckType}
                    direction="row"
                    borderRadius="4px"
                    bgcolor="semantic.foreground.quarterary"
                    padding="0 4px"
                    gap="3px"
                    alignItems="center"
                >
                    {TRUCK_TYPE_ICONS[el.truckType]}

                    <Typography
                        variant="body1"
                        fontSize="12px"
                        fontWeight="500"
                        color="semantic.text.white"
                    >
                        {el.truckAmount}
                    </Typography>
                </Stack>
            ))}
        </Stack>
    );
}
