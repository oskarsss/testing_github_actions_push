import React, { useCallback, useEffect, useState } from 'react';
import { MapHelper } from '@/utils/mapbox-utils/map-helper';
import { createPortal } from 'react-dom';

import GeneralDriverMarker from '@/@core/components/general-map/general-map-markers/general-driver-marker/GeneralDriverMarker';

import mapboxgl from 'mapbox-gl';
import { FlyToPoint } from '../../../../../../views/dispatch/orders/Details/sections/load-map/LoadMap';

type Props = {
    mainDriver: {
        driverSelfieThumbUrl: string;
        driverName: string;
        driverAvatarText: string;
        driverId: string;
        lngLat: [number, number];
    } | null;
    mapWorker: MapHelper;
    isOnline: boolean;
    flyToPoint: FlyToPoint;
};

export default function LoadDriverMarkerPortal({
    mainDriver,
    mapWorker,
    flyToPoint,
    isOnline
}: Props) {
    const [element] = useState(() => document.createElement('div'));
    const marker = React.useRef<mapboxgl.Marker | null>(new mapboxgl.Marker(element));

    const flyToPointHandler = useCallback(() => {
        if (!mainDriver) return;
        flyToPoint(mainDriver.lngLat[0], mainDriver.lngLat[1], 14);
    }, [mainDriver]);

    useEffect(() => {
        if (!mainDriver) {
            marker.current?.remove();
            marker.current = null;
            return;
        }
        if (!marker.current) {
            marker.current = new mapboxgl.Marker(element);
        }
        marker.current.setLngLat(mainDriver.lngLat).addTo(mapWorker.map);
    }, [mainDriver, element]);

    return createPortal(
        <GeneralDriverMarker
            isOnline={isOnline}
            driverAvatarText={mainDriver?.driverAvatarText || ''}
            driverName={mainDriver?.driverName || ''}
            driverSelfieThumbUrl={mainDriver?.driverSelfieThumbUrl || ''}
            driverId={mainDriver?.driverId || ''}
            flyToPoint={flyToPointHandler}
        />,
        element
    );
}
