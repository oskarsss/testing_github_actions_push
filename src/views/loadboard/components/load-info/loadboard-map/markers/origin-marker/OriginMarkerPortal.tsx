import { LB_ListenSearchResultsReply_SearchResult_Origin } from '@proto/loadboard';
import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import OriginMarker from './OriginMarker';

type Props = {
    origin?: LB_ListenSearchResultsReply_SearchResult_Origin;
    map: mapboxgl.Map;
};

function OriginMarkerPortal({
    origin,
    map
}: Props) {
    const [element] = useState(() => document.createElement('div'));

    const originMarker = useRef<mapboxgl.Marker | null>(new mapboxgl.Marker(element));

    const flyToPoint = () => {
        if (!origin) return;

        map.flyTo({
            center: [origin.lon, origin.lat],
            zoom  : 14,
            speed : 14
        });
    };

    useEffect(() => {
        if (!origin) {
            originMarker.current?.remove();
            return;
        }
        if (!originMarker.current) {
            originMarker.current = new mapboxgl.Marker(element);
        }
        originMarker.current.setLngLat([origin.lon, origin.lat]).addTo(map);
    }, [origin, element]);

    return createPortal(<OriginMarker onClick={flyToPoint} />, element);
}

export default OriginMarkerPortal;
