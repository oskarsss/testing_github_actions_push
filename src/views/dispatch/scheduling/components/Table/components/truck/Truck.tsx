import Divider from '@mui/material/Divider';
import Scheduling from '@/store/dispatch/scheduling/types';

import React, { memo } from 'react';
import Notes from './notes/Notes';
import Drivers from './drivers/Drivers';
import Location from './location/Location';
import Truck from './truck/TopTruckAndTrailer';

import { Container, Top, Wrap } from './styled';

type Props = {
    truck: Scheduling.TruckManifestRow;
    style?: React.CSSProperties;
    location_only_truck?: boolean;
};

const ScheduleTruck = ({
    truck,
    style = {},
    location_only_truck = false
}: Props) => (
    <Container style={style}>
        <Top>
            <Wrap>
                {/* --- LOCATION + CONTROLLERS (Copy driver, change online, pin truck) --- */}
                <Location
                    truck={truck}
                    location_only_truck={location_only_truck}
                />

                <Divider sx={{ width: '100%' }} />

                {/* ---------- TRUCK + TRAILER + AMOUNT + status ---------- */}
                <Truck truck={truck} />
            </Wrap>
        </Top>

        {/* ---------------- // MIDDLE // ---------------- */}
        <Drivers truck={truck} />

        {/* ---------------- // BOTTOM //---------------- */}
        <Notes truckId={truck.truckId} />
    </Container>
);

export default memo(ScheduleTruck);
