/* eslint-disable func-call-spacing */
/* eslint-disable no-spaced-func */

import { useAppSelector } from '@/store/hooks';
import { useCallback, useEffect, useMemo, useRef } from 'react';

import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import layers_configs from '@/views/map/layers/layers_configs';
import { useBoundsMap } from '@/views/map/hooks/useBoundsMap';
import { MapHelper, isGpsCurrent } from '@/utils/mapbox-utils/map-helper';
import { TRAILER_STATUS_GRPC } from '@/models/fleet/trailers/trailers-mappings';
import { LayersProps } from './layer_options';
import { useMapTrailers } from '../hooks/trailers';

export default function LayerTrailers({ map }: LayersProps) {
    const selected_trailer_id = useAppSelector((state) => state.map.selected.trailer_id);
    const { trailers } = useMapTrailers();
    const MapWorker = useRef(new MapHelper(map)).current;
    const updateBounds = useBoundsMap(map);

    const trailersMap = trailers.reduce((acc, trailer) => {
        if (!trailer.trailerId) return acc;
        acc[trailer.trailerId] = trailer;
        return acc;
    }, {} as Record<string, (typeof trailers)[0]>);

    const locations = useAppSelector((state) => state.events.trailerLocations);

    const trailersLocationsMapRef = useRef<Map<string, (typeof locations)[0]>>(new Map());

    const trailersLocationsMap = useMemo(() => {
        const trailers_locations_map = new Map<string, (typeof locations)[0]>();
        Object.values(locations).forEach((location) => {
            if (!location.lon || !location.lat) return;
            const trailer = trailersMap[location.trailerId];
            if (!trailer) return;
            trailers_locations_map.set(trailer.trailerId, location);
        });
        return trailers_locations_map;
    }, [locations, trailersMap]);

    trailersLocationsMapRef.current = trailersLocationsMap;

    const loadTrailers = useCallback(() => {
        const entity_features: Feature<Geometry, GeoJsonProperties>[] = [];
        trailersLocationsMap.forEach((location) => {
            const trailer = trailersMap[location.trailerId];
            if (!trailer) return;
            entity_features.push({
                type    : 'Feature',
                geometry: {
                    type       : 'Point',
                    coordinates: [location.lon, location.lat]
                },

                properties: {
                    id          : trailer.trailerId,
                    type        : 'trailer.type',
                    status      : trailer.status || 'offline',
                    data        : 'trailer.data',
                    title       : trailer.referenceId,
                    status_color: isGpsCurrent(location.timestamp) ? 'blue' : '#3c3c3c'
                }
            });
        });

        MapWorker.geojson.updateSourceData(layers_configs.ids.trailers.source.trailers, {
            type    : 'FeatureCollection',
            features: entity_features
        });
    }, [trailersLocationsMap, trailersMap]);

    useEffect(() => {
        function addAdditionalSourceAndLayer() {
            MapWorker.addSource(
                layers_configs.ids.trailers.source.trailers,
                layers_configs.sources.trailers
            )
                .addLayer(layers_configs.layers.trailers.trailers)
                .addLayer(layers_configs.layers.trailers.label);
        }

        addAdditionalSourceAndLayer();

        map.on('style.load', addAdditionalSourceAndLayer);
        return () => {
            map.off('style.load', addAdditionalSourceAndLayer);
            MapWorker.removeLayer(layers_configs.ids.trailers.layer.trailers);
            MapWorker.removeLayer(layers_configs.ids.trailers.layer.labels);

            MapWorker.removeSource(layers_configs.ids.trailers.source.trailers);
        };
    }, []);

    useEffect(() => {
        updateBounds(selected_trailer_id, trailersLocationsMapRef.current);
    }, [selected_trailer_id, trailersLocationsMap.size]);

    useEffect(() => {
        loadTrailers();
        map.on('style.load', loadTrailers);
        return () => {
            map.off('style.load', loadTrailers);
        };
    }, [loadTrailers]);

    return null;
}
