import { PropsWithChildren, forwardRef, memo, useEffect, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

import mapboxgl from 'mapbox-gl';

type Props = PropsWithChildren<{
    lat: number;
    lon: number;
    map: mapboxgl.Map;
    options?: mapboxgl.MarkerOptions;
}>;

const MapboxMarker = memo(
    forwardRef<
        {
            marker: mapboxgl.Marker;
            element: HTMLDivElement;
        },
        Props
    >(({
        lat,
        lon,
        map,
        children,
        options
    }, ref) => {
        const element = useRef(document.createElement('div')).current;

        const marker = useRef<mapboxgl.Marker>(
            new mapboxgl.Marker({
                element,
                anchor         : 'bottom',
                occludedOpacity: 1,

                ...options
            })
        );

        useImperativeHandle(ref, () => ({
            marker: marker.current,
            element
        }));

        useEffect(() => () => element.remove(), [element]);

        useEffect(
            () => () => {
                marker.current?.remove();
            },
            []
        );

        useEffect(() => {
            if (lon && lat) {
                if (!marker.current) {
                    marker.current = new mapboxgl.Marker({ element, anchor: 'bottom' });
                }

                marker.current.setLngLat([lon, lat]).addTo(map);

                return;
            }

            marker.current?.remove();
        }, [element, lat, lon, map]);

        return createPortal(children, element);
    })
);

export default MapboxMarker;
