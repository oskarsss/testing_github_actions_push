/* eslint-disable consistent-return */
import { useAppSelector } from '@/store/hooks';

import type { Feature, GeoJsonProperties, Geometry } from 'geojson';
import { useEffect, useMemo, useRef } from 'react';
import DriversTypes from '@/store/fleet/drivers/types';
import layers_configs from '@/views/map/layers/layers_configs';
import { useBoundsMap } from '@/views/map/hooks/useBoundsMap';
import { useLastDriversLocation } from '@/store/streams/events/hooks';
import { useLoadsMapDrivers, useMapDrivers } from '../hooks/drivers';
import { LayersProps } from './layer_options';
import { MapHelper, isGpsCurrent } from '../../../utils/mapbox-utils/map-helper';

export default function LayerDrivers({
    map,
    entity
}: LayersProps & { entity: 'drivers' | 'loads' }) {
    const MapWorker = useRef(new MapHelper(map)).current;
    const selected_driver_id = useAppSelector((state) => state.map.selected.driver_id);
    const selected_load_id = useAppSelector((state) => state.map.selected.load_id);
    const dataHook = entity === 'drivers' ? useMapDrivers : useLoadsMapDrivers;
    const { drivers } = dataHook();
    const driversLocations = useLastDriversLocation();
    const updateBounds = useBoundsMap(map);
    const driversMap = useMemo(() => {
        const drivers_map = new Map<string, DriversTypes.DriverRow>();
        drivers.forEach((driver) => {
            drivers_map.set(driver.driverId, driver);
        });
        return drivers_map;
    }, [drivers]);

    const driversLocationsMapRef = useRef(driversLocations);

    driversLocationsMapRef.current = driversLocations;

    const loadDrivers = () => {
        const entity_features: Feature<Geometry, GeoJsonProperties>[] = [];
        driversLocations.forEach((location) => {
            if (selected_driver_id && selected_driver_id !== location.driverId) return;
            if (!location.lon || !location.lat) return;
            const driver = driversMap.get(location.driverId);
            if (!driver) return;

            entity_features.push({
                type    : 'Feature',
                geometry: {
                    type       : 'Point',
                    coordinates: [location.lon, location.lat]
                },

                properties: {
                    id    : driver.driverId,
                    type  : 'driver.type',
                    status: driver.status,
                    data  : 'driver.data',
                    title:
                        `${driver?.firstName} ${driver?.lastName}` ||
                        `${driver?.firstName || ''}${
                            driver?.lastName ? ` ${driver?.lastName}` : ''
                        }`,
                    status_color: isGpsCurrent(location.timestamp) ? 'blue' : '#b3b3b3'
                }
            });
        });

        MapWorker.geojson.updateSourceData(layers_configs.ids.drivers.source.drivers, {
            type    : 'FeatureCollection',
            features: entity_features
        });
    };

    useEffect(() => {
        if (selected_load_id) return;
        updateBounds(selected_driver_id, driversLocationsMapRef.current);
    }, [selected_driver_id, updateBounds]);

    useEffect(() => {
        function addAdditionalSourceAndLayer() {
            MapWorker.addSource(
                layers_configs.ids.drivers.source.drivers,
                layers_configs.sources.drivers
            )
                .addLayer(layers_configs.layers.drivers.drivers)
                .addLayer(layers_configs.layers.drivers.label);
        }

        addAdditionalSourceAndLayer();

        map.on('style.load', addAdditionalSourceAndLayer);
        return () => {
            map.off('style.load', addAdditionalSourceAndLayer);
            MapWorker.removeLayer(layers_configs.ids.drivers.layer.drivers);
            MapWorker.removeLayer(layers_configs.ids.drivers.layer.labels);

            MapWorker.removeSource(layers_configs.ids.drivers.source.drivers);
        };
    }, []);

    useEffect(() => {
        loadDrivers();
        map.on('style.load', loadDrivers);
        return () => {
            map.off('style.load', loadDrivers);
        };
    }, [drivers, driversLocations, selected_driver_id]);

    return null;
}
