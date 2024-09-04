import { first } from 'lodash';
import { memo, useEffect, useRef } from 'react';

type Props = {
    features: any;
    layer: mapboxgl.AnyLayer;
    layerId: string;
    map: mapboxgl.Map;
    source: mapboxgl.AnySourceData;
    sourceId: string;
    beforeLayer?: string;
};

function MapboxGeojsonLayer({
    layerId,
    sourceId,
    features,
    map,
    layer,
    source,
    beforeLayer
}: Props) {
    useEffect(() => {
        const initSourcesAndLayers = () => {
            if (!map.getSource(sourceId)) {
                map.addSource(sourceId, source);
            } else {
                (map.getSource(sourceId) as mapboxgl.GeoJSONSource).setData(features);
            }
            if (!map.getLayer(layerId)) {
                map.addLayer(layer, beforeLayer);
            }
        };
        initSourcesAndLayers();
        map.on('style.load', initSourcesAndLayers);

        return () => {
            map.off('style.load', initSourcesAndLayers);
        };
    }, [beforeLayer, features, layer, layerId, map, source, sourceId]);

    return null;
}

export default memo(MapboxGeojsonLayer);
