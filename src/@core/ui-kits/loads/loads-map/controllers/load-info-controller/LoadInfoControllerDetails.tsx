import { Stack } from '@mui/material';
import { LocationTruckController } from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/location-info/LocationTruck';
import { LocationTrailerController } from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/location-info/LocationTrailer';
import { LocationDriverController } from '@/@core/ui-kits/loads/loads-map/controllers/load-info-controller/components/location-info/LocationDriver';
import { memo } from 'react';
import { type FlyToPoint } from '@/views/dispatch/tracking/map';

type Props = {
    driverId: string;
    truckId: string;
    trailerId: string;
    flyToPoint: FlyToPoint;
};

function LoadInfoControllerDetails({
    driverId,
    truckId,
    trailerId,
    flyToPoint
}: Props) {
    return (
        <Stack
            direction="column"
            gap="8px"
            mt="12px"
            paddingTop="12px"
            borderTop={(theme) => `1px solid ${theme.palette.semantic.border.secondary}`}
            overflow="hidden"
        >
            <LocationTruckController
                truck_id={truckId}
                flyToPoint={flyToPoint}
            />

            <LocationTrailerController
                trailer_id={trailerId}
                flyToPoint={flyToPoint}
            />

            <LocationDriverController
                driver_id={driverId}
                flyToPoint={flyToPoint}
            />
        </Stack>
    );
}

export default memo(LoadInfoControllerDetails);
