import { useAppSelector } from '@/store/hooks';
import { useMemo } from 'react';
import {
    Event_Driver_Device_Location,
    Event_Driver_Device_Ping,
    Event_User_Ping
} from '@proto/events/events';
import { EventsTypes } from './slice';

export const useDriverDevicesPing = (driver_id = '') => {
    const driverDevices = useAppSelector((state) => state.events.driverDevicePings[driver_id]);
    return driverDevices || undefined;
};

export const useDriverLocations = (driver_id = '') => {
    const locations = useAppSelector((state) => state.events.driverDeviceLocations[driver_id]);
    return locations || undefined;
};

export const useLastDriverPing = (driver_id = '') => {
    const driverPings = useDriverDevicesPing(driver_id);

    return useMemo(() => {
        const sort_driver_pings = Object.values(driverPings || {}).sort(
            (a, b) => a.timestamp - b.timestamp
        );
        return sort_driver_pings?.at(-1);
    }, [driverPings]);
};

export const useLastDriversPing = () => {
    const driver_devices = useAppSelector((state) => state.events.driverDevicePings);

    return useMemo(() => {
        const drivers_pings: Map<string, Event_Driver_Device_Ping> = new Map();
        Object.entries(driver_devices || {}).forEach(([driver_id, devices]) => {
            const last_device = Object.values(devices)
                .sort((a, b) => a.timestamp - b.timestamp)
                ?.at(-1);
            if (!last_device) return;
            drivers_pings.set(driver_id, last_device);
        });
        return drivers_pings;
    }, [driver_devices]);
};

export const useLastDriversLocation = () => {
    const locations = useAppSelector((state) => state.events.driverDeviceLocations);

    return useMemo(() => {
        const drivers_pings: Map<string, Event_Driver_Device_Location> = new Map();
        Object.entries(locations || {}).forEach(([driver_id, devices]) => {
            const last_device = Object.values(devices)
                .sort((a, b) => a.timestamp - b.timestamp)
                ?.at(-1);
            if (!last_device) return;
            drivers_pings.set(driver_id, last_device);
        });
        return drivers_pings;
    }, [locations]);
};

export const useLastDriverLocation = (driver_id = '') => {
    const driverLocations = useDriverLocations(driver_id);

    return useMemo(() => {
        const sort_driver_locations = Object.values(driverLocations || {}).sort(
            (a, b) => a.timestamp - b.timestamp
        );
        return sort_driver_locations?.at(-1);
    }, [driverLocations]);
};

export const useTrailerLocation = (trailer_id = '') => {
    const locations = useAppSelector((state) => state.events.trailerLocations[trailer_id]);
    return locations || undefined;
};

export const useTruckLocation = (truck_id = '') => {
    const locations = useAppSelector((state) => state.events.truckLocations[truck_id]);
    return locations || undefined;
};

export const useTruckDiagnostics = (truck_id = '') => {
    const diagnostics = useAppSelector((state) => state.events.trucksDiagnostics[truck_id]);
    return diagnostics || undefined;
};

// export const useManifestTruckRoute = (truck_id = '') => {
//     const route = useAppSelector((state) => state.events.truckRoutes[truck_id]);
//     return route || undefined;
// };

export const useUsersPings = () => {
    const pings = useAppSelector((state) => state.events.usersPing);
    return Object.values(pings)?.sort((a, b) => (a.timestamp < b.timestamp ? 1 : -1)) || [];
};

export const useUserPings = (userId: string): Event_User_Ping | undefined => {
    const pings = useAppSelector((state) => state.events.usersPing);
    return pings[userId] || undefined;
};

export const useManifestTruckRoute = (
    truck_id = ''
): EventsTypes.ManifestTruckRoute[0] | undefined => {
    const routes = useAppSelector((state) => state.events.manifestTruckRoutes[truck_id]);
    return routes || undefined;
};
