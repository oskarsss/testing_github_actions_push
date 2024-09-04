/* eslint-disable max-len */
/* eslint-disable import/no-extraneous-dependencies */
import DriversTypes from '@/store/fleet/drivers/types';
import { useLastDriversLocation } from '@/store/streams/events/hooks';
import { ListenDriverDeviceLocationsReply } from '@proto/drivers';
import { useMemo } from 'react';
import DriversGrpcService from '@/@grpcServices/services/drivers.service';
import { DriverModel_Status } from '@proto/models/model_driver';
import mapboxgl from 'mapbox-gl';
import { useAppSelector } from '@/store/hooks';
import { DriversDataSelectors } from '@/store/storage/drivers/slice';
import DriverMarker from '@/views/dispatch/manifests/map/markers/DriverMarker';

type DriverProperties = Pick<
    DriversTypes.DriverRow,
    'driverId' | 'firstName' | 'lastName' | 'selfieThumbUrl'
>;

type DriverPoint = ListenDriverDeviceLocationsReply['locations'][0] & DriverProperties;

type Props = {
    showAllDrivers: boolean;
    driverId: string;
    map: mapboxgl.Map;
};

export default function AllDriversLayer({
    showAllDrivers,
    driverId,
    map
}: Props) {
    const locations = useLastDriversLocation();

    // const { data: drivers } = DriversGrpcService.endpoints.getDrivers.useQueryState({});
    const drivers = useAppSelector(DriversDataSelectors.getRows);

    const allDrivers = useMemo(() => {
        if (!drivers || !locations) return [];
        if (!showAllDrivers) return [];
        const location_drivers = [] as DriverPoint[];
        locations.forEach((location) => {
            const driver = drivers.find((driver) => driver.driverId === location.driverId);
            if (
                driver &&
                driver.status !== DriverModel_Status.DELETED &&
                driver.driverId !== driverId
            ) {
                location_drivers.push({
                    ...location,
                    ...driver
                });
            }
        });
        return location_drivers;
    }, [locations, drivers, showAllDrivers, driverId]);

    return allDrivers.map((driver) => (
        <DriverMarker
            key={driver.driverId}
            driverId={driver.driverId}
            map={map}
            hide={false}
        />
    ));
}
