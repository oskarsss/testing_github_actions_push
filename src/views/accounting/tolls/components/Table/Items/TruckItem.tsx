import { TrucksIcon } from '@/@core/icons/custom-nav-icons/icons';
import { Stack } from '@mui/material';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTollsOptionMenu } from '../../../menus/TollsOptionMenu';

function TruckItem({
    truck_id,
    tollId
}: { truck_id: string; tollId: string }) {
    const trucksMap = useTrucksMap();
    const tollOptionsMenu = useTollsOptionMenu();

    const foundedTruck = trucksMap[truck_id];

    return (
        <Stack
            direction="row"
            spacing={1}
            paddingX={3}
            alignItems="center"
            flex="1 1 0"
            onClick={tollOptionsMenu.open({ tollId, truckId: truck_id })}
            onContextMenu={(e) => {
                e.preventDefault();
                e.stopPropagation();
                tollOptionsMenu.open({ tollId, truckId: truck_id })(e);
            }}
            sx={{
                display       : 'flex',
                alignItems    : 'center',
                justifyContent: 'flex-start',
                fontWeight    : 500,
                color         : (theme) => theme.palette.semantic.foreground.brand.primary,
                svg           : {
                    fill  : (theme) => theme.palette.semantic.foreground.brand.primary,
                    width : 20,
                    height: 20
                }
            }}
        >
            {TrucksIcon()}
            {foundedTruck?.referenceId}
        </Stack>
    );
}

export default TruckItem;
