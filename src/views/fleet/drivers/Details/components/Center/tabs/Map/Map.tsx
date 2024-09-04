import mapboxgl, { LngLatLike } from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect, useRef, useState } from 'react';
import { MAPBOX_TOKEN } from '@/configs';
import FullScreenSwitch from '@/@core/components/general-map/general-map-controllers/FullScreenSwitch';
import DriversTypes from '@/store/fleet/drivers/types';
import ViewOnGoogleMaps from '@/views/fleet/drivers/Details/components/Center/tabs/Map/components/ViewOnGoogleMaps';
import { mapStyles } from '@/configs/mapbox';
import { styled, useTheme } from '@mui/material/styles';
import { useUpdateEffect } from 'usehooks-ts';
import SatelliteViewSwitch from '@/@core/ui-kits/loads/loads-map/controllers/SatelliteViewSwitch';
import WeatherController from '@/@core/ui-kits/loads/loads-map/controllers/weather/WeatherController';
import WeatherLayer from '@/@core/components/general-map/general-map-layers/WeatherLayer';
import MapTruckLayer from '@/views/fleet/drivers/Details/components/Center/tabs/Map/components/layers/MapTruckLayer';
import {
    ListenReply_DriverDeviceLocations,
    ListenReply_TrailerLocations,
    ListenReply_TruckLocations
} from '@proto/events_serv';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import MapTrailerLayer from '@/views/fleet/drivers/Details/components/Center/tabs/Map/components/layers/MapTrailerLayer';
import { useLastDriverLocation } from '@/store/streams/events/hooks';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { MapHelper } from '@/utils/mapbox-utils/map-helper';
import LoadMapStyled from '@/views/dispatch/orders/Details/sections/load-map/LoadMap.styled';
import LayerDriver from './components/layers/MapDriverLayer';
import MapLeftPanel from './components/MapLeftPanel';
import map_options from './components/map_options';

const Container = styled('div')({
    width       : 'auto',
    height      : '100%',
    maxHeight   : '100%',
    borderRadius: 8,
    margin      : 16
});

type Props = {
    driver_id?: DriversTypes.Driver['driverId'];
    driver_full_name?: string;
    driverLocations?: Record<string, ListenReply_DriverDeviceLocations['locations'][0]>;
    truckLocation?: ListenReply_TruckLocations['locations'][0];
    trailerLocation?: ListenReply_TrailerLocations['locations'][0];
    truck_model?: string;
    trailer_reference_id?: string;
    devices?: DriversTypes.DriverDevice[];
    type: 'driver' | 'truck' | 'trailer';
};

