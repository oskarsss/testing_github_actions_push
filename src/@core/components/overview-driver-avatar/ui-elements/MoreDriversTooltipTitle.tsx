import { useLastDriversPing } from '@/store/streams/events/hooks';
import { Stack } from '@mui/material';
import MoreDriversTooltipTitleItem from '@/@core/components/overview-driver-avatar/ui-elements/MoreDriversTooltipTitleItem';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';

type Props = {
    driverIds: string[];
};

export default function MoreDriversTooltipTitle({ driverIds }: Props) {
    const drivers_ping = useLastDriversPing();
    const driversMap = useDriversMap();

    return (
        <Stack flexDirection="column">
            {driverIds.map((driverId, index) => (
                <MoreDriversTooltipTitleItem
                    key={driverId}
                    driver={driversMap[driverId]}
                    noHasPing={!drivers_ping.has(driverId)}
                    isLast={index === driverIds.length - 1}
                />
            ))}
        </Stack>
    );
}
