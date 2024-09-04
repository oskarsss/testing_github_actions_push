/* eslint-disable consistent-return */
/* eslint-disable func-call-spacing */
/* eslint-disable no-spaced-func */
import { useEffect, useMemo, useRef } from 'react';

import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { useAppSelector } from '@/store/hooks';
import layers_configs from '@/views/map/layers/layers_configs';
import { useBoundsMap } from '@/views/map/hooks/useBoundsMap';
import { useMapSelectedView } from '@/store/map/hooks';
import { LayersProps } from './layer_options';
import { MapHelper, isGpsCurrent } from '../../../utils/mapbox-utils/map-helper';
import { useMapTrucks } from '../hooks/trucks';

export default function LayerTrucks({
    map,
    helicopter_view
}: LayersProps & { helicopter_view: boolean }) {
    const selected_truck_id = useAppSelector((state) => state.map.selected.truck_id);
    const selected_load_id = useAppSelector((state) => state.map.selected.load_id);
    const { selected_view_id } = useMapSelectedView();
    const { trucks } = useMapTrucks();
    const updateBounds = useBoundsMap(map);
    const MapWorker = useRef(new MapHelper(map)).current;

    const trucksMap = trucks.reduce((acc, truck) => {
        if (!truck.truckId) return acc;
        acc[truck.truckId] = truck;
        return acc;
    }, {} as Record<string, (typeof trucks)[0]>);

    const locations = useAppSelector((state) => state.events.truckLocations);
    const truckLocationsMapRef = useRef<Map<string, (typeof locations)[0]>>(new Map());

    const truckLocationsMap = useMemo(() => {
        const truck_locations_map = new Map<string, (typeof locations)[0]>();
        Object.values(locations).forEach((location) => {
            if (!location.lon || !location.lat) return;
            const truck = trucksMap[location.truckId];
            if (!truck) return;
            truck_locations_map.set(truck.truckId, location);
        });
        return truck_locations_map;
    }, [locations, trucksMap]);

    truckLocationsMapRef.current = truckLocationsMap;
    const loadTrucks = () => {
        const entity_features: Feature<Geometry, GeoJsonProperties>[] = [];
        truckLocationsMap.forEach((location) => {
            // if (selected_truck_id && selected_truck_id !== location.truckId) return;
            const truck = trucksMap[location.truckId];
            if (!truck) return;
            entity_features.push({
                type    : 'Feature',
                geometry: {
                    type       : 'Point',
                    coordinates: [location.lon, location.lat]
                },

                properties: {
                    id          : truck.truckId,
                    type        : 'truck.type',
                    status      : truck.status,
                    data        : 'truck.data',
                    title       : truck.referenceId,
                    status_color: isGpsCurrent(location.timestamp) ? 'blue' : '#3c3c3c'
                }
            });
        });

        MapWorker.geojson.updateSourceData(layers_configs.ids.trucks.source.trucks, {
            type    : 'FeatureCollection',
            features: entity_features
        });
    };

    useEffect(() => {
        loadTrucks();
    }, [locations, selected_truck_id]);

    const locationDependency =
        helicopter_view && selected_truck_id && selected_view_id === 'trucks'
            ? locations[selected_truck_id]
            : truckLocationsMap.size;

    useEffect(() => {
        if (selected_load_id) return;
        updateBounds(selected_truck_id, truckLocationsMapRef.current, helicopter_view);
    }, [selected_truck_id, helicopter_view, selected_load_id, locationDependency, updateBounds]);

    useEffect(() => {
        function addAdditionalSourceAndLayer() {
            MapWorker.addSource(
                layers_configs.ids.trucks.source.trucks,
                layers_configs.sources.trucks
            )
                .addLayer(layers_configs.layers.trucks.trucks)
                .addLayer(layers_configs.layers.trucks.label);
        }

        addAdditionalSourceAndLayer();

        map.on('style.load', addAdditionalSourceAndLayer);
        return () => {
            map.off('style.load', addAdditionalSourceAndLayer);
            MapWorker.removeLayer(layers_configs.ids.trucks.layer.trucks);
            MapWorker.removeLayer(layers_configs.ids.trucks.layer.labels);

            MapWorker.removeSource(layers_configs.ids.trucks.source.trucks);
        };
    }, []);

    useEffect(() => {
        loadTrucks();
        map.on('style.load', loadTrucks);
        return () => {
            map.off('style.load', loadTrucks);
        };
    }, [trucks]);

    return null;
}
