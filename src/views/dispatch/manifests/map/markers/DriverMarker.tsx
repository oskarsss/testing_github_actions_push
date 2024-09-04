import GeneralDriverMarker from '@/@core/components/general-map/general-map-markers/general-driver-marker/GeneralDriverMarker';
import MapboxMarker from '@/@core/maps/MapboxMarker';
import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
import { useDriversMap } from '@/store/storage/drivers/hooks/common';
import { useLastDriversLocation } from '@/store/streams/events/hooks';
import mapboxgl from 'mapbox-gl';
import moment from 'moment-timezone';
import React, { useCallback, useMemo } from 'react';

type Props = {
    driverId: string;
    map: mapboxgl.Map;
    hide: boolean;
};

function DriverMarker({
    driverId,
    map,
    hide
}: Props) {
    const locations = useLastDriversLocation();
    const driversMap = useDriversMap();
    const driver = useMemo(() => driversMap[driverId], [driversMap, driverId]);
    const driverLocation = locations.get(driverId || '');

    const { url } = usePrivateFileUrl(driver?.selfieThumbUrl);

    const mainDriver = useMemo(() => {
        if (!driverLocation || hide) {
            return {
                driver: {
                    lngLat              : null,
                    driverId            : driverId || '',
                    driverAvatarText    : '',
                    driverName          : '',
                    driverSelfieThumbUrl: ''
                },
                isOnline: false
            };
        }

        return {
            isOnline: moment().diff(moment(driverLocation.timestamp), 'minutes') < 2,
            driver  : {
                lngLat              : [driverLocation.lon, driverLocation.lat] as [number, number],
                driverId            : driverId || '',
                driverAvatarText    : `${driver?.firstName.at(0)} ${driver?.lastName?.at(0) || ''}`,
                driverName          : `${driver?.firstName} ${driver?.lastName || ''}`,
                driverSelfieThumbUrl: url || ''
            }
        };
    }, [driverLocation, hide, driverId, driver?.firstName, driver?.lastName, url]);

    const flyToPointHandler = useCallback(() => {
        if (mainDriver.driver.lngLat) {
            map.flyTo({
                zoom  : 14,
                center: mainDriver.driver.lngLat,
                speed : 14
            });
        }
    }, [mainDriver.driver.lngLat, map]);

    if (!mainDriver.driver.lngLat) {
        return null;
    }
    return (
        <MapboxMarker
            lat={mainDriver.driver.lngLat[1]}
            lon={mainDriver.driver.lngLat[0]}
            map={map}
        >
            <GeneralDriverMarker
                isOnline={mainDriver.isOnline}
                driverAvatarText={mainDriver.driver.driverAvatarText || ''}
                driverName={mainDriver.driver.driverName || ''}
                driverSelfieThumbUrl={mainDriver.driver.driverSelfieThumbUrl || ''}
                driverId={mainDriver.driver.driverId || ''}
                flyToPoint={flyToPointHandler}
            />
        </MapboxMarker>
    );
}

export default React.memo(DriverMarker);
