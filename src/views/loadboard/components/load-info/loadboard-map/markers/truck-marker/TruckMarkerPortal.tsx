import GeneralTruckMarker from '@/@core/components/general-map/general-map-markers/general-truck-marker/GeneralTruckMarker';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTruckLocation } from '@/store/streams/events/hooks';
import isOnline from '@/utils/is-online';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = { truckId?: string; map: mapboxgl.Map };

function TruckMarkerPortal({
    truckId,
    map
}: Props) {
    const [element] = useState(() => document.createElement('div'));

    const marker = useRef<mapboxgl.Marker | null>(new mapboxgl.Marker(element));
    const trucksMap = useTrucksMap();
    const truck = trucksMap[truckId || ''];

    const truckLocation = useTruckLocation(truckId);

    const online = isOnline(truckLocation?.timestamp);

    const flyToPoint = () => {
        if (!truckLocation) return;
        map.flyTo({
            center: [truckLocation.lon, truckLocation.lat],
            zoom  : 14,
            speed : 14
        });
    };

    useEffect(() => {
        if (!truckLocation) {
            marker.current?.remove();
            return;
        }
        if (!marker.current) {
            marker.current = new mapboxgl.Marker(element);
        }
        marker.current.setLngLat([truckLocation.lon, truckLocation.lat]).addTo(map);
    }, [origin, element]);

    return createPortal(
        <GeneralTruckMarker
            flyToPoint={flyToPoint}
            isOnline={online}
            truckId={truckId || ''}
            truckReferenceId={truck?.referenceId || ''}
        />,
        element
    );
}

export default TruckMarkerPortal;
