import { Divider, Stack } from '@mui/material';
import TrucksTypes from '@/store/fleet/trucks/types';
import RevenueType from '@/@core/components/assign/options/truck-with-driver/RevenueType';
import Address from '@/@core/components/assign/options/truck-with-driver/Address';

type Props = {
    item: TrucksTypes.ConvertedTruckRow;
};

export default function SubTitle({ item }: Props) {
    return (
        <Stack
            direction="row"
            gap="5px"
            alignItems="center"
        >
            <Address truckId={item.truckId} />

            <Divider
                orientation="vertical"
                sx={{
                    margin    : 0,
                    height    : '9px',
                    width     : '2px',
                    background: (theme) => theme.palette.semantic.text.primary
                }}
            />

            <RevenueType item={item} />
        </Stack>
    );
}
