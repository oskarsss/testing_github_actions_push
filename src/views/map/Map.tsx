import { useEffect, useRef, useState } from 'react';
import mapboxgl, { Popup } from 'mapbox-gl';
import { MAPBOX_TOKEN } from '@/configs';
import 'mapbox-gl/dist/mapbox-gl.css';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { MapActions } from '@/store/map/slice';
import LayerDrivers from '@/views/map/layers/LayerDrivers';
import { styled, useTheme } from '@mui/material/styles';
import { mapStyles } from '@/configs/mapbox';
import layers_configs from '@/views/map/layers/layers_configs';
import { useRouter } from 'next/router';
import { SpectrumWeather } from '@/views/map/controllers/WeatherControl';
import WeatherLayer from '@/views/map/layers/LayerWeather';
import { useMapSelectedView } from '@/store/map/hooks';
import LoadMapStyled from '@/views/dispatch/orders/Details/sections/load-map/LoadMap.styled';
import SatelliteViewSwitch from '@/@core/ui-kits/loads/loads-map/controllers/SatelliteViewSwitch';
import FullScreenSwitch from '@/@core/components/general-map/general-map-controllers/FullScreenSwitch';
import { Stack } from '@mui/material';
import WeatherController from '@/@core/ui-kits/loads/loads-map/controllers/weather/WeatherController';
import AutoFitFounds from '@/@core/ui-kits/loads/loads-map/controllers/AutoFitFounds';
import { useLocationFleet } from '@/store/dispatch/scheduling/hooks';
import LayerLoads from './layers/LayerLoads';
import LayerTrucks from './layers/LayerTrucks';
import LayerTrailers from './layers/LayerTrailers';

const MapWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'hasFitFound'
})<{ hasFitFound: boolean }>(({ hasFitFound }) => ({
    width                        : '100%',
    height                       : '100%',
    position                     : 'relative',
    '.mapboxgl-control-container': {
        '.mapboxgl-ctrl-top-right': {
            top: hasFitFound ? '183px' : '135px'
        }
    }
}));

let map: mapboxgl.Map;
let popup: Popup;

