import React, { useCallback, useEffect } from 'react';
import MapboxMarker from '@/@core/maps/MapboxMarker';
import StopMarkerContent from './Content';
import { PreparedMapStop } from '../../utils';

type Props = {
    stops: { stops: PreparedMapStop[]; lat: number; lon: number; ids: string[] };
    map: mapboxgl.Map;
    selectedStopId: string | null;
    setSelectedStopId: (value: string | null) => void;
    setPopupData: React.Dispatch<React.SetStateAction<PreparedMapStop | null>>;
    mainLoadId?: string;
};

export default function StopMarkerPortal({
    stops,
    map,
    setPopupData,
    selectedStopId,
    setSelectedStopId,
    mainLoadId
}: Props) {
    const ref = React.useRef<{
        marker: mapboxgl.Marker;
        element: HTMLDivElement;
    } | null>(null);
    const isSelectedStop = stops.ids.includes(selectedStopId || '');

    const onClick = useCallback(
        (stopId: string) => {
            setSelectedStopId(isSelectedStop ? null : stopId);
        },
        [isSelectedStop, setSelectedStopId]
    );

    useEffect(() => {
        const element = ref.current?.element;
        if (element) {
            element.style.zIndex = '1000';
            element.style.position = 'absolute';
            element.style.cursor = 'pointer';
            element.style.top = '-20px';
            if (selectedStopId && isSelectedStop) {
                element.style.zIndex = '1001';
            }
        }
    }, [isSelectedStop, selectedStopId]);

    // if (!stop.lonLat) {
    //     return null;
    // }

    return (
        <MapboxMarker
            ref={ref}
            lat={stops.lat}
            lon={stops.lon}
            map={map}
        >
            {stops.stops.map((stop, index) => (
                <StopMarkerContent
                    key={stop.stopId}
                    highlightArrow={isSelectedStop}
                    showArrow={stops.stops.length - 1 === index}
                    isSelected={selectedStopId === stop.stopId}
                    onClick={() => onClick(stop.stopId)}
                    stop={stop}
                    mainLoadId={mainLoadId}
                    onMouseEnter={() => {
                        setPopupData(stop);
                    }}
                />
            ))}
        </MapboxMarker>
    );
}
