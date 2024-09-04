import mapboxgl from 'mapbox-gl';
import { useCallback } from 'react';

type Coord = {
    lon: number;
    lat: number;
};

type Data = Map<string, Coord>;

export function useBoundsMap(map: mapboxgl.Map) {
    return useCallback(
        (selected_id: string, data: Data, helicopter_view?: boolean) => {
            if (selected_id) {
                const zoomItem = data.get(selected_id);
                if (zoomItem) {
                    map.flyTo({
                        center: [zoomItem.lon, zoomItem.lat],
                        zoom  : 14,
                        ...(helicopter_view
                            ? {
                                duration: 1000,
                                easing(t) {
                                    return t;
                                }
                            }
                            : {})
                    });
                }
            } else if (data.size === 1) {
                let location: [number, number] = [0, 0];
                data.forEach((truck) => {
                    location = [truck.lon, truck.lat];
                });
                if (location[0] && location[1]) {
                    map.flyTo({
                        center: location,
                        zoom  : 6
                    });
                }
            } else {
                const bounds = new mapboxgl.LngLatBounds();
                data.forEach((location) => {
                    if (!location.lon || !location.lat) return;
                    bounds.extend([location.lon, location.lat]);
                });
                if (!bounds.isEmpty()) {
                    map.fitBounds(bounds, {
                        padding  : 150,
                        essential: true
                    });
                }
            }
        },
        [map]
    );
}
