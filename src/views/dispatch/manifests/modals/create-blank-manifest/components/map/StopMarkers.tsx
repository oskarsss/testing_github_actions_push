import React, { useEffect } from 'react';
import MapboxMarker from '@/@core/maps/MapboxMarker';
import { reverseGeocoder } from '@/@core/fields/inputs/LocationInput/utils/geocoder';
import StopMarkerContent from '@/views/dispatch/manifests/map/markers/stop-marker/Content';
import { PreparedMapStop } from '../../../../map/utils';

type Props = {
    stop: PreparedMapStop;
    map: mapboxgl.Map;
    selectedStopId: string | null;
    setStopId: (value: string | null) => void;
    index: number;
    onChangeStops: (idx: number, value: any) => void;
};

export default function StopsMarkers({
    stop,
    map,
    selectedStopId,
    setStopId,
    index,
    onChangeStops
}: Props) {
    const ref = React.useRef<{
        marker: mapboxgl.Marker;
        element: HTMLDivElement;
    } | null>(null);

    const isSelected = selectedStopId === stop.stopId;

    useEffect(() => {
        const element = ref.current?.element;
        if (element) {
            element.style.zIndex = '1000';
            element.style.position = 'absolute';
            element.style.cursor = 'pointer';
            element.style.top = '-25px';
            if (selectedStopId && stop.stopId === selectedStopId) {
                element.style.zIndex = '1001';
            }
        }
    }, [stop, selectedStopId]);

    useEffect(() => {
        const marker = ref.current?.marker;

        const onDragEnd = () => {
            const newLonLat = marker?.getLngLat();

            if (!newLonLat) return;
            reverseGeocoder(newLonLat.lat, newLonLat.lng)
                .then((geoValue) => {
                    onChangeStops(index, {
                        location: {
                            address   : geoValue.location_id_address,
                            city      : geoValue.location_id_city,
                            lat       : newLonLat.lat,
                            line1     : geoValue.location_id_line1,
                            lon       : newLonLat.lng,
                            name      : geoValue.location_id_name,
                            postalCode: geoValue.location_id_postal_code,
                            state     : geoValue.location_id_state
                        }
                    });
                })
                .then(() => {
                    setStopId(stop.stopId);
                });
        };

        marker?.on('dragend', onDragEnd);
    }, [ref.current?.marker, stop, onChangeStops]);

    if (!stop.lonLat) return null;
    return (
        <MapboxMarker
            options={{
                draggable: true
            }}
            ref={ref}
            lat={stop.lonLat[1]}
            lon={stop.lonLat[0]}
            map={map}
        >
            <StopMarkerContent
                highlightArrow={isSelected}
                sx={{
                    cursor: 'grab'
                }}
                showArrow
                onClick={() => setStopId(isSelected ? null : stop.stopId)}
                isSelected={isSelected}
                stop={stop}
                onMouseEnter={() => {}}
            />
        </MapboxMarker>
    );
}
