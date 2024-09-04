import React, { memo, useMemo } from 'react';
import mapbox_polyline from '@mapbox/polyline';
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import MapboxGeojsonLayer from '@/@core/maps/MapboxGeojsonLayer';
import MANIFEST_LAYERS, { MANIFEST_MAP_CONFIG } from '../layers.config';

type Props = {
    polyline: string;
    map: mapboxgl.Map;
};

export type GeojsonSourceType =
    | string
    | Feature<Geometry, GeoJsonProperties>
    | FeatureCollection<Geometry, GeoJsonProperties>;

function FromTruckToNextStopLayer({
    polyline,
    map
}: Props) {
    const features: GeojsonSourceType = useMemo(
        () => ({
            type      : 'Feature',
            properties: {},
            geometry  : polyline
                ? mapbox_polyline.toGeoJSON(polyline)
                : {
                    type       : 'LineString',
                    coordinates: []
                }
        }),
        [polyline]
    );

    return (
        <MapboxGeojsonLayer
            features={features}
            layer={MANIFEST_LAYERS.route_polyline_to_next_stop}
            layerId={MANIFEST_MAP_CONFIG.route_polyline_to_next_stop.layerId}
            map={map}
            source={{
                type: 'geojson',
                data: features
            }}
            beforeLayer={MANIFEST_MAP_CONFIG.stops_pointers.layerId}
            sourceId={MANIFEST_MAP_CONFIG.route_polyline_to_next_stop.sourceId}
        />
    );
}

export default memo(FromTruckToNextStopLayer);
