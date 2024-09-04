import React, { memo } from 'react';
import { DataAndEditProps } from '@/views/dispatch/scheduling/components/Table/types';

import Driver from './Driver';

const TruckDrivers = ({ truck }: DataAndEditProps) => (
    <>
        {truck.drivers.map((driver) => (
            <Driver
                key={driver.driverId}
                driver={driver}
                truck={truck}
            />
        ))}
    </>
);

export default memo(TruckDrivers);
