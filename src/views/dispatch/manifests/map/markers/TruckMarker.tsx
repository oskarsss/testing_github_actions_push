import GeneralTruckMarker from '@/@core/components/general-map/general-map-markers/general-truck-marker/GeneralTruckMarker';
import MapboxMarker from '@/@core/maps/MapboxMarker';
import { useTrucksMap } from '@/store/storage/trucks/hooks/common';
import { useTruckLocation } from '@/store/streams/events/hooks';
import mapboxgl from 'mapbox-gl';
import moment from 'moment-timezone';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type Props = {
    truckId: string;
    map: mapboxgl.Map;
    hide: boolean;
};

export default function TruckMarker({
    truckId,
    map,
    hide
}: Props) {
    const location = useTruckLocation(truckId || '');
    const trucksMap = useTrucksMap();

    const isOnline = location ? moment().diff(moment(location.timestamp), 'minutes') < 2 : false;

    const truckData = useMemo(() => {
        if (!trucksMap || !truckId || !location || !location.lon || !location.lat || hide) {
            return null;
        }
        const truck = trucksMap[truckId];
        if (!truck) {
            return {
                lngLat          : [location.lon, location.lat] as [number, number],
                truckId,
                truckReferenceId: ''
            };
        }

        return {
            lngLat          : [location.lon, location.lat] as [number, number],
            truckId,
            truckReferenceId: truck.referenceId
        };
    }, [trucksMap, truckId, location, hide]);

    const flyToPointHandler = useCallback(() => {
        if (!truckData) return;
        map.flyTo({
            zoom  : 14,
            center: truckData.lngLat,
            speed : 14
        });
    }, [map, truckData]);

    if (!truckData) {
        return null;
    }

    return (
        <MapboxMarker
            lat={truckData.lngLat[1]}
            lon={truckData.lngLat[0]}
            map={map}
        >
            <GeneralTruckMarker
                isOnline={isOnline}
                flyToPoint={flyToPointHandler}
                truckId={truckData?.truckId || ''}
                truckReferenceId={truckData?.truckReferenceId || ''}
            />
        </MapboxMarker>
    );
}