export default function Map() {
    const [isSatellite, setSatellite] = useState(false);
    const dispatch = useAppDispatch();
    const { selected_view_id } = useMapSelectedView();
    const selected_truck_id = useAppSelector((state) => state.map.selected.truck_id);
    const selected_driver_id = useAppSelector((state) => state.map.selected.driver_id);
    const selected_load_id = useAppSelector((state) => state.map.selected.load_id);

    const [map_loaded, setMapLoaded] = useState(false);
    const [helicopter_view, setHelicopterView] = useState(false);
    const [top_weather_menu, setTopWeatherMenu] = useState<number>(0);
    const { mode } = useTheme().palette;
    const [map_style, setMapStyle] = useState(mapStyles[mode]);
    const router = useRouter();
    const mapWrapper = useRef<HTMLDivElement | null>(null);

    const fleetLocation = useLocationFleet('', selected_truck_id || '');

    useEffect(() => {
        // eslint-disable-next-line no-import-assign
        mapboxgl.accessToken = MAPBOX_TOKEN;
        map = new mapboxgl.Map({
            container: mapWrapper.current || '',
            style    : map_style,

            center            : [-90.935242, 40.73061], // starting position
            zoom              : 4,
            pitch             : 0,
            bearing           : 0,
            attributionControl: false,
            trackResize       : true,
            projection        : {
                name: 'mercator'
            }
        });

        popup = new mapboxgl.Popup({
            closeButton : false,
            closeOnClick: false
        });

        map.addControl(
            new mapboxgl.NavigationControl({
                visualizePitch: true
            })
        );

        map.addControl(
            new mapboxgl.AttributionControl({
                compact          : true,
                customAttribution: '© 2023 Powered by Veido Solutions'
            })
        );

        const addTerrain = () => {
            map.addSource('mapbox-dem', {
                type    : 'raster-dem',
                url     : 'mapbox://mapbox.mapbox-terrain-dem-v1',
                tileSize: 512,
                maxzoom : 14
            });
            map.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
        };

        map.on('style.load', addTerrain);
        map.on('load', () => {
            setMapLoaded(true);
        });
        return () => {
            map?.off('style.load', addTerrain);
        };
    }, []);

    useEffect(() => {
        if (!map_loaded) return () => {};

        const layer_ids = [
            layers_configs.ids.drivers.layer.drivers,
            layers_configs.ids.drivers.layer.labels,
            layers_configs.ids.trailers.layer.trailers,
            layers_configs.ids.trailers.layer.labels,
            layers_configs.ids.trucks.layer.trucks,
            layers_configs.ids.trucks.layer.labels
        ];

        const mouseenter = () => {
            if (!map) return;
            // eslint-disable-next-line no-param-reassign
            map.getCanvas().style.cursor = 'pointer';
        };

        const mouseleave = () => {
            if (!map) return;
            // eslint-disable-next-line no-param-reassign
            map.getCanvas().style.cursor = '';
        };

        map.on('mouseenter', layer_ids, mouseenter);
        map.on('mouseleave', layer_ids, mouseleave);

        return () => {
            map?.off('mouseenter', layer_ids, mouseenter);
            map?.off('mouseleave', layer_ids, mouseleave);
        };
    }, [map_loaded]);

    const showSatteliteMap = helicopter_view && selected_truck_id && selected_view_id === 'trucks';

    useEffect(() => {
        setMapStyle(showSatteliteMap ? mapStyles.satellite : mapStyles[mode]);
    }, [mode, showSatteliteMap]);

    useEffect(() => {
        map.setStyle(map_style);
    }, [map_style]);

    useEffect(() => {
        dispatch(MapActions.resetSelectedEntities());
    }, [dispatch, selected_view_id]);

    useEffect(() => {
        const layer_ids = [
            layers_configs.ids.trucks.layer.trucks,
            layers_configs.ids.trucks.layer.labels,
            layers_configs.ids.trailers.layer.trailers,
            layers_configs.ids.trailers.layer.labels,
            layers_configs.ids.drivers.layer.drivers,
            layers_configs.ids.drivers.layer.labels
        ];

        const onClick = (event: mapboxgl.MapMouseEvent & mapboxgl.Event) => {
            const { features } = event;

            if (!features?.length) {
                return;
            }

            const feature = features[0];

            const body: {
                truck_id?: string;
                trailer_id?: string;
                driver_id?: string;
            } = {
                truck_id: feature.properties?.truck_id || ''
            };

            const type = feature.properties?.type?.replace('.type', '');

            switch (type) {
            case 'truck':
                body.truck_id = feature.properties?.id || '';
                break;
            case 'trailer':
                body.trailer_id = feature.properties?.id || '';
                break;
            case 'driver':
                body.driver_id = feature.properties?.id || '';
                break;
            default:
                break;
            }

            dispatch(MapActions.updateSelected(body));
            // eslint-disable-next-line no-param-reassign
            map.getCanvas().style.cursor = '';
        };

        map.on('click', layer_ids, onClick);
        return () => {
            map?.off('click', layer_ids, onClick);
        };
    }, [router.query?.selectedItem]);

    const hasFitFound = selected_truck_id && selected_view_id === 'trucks';

    return (
        <MapWrapper
            ref={mapWrapper}
            hasFitFound={Boolean(hasFitFound)}
        >
            <div id="main-map">
                {map_loaded && map && (
                    <>
                        {(selected_view_id === 'loads' || selected_truck_id) && (
                            <LayerLoads map={map} />
                        )}
                        {(selected_view_id === 'trucks' ||
                            (selected_truck_id && selected_load_id)) && (
                            <LayerTrucks
                                map={map}
                                helicopter_view={helicopter_view}
                            />
                        )}
                        {selected_view_id === 'trailers' && <LayerTrailers map={map} />}
                        {(selected_view_id === 'drivers' ||
                            (selected_load_id && selected_driver_id)) && (
                            <LayerDrivers
                                entity={selected_view_id === 'drivers' ? 'drivers' : 'loads'}
                                map={map}
                            />
                        )}
                        <WeatherLayer map={map} />
                    </>
                )}
            </div>
            <SpectrumWeather />

            {map && mapWrapper.current && (
                <LoadMapStyled.ContainerControllers>
                    {/* <LoadMapStyled.RowControllers> */}
                    <Stack
                        flexGrow={1}
                        sx={{
                            position: 'absolute',
                            top     : 5,
                            right   : 5
                        }}
                        alignItems="flex-end"
                        gap="inherit"
                    >
                        <FullScreenSwitch
                            mapRef={map}
                            wrapRef={mapWrapper.current}
                        />
                        <SatelliteViewSwitch
                            isSatellite={isSatellite}
                            setSatellite={setSatellite}
                            map={map}
                        />
                        <WeatherController storageKey="map_page" />

                        {hasFitFound && (
                            <AutoFitFounds
                                truck_id={selected_truck_id}
                                fleetLocation={fleetLocation}
                                isAutoFitFounds={helicopter_view}
                                setIsAutoFitFounds={setHelicopterView}
                            />
                        )}
                    </Stack>
                    {/* </LoadMapStyled.RowControllers> */}
                </LoadMapStyled.ContainerControllers>
            )}
        </MapWrapper>
    );
}
