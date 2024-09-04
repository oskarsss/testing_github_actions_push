import mapboxgl, { GeoJSONSource } from 'mapbox-gl';
import { useCallback, useEffect, useRef } from 'react';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MapActions } from '@/store/map/slice';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feature } from 'geojson';
import imageSrcPickUp from '@/views/map/assets/Pick-up.png';
import imageSrcDropOff from '@/views/map/assets/Drop-off.png';
import layers_configs from '@/views/map/layers/layers_configs';
import { useLastDriversLocation } from '@/store/streams/events/hooks';
import { useMapSelectedView } from '@/store/map/hooks';
import { MapLoads } from '@/store/dispatch/loads/hooks';
import { LoadModel_Stop_Type } from '@proto/models/model_load';
import { useMapLoads } from '../hooks/loads';
import { MapHelper } from '../../../utils/mapbox-utils/map-helper';
import { LayersProps } from './layer_options';

const createStops = (load: MapLoads) => {
    const firstStop = load.firstOrderStop;
    const lastStop = load.lastOrderStop;
    const first_stop = firstStop?.location;
    const last_stop = lastStop?.location;

    if (!first_stop || !last_stop) return [];

    return [
        {
            type: firstStop?.loadStopType || firstStop?.manifestStopType,
            lat : first_stop?.lat,
            lon : first_stop?.lon,
            id  : `${first_stop?.lon} ${first_stop?.lat} ${first_stop?.city}`
        },
        {
            type: lastStop?.loadStopType || lastStop?.manifestStopType,
            lat : last_stop?.lat,
            lon : last_stop?.lon,
            id  : `${last_stop?.lon} ${last_stop?.lat} ${last_stop?.city}`
        }
    ];
};

const createMarkerImage = (src: string) => {
    const img = document.createElement('img');
    img.src = src;
    img.width = 36;
    img.style.aspectRatio = '24 / 26';
    return img;
};

type MapboxEvent = mapboxgl.MapMouseEvent & {
    features?: mapboxgl.MapboxGeoJSONFeature[] | undefined;
} & mapboxgl.Event;

