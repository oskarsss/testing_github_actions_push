import { LB_ListenSearchResultsReply_SearchResult_Destination } from '@proto/loadboard';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import DestinationMarker from './DestinationMarker';

type Props = {
    destination?: LB_ListenSearchResultsReply_SearchResult_Destination;
    map: mapboxgl.Map;
};

function DestinationMarkerPortal({
    destination,
    map
}: Props) {
    const [element] = useState(() => document.createElement('div'));

    const marker = useRef<mapboxgl.Marker | null>(new mapboxgl.Marker(element));

    const flyToPoint = () => {
        if (!destination) return;

        map.flyTo({
            center: [destination.lon, destination.lat],
            zoom  : 14,
            speed : 14
        });
    };

    useEffect(() => {
        if (!destination) {
            marker.current?.remove();
            return;
        }
        if (!marker.current) {
            marker.current = new mapboxgl.Marker(element);
        }
        marker.current.setLngLat([destination.lon, destination.lat]).addTo(map);
    }, [destination, element]);

    return createPortal(<DestinationMarker onClick={flyToPoint} />, element);
}

export default DestinationMarkerPortal;
