/* eslint-disable max-len */
import { memo, useMemo } from 'react';
import mapbox_polyline from '@mapbox/polyline';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import MapboxGeojsonLayer from '@/@core/maps/MapboxGeojsonLayer';
import { PreparedMapStop } from '../../utils';
import MANIFEST_LAYERS, { MANIFEST_MAP_CONFIG } from '../../layers.config';

type Props = {
    stops: PreparedMapStop[];
    map: mapboxgl.Map;
    hide: boolean;
};

function StopsRouteLayer({
    map,
    stops,
    hide
}: Props) {
    const routeFeatures: Feature<Geometry, GeoJsonProperties>[] = useMemo(
        () =>
            !hide
                ? stops.map(
                    (stop): Feature<Geometry, GeoJsonProperties> => ({
                        type    : 'Feature',
                        geometry: {
                            type       : 'LineString',
                            coordinates: stop.polylineToNextStop
                                ? mapbox_polyline
                                    .decode(stop.polylineToNextStop)
                                    .map(([lat, lon]) => [lon, lat])
                                : []
                        },
                        properties: {
                            stopId  : stop.stopId,
                            sequence: stop.sequence
                        }
                    })
                )
                : [],
        [hide, stops]
    );

    return (
        <MapboxGeojsonLayer
            beforeLayer={MANIFEST_MAP_CONFIG.route_polyline_to_next_stop.layerId}
            features={{
                type    : 'FeatureCollection',
                features: routeFeatures
            }}
            layer={MANIFEST_LAYERS.route_from_stop_to_next_stop}
            layerId={MANIFEST_MAP_CONFIG.route_from_stop_to_next_stop.layerId}
            map={map}
            source={{
                type: 'geojson',
                data: {
                    type    : 'FeatureCollection',
                    features: routeFeatures
                }
            }}
            sourceId={MANIFEST_MAP_CONFIG.route_from_stop_to_next_stop.sourceId}
        />
    );
}

export default memo(StopsRouteLayer);
