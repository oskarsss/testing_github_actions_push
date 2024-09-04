import React, { useCallback, useEffect, useState } from 'react';
import { MapHelper } from '@/utils/mapbox-utils/map-helper';
import { createPortal } from 'react-dom';
import GeneralTruckMarker from '@/@core/components/general-map/general-map-markers/general-truck-marker/GeneralTruckMarker';
import mapboxgl from 'mapbox-gl';
import { FlyToPoint } from '../../../../../../views/dispatch/orders/Details/sections/load-map/LoadMap';

type Props = {
    truckData: {
        truckId: string;
        truckReferenceId: string;
        lngLat: [number, number];
    } | null;
    mapWorker: MapHelper;
    flyToPoint: FlyToPoint;
    isOnline: boolean;
};

export default function LoadTruckMarkerPortal({
    truckData,
    mapWorker,
    flyToPoint,
    isOnline
}: Props) {
    const [element] = useState(() => document.createElement('div'));
    const marker = React.useRef<mapboxgl.Marker | null>(new mapboxgl.Marker(element));

    const flyToPointHandler = useCallback(() => {
        if (!truckData) return;
        flyToPoint(truckData.lngLat[0], truckData.lngLat[1], 14);
    }, [truckData]);

    useEffect(() => {
        if (!truckData) {
            marker.current?.remove();
            return;
        }
        if (!marker.current) {
            marker.current = new mapboxgl.Marker(element);
        }
        marker.current.setLngLat(truckData.lngLat).addTo(mapWorker.map);
    }, [truckData, element]);

    return createPortal(
        <GeneralTruckMarker
            isOnline={isOnline}
            flyToPoint={flyToPointHandler}
            truckId={truckData?.truckId || ''}
            truckReferenceId={truckData?.truckReferenceId || ''}
        />,
        element
    );
}
