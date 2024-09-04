import { memo } from 'react';
import { Stack } from '@mui/material';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import DriverTooltipItem from './DriverTooltipItem';

type Props = {
    driverIds: string[];
};

function DriversTooltip({ driverIds }: Props) {
    const driversMap = useDriversMap();

    return (
        <Stack
            direction="row"
            alignItems="center"
            gap="4px"
        >
            {driverIds.map((driverId) => (
                <DriverTooltipItem
                    key={driverId}
                    selfieThumbUrl={driversMap[driverId].selfieThumbUrl}
                    firstName={driversMap[driverId].firstName}
                    lastName={driversMap[driverId].lastName}
                />
            ))}
        </Stack>
    );
}

export default memo(DriversTooltip);
