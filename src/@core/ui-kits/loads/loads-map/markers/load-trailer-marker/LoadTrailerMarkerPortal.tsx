import { MapHelper } from '@/utils/mapbox-utils/map-helper';
import React, { useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import GeneralTrailerMarker from '@/@core/components/general-map/general-map-markers/general-trailer-marker/GeneralTrailerMarker';
import mapboxgl from 'mapbox-gl';
import { FlyToPoint } from '../../../../../../views/dispatch/orders/Details/sections/load-map/LoadMap';

type Props = {
    trailerData: {
        trailerId: string;
        trailerReferenceId: string;
        latLon: [number, number];
    } | null;
    mapWorker: MapHelper;
    flyToPoint: FlyToPoint;
};

export default function LoadTrailerMarkerPortal({
    mapWorker,
    trailerData,
    flyToPoint
}: Props) {
    const [element] = useState(() => document.createElement('div'));
    const marker = React.useRef<mapboxgl.Marker | null>(new mapboxgl.Marker(element));

    const flyToPointHandler = useCallback(() => {
        if (!trailerData) return;
        flyToPoint(trailerData.latLon[0], trailerData.latLon[1], 14);
    }, [trailerData?.latLon]);

    useEffect(() => {
        if (!trailerData) {
            marker.current?.remove();
            return;
        }
        if (!marker.current) {
            marker.current = new mapboxgl.Marker(element);
        }
        marker.current.setLngLat(trailerData.latLon).addTo(mapWorker.map);
    }, [trailerData, element]);

    return createPortal(
        <GeneralTrailerMarker
            flyToPoint={flyToPointHandler}
            trailerId={trailerData?.trailerId || ''}
            trailerReferenceId={trailerData?.trailerReferenceId || ''}
        />,
        element
    );
}
