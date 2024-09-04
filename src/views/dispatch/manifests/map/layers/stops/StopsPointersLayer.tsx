import React, { memo, useMemo } from 'react';
import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import MapboxGeojsonLayer from '@/@core/maps/MapboxGeojsonLayer';
import { PreparedMapStop } from '../../utils';
import MANIFEST_LAYERS, { MANIFEST_MAP_CONFIG } from '../../layers.config';

type Props = { preparedStops: PreparedMapStop[]; map: mapboxgl.Map };

function StopsPointersLayer({
    preparedStops,
    map
}: Props) {
    const features: Feature<Geometry, GeoJsonProperties>[] = useMemo(
        () =>
            preparedStops
                .filter((stop) => stop.lonLat)
                .map(
                    (stop): Feature<Geometry, GeoJsonProperties> => ({
                        type    : 'Feature',
                        geometry: {
                            type       : 'Point',
                            coordinates: stop.lonLat as [number, number]
                        },
                        properties: {
                            stopId  : stop.stopId,
                            sequence: stop.sequence,
                            stopType: stop.type
                        }
                    })
                ),
        [preparedStops]
    );

    return (
        <MapboxGeojsonLayer
            features={{
                type: 'FeatureCollection',
                features
            }}
            layer={MANIFEST_LAYERS.stops_pointers}
            layerId={MANIFEST_MAP_CONFIG.stops_pointers.layerId}
            map={map}
            source={{
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features
                }
            }}
            sourceId={MANIFEST_MAP_CONFIG.stops_pointers.sourceId}
        />
    );
}

export default memo(StopsPointersLayer);