export default function Map({
    driver_id,
    driver_full_name,
    truck_model,
    truckLocation,
    trailerLocation,
    driverLocations,
    trailer_reference_id,
    devices,
    type
}: Props) {
    const dispatch = useAppDispatch();
    const coordinates = useAppSelector((state) => state.drivers.coordinates);
    const [isSatellite, setIsSatellite] = useState(false);
    const [map_loaded, setMapLoaded] = useState(false);
    const mapContainer = useRef<HTMLDivElement | null>(null);
    const map = useRef<mapboxgl.Map>();
    const { mode } = useTheme().palette;
    const [map_style, setMapStyle] = useState(mapStyles[mode]);
    const lastDriverLocation = useLastDriverLocation(driver_id);
    const MapWorker = useRef<MapHelper>();

    const popup = new mapboxgl.Popup({
        closeButton : false,
        closeOnClick: false,
        offset      : 20,
        anchor      : 'top-left'
    });

    useUpdateEffect(() => {
        setMapStyle(mapStyles[mode]);
    }, [mode]);

    useEffect(() => {
        mapboxgl.accessToken = MAPBOX_TOKEN;
        map.current = new mapboxgl.Map({
            container         : mapContainer.current || '',
            style             : map_style,
            center            : [-90.935242, 40.73061], // starting position
            zoom              : 4,
            attributionControl: false,
            trackResize       : true,
            projection        : {
                name: 'mercator'
            }
        });

        const show3DBuildings = () => {
            if (!map.current) return;
            const mapStyles = map.current.getStyle();
            const layers = mapStyles?.layers || [];
            const labelLayerId = layers.find(
                (layer) => layer.type === 'symbol' && layer.layout && layer.layout['text-field']
            )?.id;

            map.current.addLayer(
                {
                    id            : 'add-3d-buildings',
                    source        : 'composite',
                    'source-layer': 'building',
                    filter        : ['==', 'extrude', 'true'],
                    type          : 'fill-extrusion',
                    minzoom       : 15,
                    paint         : {
                        'fill-extrusion-color' : '#aaa',
                        'fill-extrusion-height': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'height']
                        ],
                        'fill-extrusion-base': [
                            'interpolate',
                            ['linear'],
                            ['zoom'],
                            15,
                            0,
                            15.05,
                            ['get', 'min_height']
                        ],
                        'fill-extrusion-opacity': 0.6
                    }
                },
                labelLayerId
            );
        };

        const displayTerrain = () => {
            if (!map.current) return;
            map.current.addSource('mapbox-dem', {
                type    : 'raster-dem',
                url     : 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom : 14
            });
            map.current.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
        };

        const displayTraffic = () => {
            if (!map.current) return;
            map.current.addSource('mapbox-traffic', {
                type: 'vector',
                url : 'mapbox://mapbox.mapbox-traffic-v1'
            });
            map.current.addLayer({
                id            : 'traffic',
                type          : 'line',
                source        : 'mapbox-traffic',
                'source-layer': 'traffic',
                paint         : {
                    'line-width': [
                        'interpolate',
                        ['linear'],
                        ['zoom'],
                        12,
                        ['match', ['get', 'class'], 'motorway', 2, 1],
                        16,
                        ['match', ['get', 'class'], 'motorway', 6, 4],
                        20,
                        ['match', ['get', 'class'], 'motorway', 20, 10],
                        22,
                        ['match', ['get', 'class'], 'motorway', 40, 20],
                        23,
                        ['match', ['get', 'class'], 'motorway', 80, 40]
                    ],
                    'line-color': [
                        'match',
                        ['get', 'congestion'],
                        'low',
                        '#2DC4B2',
                        'moderate',
                        '#EED322',
                        'heavy',
                        '#E6B71E',
                        'severe',
                        '#DA3838',
                        '#ccc'
                    ]
                }
            });
        };

        const afterLoad = () => {
            if (map.current) {
                MapWorker.current = new MapHelper(map.current);
            }
            setMapLoaded(true);
        };

        map.current.on('style.load', show3DBuildings);
        map.current.on('style.load', displayTerrain);
        map.current.on('style.load', displayTraffic);
        map.current.on('load', afterLoad);

        return () => {
            if (map.current) {
                map.current.off('style.load', show3DBuildings);
                map.current.off('style.load', displayTerrain);
                map.current.off('style.load', displayTraffic);
                map.current.off('load', afterLoad);
            }
        };
    }, []);

    useUpdateEffect(() => {
        map.current?.setStyle(map_style);
    }, [map_style]);

    const onChangeSatelliteStyle = () => {
        setMapStyle((prev) => {
            if (prev === mapStyles.satellite) {
                return mapStyles[mode];
            }
            return mapStyles.satellite;
        });
    };

    useEffect(() => {
        if (coordinates.length) {
            map.current?.flyTo({
                center   : coordinates as LngLatLike,
                zoom     : 15,
                essential: true
            });
        }
    }, [coordinates]);

    useEffect(() => {
        let lon = null;
        let lat = null;
        if (type === 'driver' && lastDriverLocation) {
            lon = lastDriverLocation.lon;
            lat = lastDriverLocation.lat;
        }

        if (type === 'truck' && truckLocation) {
            lon = truckLocation.lon;
            lat = truckLocation.lat;
        }

        if (type === 'trailer' && trailerLocation) {
            lon = trailerLocation.lon;
            lat = trailerLocation.lat;
        }

        if (lat && lon) {
            dispatch(DriverActions.setFirstRenderCoordinates([lon, lat]));
            map.current?.flyTo({
                center   : [lon, lat],
                zoom     : 4,
                essential: true
            });
        }

        return () => {
            dispatch(DriverActions.setFirstRenderCoordinates([]));
            dispatch(DriverActions.setCoordinates([]));
        };
    }, []);

    return (
        <Container ref={mapContainer}>
            {map_loaded && map.current && (
                <>
                    {driverLocations && driver_id && devices && (
                        <LayerDriver
                            map={map.current}
                            driverLocations={driverLocations}
                            driver_id={driver_id}
                            devices={devices}
                            popup={popup}
                        />
                    )}

                    {truckLocation && truck_model && (
                        <MapTruckLayer
                            map={map.current}
                            truckLocation={truckLocation}
                            truck_model={truck_model}
                            popup={popup}
                        />
                    )}

                    {trailerLocation && trailer_reference_id && (
                        <MapTrailerLayer
                            map={map.current}
                            trailerLocation={trailerLocation}
                            trailer_reference_id={trailer_reference_id}
                            popup={popup}
                        />
                    )}

                    {MapWorker.current && (
                        <WeatherLayer
                            weatherStoreKey="details_page"
                            map={map.current}
                            beforeLayer={map_options.layers.driver}
                        />
                    )}
                </>
            )}

            <MapLeftPanel
                full_name={driver_full_name}
                devices={devices}
                truckLocation={truckLocation}
                truck_model={truck_model}
                trailer_reference_id={trailer_reference_id}
                driverLocations={driverLocations}
                driver_id={driver_id}
                trailerLocation={trailerLocation}
            />

            <LoadMapStyled.ContainerControllers>
                <LoadMapStyled.RowControllers>
                    <LoadMapStyled.WrapControllers>
                        {map.current && mapContainer.current && (
                            <>
                                <SatelliteViewSwitch
                                    isSatellite={isSatellite}
                                    setSatellite={setIsSatellite}
                                    map={map.current}
                                />
                                <FullScreenSwitch
                                    mapRef={map.current}
                                    wrapRef={mapContainer.current}
                                />
                            </>
                        )}
                    </LoadMapStyled.WrapControllers>
                </LoadMapStyled.RowControllers>
                <LoadMapStyled.RowControllers>
                    <LoadMapStyled.WrapControllers>
                        <WeatherController storageKey="details_page" />
                    </LoadMapStyled.WrapControllers>
                </LoadMapStyled.RowControllers>
            </LoadMapStyled.ContainerControllers>

            <ViewOnGoogleMaps />
        </Container>
    );
}
