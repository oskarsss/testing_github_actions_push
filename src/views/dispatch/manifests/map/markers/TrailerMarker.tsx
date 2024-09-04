import GeneralTrailerMarker from '@/@core/components/general-map/general-map-markers/general-trailer-marker/GeneralTrailerMarker';
import MapboxMarker from '@/@core/maps/MapboxMarker';
import { useTrailersMap } from '@/store/storage/trailers/hooks/common';
import { useTrailerLocation } from '@/store/streams/events/hooks';
import mapboxgl from 'mapbox-gl';
import React, { useCallback, useMemo } from 'react';

type Props = {
    map: mapboxgl.Map;
    trailerId: string;
    hide: boolean;
};

export default function TrailerMarker({
    map,
    trailerId,
    hide
}: Props) {
    const location = useTrailerLocation(trailerId || '');
    const trailersMap = useTrailersMap();

    const trailerData = useMemo(() => {
        if (!trailersMap || !trailerId || !location || !location.lon || !location.lat || hide) {
            return null;
        }
        const trailer = trailersMap[trailerId];
        if (!trailer) {
            return {
                trailerId,
                trailerReferenceId: '',
                latLon            : [location.lon, location.lat] as [number, number]
            };
        }
        return {
            trailerId,
            trailerReferenceId: trailer.referenceId,
            latLon            : [location.lon, location.lat] as [number, number]
        };
    }, [trailersMap, trailerId, location, hide]);

    const flyToPointHandler = useCallback(() => {
        if (trailerData?.latLon) {
            map.flyTo({
                zoom  : 14,
                center: trailerData.latLon,
                speed : 14
            });
        }

        // flyToPoint(trailerData.latLon[0], trailerData.latLon[1], 14);
    }, [map, trailerData?.latLon]);

    if (!trailerData?.latLon) {
        return null;
    }

    return (
        <MapboxMarker
            lat={trailerData.latLon[1]}
            lon={trailerData.latLon[0]}
            map={map}
        >
            <GeneralTrailerMarker
                flyToPoint={flyToPointHandler}
                trailerId={trailerData?.trailerId || ''}
                trailerReferenceId={trailerData?.trailerReferenceId || ''}
            />
        </MapboxMarker>
    );
}