export default function LayerLoads({ map }: LayersProps) {
    const dispatch = useAppDispatch();
    const { loads } = useMapLoads();
    const selected_load_id = useAppSelector((state) => state.map.selected.load_id);
    const selected_truck_id = useAppSelector((state) => state.map.selected.truck_id);
    const locations = useAppSelector((state) => state.events.truckLocations);
    const { selectView } = useMapSelectedView();
    const drivers_locations = useLastDriversLocation();
    const MapWorker = useRef(new MapHelper(map)).current;
    const pickUpMarker = useRef(
        new mapboxgl.Marker({
            element: createMarkerImage(imageSrcPickUp.src),
            anchor : 'bottom'
        })
    );

    const dropOffMarker = useRef(
        new mapboxgl.Marker({
            element: createMarkerImage(imageSrcDropOff.src),
            anchor : 'bottom'
        })
    );

    const selectLoad = useCallback(
        (load_id: string, truck_id: string, driver_id: string) => {
            if (selected_load_id !== load_id) {
                dispatch(
                    MapActions.updateSelected({
                        load_id,
                        truck_id,
                        driver_id
                    })
                );

                // router.push({
                //     query: {
                //         ...router.query,
                //         selectedItem: JSON.stringify({
                //             itemId: load_id,
                //             entity: 'load',
                //             truck_id,
                //             driver_id
                //         })
                //     }
                // });
                return;
            }

            dispatch(
                MapActions.updateSelected({
                    load_id  : '',
                    truck_id : '',
                    driver_id: ''
                })
            );

            // const updQuery = { ...router.query };
            // delete updQuery.selectedItem;
            // router.push({
            //     query: updQuery
            // });
        },
        [dispatch, selected_load_id]
    );

    // const {
    //     data: waypoints,
    //     isError,
    //     isFetching,
    //     isLoading,
    //     refetch
    // } = LoadsAPI.Load.load.useGetWaypointsQuery(selected_load_id, {
    //     skip: !selected_load_id || !loads.some((load) => load.load_id === selected_load_id)
    // });
    //
    // useEffect(() => {
    //     if (waypoints?.polyline) return;
    //     if (isError || isFetching || isLoading) return;
    //     if (!selected_load_id) return;
    //     refetch();
    // }, [selected_load_id, waypoints, refetch, isError, isFetching, isLoading]);

    useEffect(() => {
        const layer_ids = [
            layers_configs.ids.loads.layer.lines_popup,
            layers_configs.ids.loads.layer.stops
        ];
        const linesHighlightListener = (e: MapboxEvent) => {
            // eslint-disable-next-line no-param-reassign
            map.getCanvas().style.cursor = 'pointer';
            if (selected_load_id) return;
            const feature = e.features?.[0] as unknown as GeoJSON.Feature<
                GeoJSON.LineString,
                { id: string }
            >;
            if (!feature || !feature.properties?.id) return;
            const load_id = feature.properties.id;
            const load = loads.find((load) => load.loadId === load_id);
            const lastStop = load?.lastOrderStop;
            const firstStop = load?.firstOrderStop;
            if (firstStop?.location && lastStop?.location && load) {
                const first_stop = firstStop.location;
                const last_stop = lastStop.location;

                const first_stop_lon = first_stop.lon;
                const first_stop_lat = first_stop.lat;
                const last_stop_lon = last_stop.lon;
                const last_stop_lat = last_stop.lat;

                if (first_stop_lat && first_stop_lon) {
                    pickUpMarker.current.setLngLat([first_stop_lon, first_stop_lat]).addTo(map);
                }
                if (last_stop_lat && last_stop_lon) {
                    dropOffMarker.current.setLngLat([last_stop_lon, last_stop_lat]).addTo(map);
                }

                if (first_stop_lat && first_stop_lon && last_stop_lat && last_stop_lon) {
                    MapWorker.geojson.updateSourceData(
                        layers_configs.ids.loads.source.lines_hover,
                        {
                            type    : 'Feature',
                            geometry: {
                                type       : 'LineString',
                                coordinates: [
                                    [first_stop_lon, first_stop_lat],
                                    [last_stop_lon, last_stop_lat]
                                ]
                            },
                            properties: {
                                id       : load?.loadId,
                                truck_id : load?.truckId,
                                driver_id: load?.driverId
                            }
                        }
                    );
                }
            }
        };

        map.on('mouseenter', layer_ids, linesHighlightListener);

        const leaveLinesHighlightListener = () => {
            // eslint-disable-next-line no-param-reassign
            map.getCanvas().style.cursor = '';
            if (selected_load_id) return;

            MapWorker.geojson.updateSourceData(
                layers_configs.ids.loads.source.lines_hover,
                layers_configs.sources.loads.lines_hover
            );

            pickUpMarker.current?.remove();
            dropOffMarker.current?.remove();
        };

        map.on('mouseleave', layer_ids, leaveLinesHighlightListener);

        const updateLoadSourceData = () => {
            if (selected_load_id) {
                if (false) {
                    // waypoints?.polyline
                    // MapWorker.geojson.updateSourceData(
                    //     layers_configs.ids.loads.source.lines_hover,
                    //     layers_configs.sources.loads.lines_hover
                    // );
                    // MapWorker.geojson.updateSourceData(layers_configs.ids.loads.source.lines, {
                    //     type      : 'Feature',
                    //     geometry  : polyline.toGeoJSON(waypoints.polyline),
                    //     properties: {}
                    // });
                } else {
                    MapWorker.geojson.updateSourceData(layers_configs.ids.loads.source.lines, {
                        type    : 'Feature',
                        geometry: {
                            type       : 'LineString',
                            coordinates: []
                        },
                        properties: {}
                    });
                    const load = loads.find((load) => load.loadId === selected_load_id);
                    const lastStop = load?.lastOrderStop;
                    const firstStop = load?.firstOrderStop;
                    if (firstStop?.location && lastStop?.location) {
                        const first_stop = firstStop.location;
                        const last_stop = lastStop.location;

                        const first_stop_lon = first_stop.lon;
                        const first_stop_lat = first_stop.lat;
                        const last_stop_lon = last_stop.lon;
                        const last_stop_lat = last_stop.lat;

                        MapWorker.geojson.updateSourceData(
                            layers_configs.ids.loads.source.lines_hover,
                            {
                                type    : 'Feature',
                                geometry: {
                                    type       : 'LineString',
                                    coordinates: [
                                        [first_stop_lon, first_stop_lat],
                                        [last_stop_lon, last_stop_lat]
                                    ]
                                },
                                properties: {
                                    id       : load?.loadId,
                                    truck_id : load?.truckId,
                                    driver_id: load?.driverId
                                }
                            }
                        );
                    }
                }

                const load = loads.find((load) => load.loadId === selected_load_id);
                const lastStop = load?.lastOrderStop;
                const firstStop = load?.firstOrderStop;
                if (!load || !firstStop?.location || !lastStop?.location) return;

                const first_stop = firstStop.location;
                const last_stop = lastStop.location;

                const first_stop_lon = first_stop.lon;
                const first_stop_lat = first_stop.lat;
                const last_stop_lon = last_stop.lon;
                const last_stop_lat = last_stop.lat;

                if (first_stop_lat && first_stop_lon) {
                    pickUpMarker.current.setLngLat([first_stop_lon, first_stop_lat]).addTo(map);
                }
                if (last_stop_lat && last_stop_lon) {
                    dropOffMarker.current.setLngLat([last_stop_lon, last_stop_lat]).addTo(map);
                }

                return;
            }

            const loadLinesSource = map.getSource(
                layers_configs.ids.loads.source.lines
            ) as GeoJSONSource;

            const featuresLoadLines: Feature[] = loads
                .filter(({ truckId }) => (selected_truck_id ? truckId === selected_truck_id : true))
                .filter((load) => {
                    const lastStop = load.lastOrderStop;
                    const firstStop = load.firstOrderStop;
                    return (
                        firstStop?.location?.lon &&
                        firstStop?.location?.lat &&
                        lastStop?.location?.lat &&
                        lastStop?.location?.lon
                    );
                })
                .map((load) => {
                    const lastStop = load.lastOrderStop;
                    const firstStop = load.firstOrderStop;
                    let coordinates: [number, number][] = [];
                    if (firstStop?.location && lastStop?.location) {
                        coordinates = [
                            [firstStop?.location?.lon, firstStop?.location?.lat],
                            [lastStop?.location?.lon, lastStop?.location?.lat]
                        ];
                    }
                    return {
                        type    : 'Feature',
                        geometry: {
                            type: 'LineString',
                            coordinates
                        },
                        properties: {
                            id        : load.loadId,
                            truck_id  : load.truckId,
                            driver_id : load.driverId,
                            color     : '#707070',
                            opacity   : 0.5,
                            arrow_size: 10
                        }
                    };
                });

            if (loadLinesSource) {
                loadLinesSource.setData({
                    type    : 'FeatureCollection',
                    features: featuresLoadLines
                });
            } else {
                map.addSource(layers_configs.ids.loads.source.lines, {
                    type: 'geojson',
                    data: {
                        type    : 'FeatureCollection',
                        features: featuresLoadLines
                    }
                });
            }
        };
        updateLoadSourceData();
        map.on('style.load', updateLoadSourceData);
        return () => {
            map.off('style.load', updateLoadSourceData);
            map.off('mouseenter', layer_ids, linesHighlightListener);
            map.off('mouseleave', layer_ids, leaveLinesHighlightListener);
            pickUpMarker.current?.remove();
            dropOffMarker.current?.remove();
        };
    }, [selected_load_id, loads]);

    useEffect(() => {
        function addAdditionalSourceAndLayer() {
            MapWorker.addSource(
                layers_configs.ids.loads.source.lines,
                layers_configs.sources.loads.lines
            )
                .addLayer(layers_configs.layers.loads.lines)
                .addLayer(layers_configs.layers.loads.arrows)
                .addLayer(layers_configs.layers.loads.lines_popup);

            MapWorker.addSource(
                layers_configs.ids.loads.source.stops,
                layers_configs.sources.loads.stops
            ).addLayer(layers_configs.layers.loads.stops);

            MapWorker.addSource(
                layers_configs.ids.loads.source.lines_hover,
                layers_configs.sources.loads.lines
            ).addLayer(layers_configs.layers.loads.lines_hover);
        }
        addAdditionalSourceAndLayer();

        map.on('style.load', addAdditionalSourceAndLayer);

        MapWorker.loadImage('pick-up-image', imageSrcPickUp.src);
        MapWorker.loadImage('drop-off-image', imageSrcDropOff.src);

        return () => {
            MapWorker.removeImage('pick-up-image');
            MapWorker.removeImage('drop-off-image');

            map.off('style.load', addAdditionalSourceAndLayer);
            MapWorker.removeLayer(layers_configs.ids.loads.layer.lines);
            MapWorker.removeLayer(layers_configs.ids.loads.layer.arrows);
            MapWorker.removeLayer(layers_configs.ids.loads.layer.lines_popup);
            MapWorker.removeLayer(layers_configs.ids.loads.layer.stops);
            MapWorker.removeLayer(layers_configs.ids.loads.layer.lines_hover);

            MapWorker.removeSource(layers_configs.ids.loads.source.stops);
            MapWorker.removeSource(layers_configs.ids.loads.source.lines_hover);
            MapWorker.removeSource(layers_configs.ids.loads.source.lines);

            pickUpMarker.current?.remove();
            dropOffMarker.current?.remove();
        };
    }, []);

    useEffect(() => {
        const bounds = new mapboxgl.LngLatBounds();
        const extendsBounds = (load: MapLoads) => {
            const lastStop = load.lastOrderStop;
            const firstStop = load.firstOrderStop;

            const first_stop = firstStop;
            const last_stop = lastStop;

            const first_stop_lon = first_stop?.location?.lon;
            const first_stop_lat = first_stop?.location?.lat;
            const last_stop_lon = last_stop?.location?.lon;
            const last_stop_lat = last_stop?.location?.lat;

            if (!first_stop_lon || !first_stop_lat || !last_stop_lon || !last_stop_lat) return;
            bounds.extend([first_stop_lon, first_stop_lat]);
            bounds.extend([last_stop_lon, last_stop_lat]);
        };

        if (selected_load_id) {
            const load = loads.find((load) => load.loadId === selected_load_id);

            if (!load) return;
            if (load.truckId && locations[load.truckId]) {
                const {
                    lon,
                    lat
                } = locations[load.truckId] || {};
                if (lon && lat) {
                    bounds.extend([lon, lat]);
                }
            }
            if (load.driverId && drivers_locations.has(load.driverId)) {
                const {
                    lon,
                    lat
                } = drivers_locations.get(load.driverId) || {};
                if (lon && lat) {
                    bounds.extend([lon, lat]);
                }
            }
            extendsBounds(load);
        } else {
            loads.forEach((load) => extendsBounds(load));
        }

        if (!bounds.isEmpty()) {
            map.fitBounds(bounds, { padding: 100, essential: true });
        }
    }, [
        loads.length,
        selected_load_id,
        map,
        Object.keys(locations || {}).length,
        drivers_locations.size
    ]);

    useEffect(() => {
        const clickListener = (e: MapboxEvent) => {
            const feature = e.features?.[0] as unknown as GeoJSON.Feature<
                GeoJSON.LineString,
                { id: number; truck_id: string; driver_id: string }
            >;
            if (!feature) return;
            selectLoad(
                feature.properties?.id?.toString() || '',
                feature.properties?.truck_id || '',
                feature.properties?.driver_id || ''
            );
            selectView('loads');

            MapWorker.geojson.updateSourceData(
                layers_configs.ids.loads.source.lines_hover,
                layers_configs.sources.loads.lines_hover
            );
        };
        const layer_ids = [
            layers_configs.ids.loads.layer.lines_popup,
            layers_configs.ids.loads.layer.stops,
            layers_configs.ids.loads.layer.lines_hover
        ];

        map.on('click', layer_ids, clickListener);
        return () => {
            map.off('click', layer_ids, clickListener);
        };
    }, [selectLoad, selectView]);

    useEffect(() => {
        const updateStops = () => {
            MapWorker.geojson.updateSourceData(layers_configs.ids.loads.source.stops, {
                type    : 'FeatureCollection',
                features: loads
                    .filter(({ truckId }) =>
                        selected_truck_id ? truckId === selected_truck_id : true)
                    .map((load) => {
                        const stops = createStops(load);
                        return stops
                            .filter((stop) => stop.lat && stop.lon)
                            .map((stop) => ({
                                type    : 'Feature',
                                geometry: {
                                    type       : 'Point',
                                    coordinates: [stop.lon, stop.lat]
                                },
                                properties: {
                                    id       : load.loadId,
                                    truck_id : load.truckId,
                                    driver_id: load.driverId,
                                    color:
                                        stop.type === LoadModel_Stop_Type.pickup
                                            ? '#1FDC00'
                                            : '#F73434',
                                    opacity:
                                        !selected_load_id || selected_load_id === load.loadId
                                            ? 1
                                            : 0
                                }
                            }));
                    })
                    .flat() as Feature[]
            });
        };
        updateStops();
        map.on('style.load', updateStops);
        return () => {
            map.off('style.load', updateStops);
        };
    }, [loads, selected_load_id]);

    return null;
}
