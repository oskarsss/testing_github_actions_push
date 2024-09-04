/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
/* eslint-disable consistent-return */
/* eslint-disable react/jsx-indent */
import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import { MapStyles, mapStyles } from '@/configs/mapbox';
import { useTheme } from '@mui/material';
import { MapHelper } from '@/utils/mapbox-utils/map-helper';
import Preloader from '@/@core/ui-kits/basic/preloader/Preloader';
import { MAPBOX_TOKEN } from '@/configs';
import { layers } from '@/views/dispatch/orders/Details/sections/load-map/config';
import GeneralMapStyled from './GeneralMap.styled';

type Props = {
    containerStyle?: React.CSSProperties;
    initialMapStyle?: MapStyles;
};

export type GeneralMapContentProps = {
    mapWorker: MapHelper;
    mapWrapper: HTMLDivElement;
    map: mapboxgl.Map;
    mapMode: string;
};

type HocOptionsType = {
    turnOffTerrain?: boolean;
    turnOffTraffic?: boolean;
    turnOffBuilding3D?: boolean;
};

mapboxgl.accessToken = MAPBOX_TOKEN;

type FuncChildrenProp = {
    children: React.ReactNode | ((props: GeneralMapContentProps & Props) => React.ReactNode);
};

function GeneralMapComponent({
    children,
    turnOffBuilding3D,
    turnOffTerrain,
    turnOffTraffic,
    ...props
}: Props & HocOptionsType & FuncChildrenProp) {
    const { containerStyle } = props;
    const { mode } = useTheme().palette;

    const [mapMode, setMapMode] = useState(mode);
    const [mapLoaded, setMapLoaded] = useState(false);

    const [map, setMap] = useState<mapboxgl.Map | null>(null);
    const mapWrapper = useRef<HTMLDivElement | null>(null);

    const MapWorker = useRef<MapHelper>();

    useEffect(() => {
        if (map && mapMode !== mode) {
            setMapLoaded(() => {
                map.setStyle(mapStyles[mode]);
                return false;
            });

            setMapMode(mode);
        }
    }, [mode, map, mapMode]);

    useEffect(() => {
        const mapboxMap = new mapboxgl.Map({
            container  : mapWrapper.current || '',
            style      : props?.initialMapStyle ? mapStyles[props.initialMapStyle] : mapStyles[mode],
            center     : [-90.935242, 40.73061],
            zoom       : 4,
            trackResize: true,
            projection : {
                name: 'mercator'
            }
        });
        const RotateControl = new mapboxgl.NavigationControl({
            showCompass   : true,
            showZoom      : false,
            visualizePitch: true
        });

        mapboxMap.addControl(RotateControl, 'bottom-left');
        setMap(mapboxMap);
        const mapWorker = new MapHelper(mapboxMap);
        MapWorker.current = mapWorker;
    }, []);

    useEffect(() => {
        if (!map || !MapWorker) return;
        const afterLoad = () => {
            if (map) {
                setMapLoaded(map.isStyleLoaded());
            }
        };

        map.on('load', afterLoad);

        const setTerrain = () => {
            const maps = map;
            if (!maps) return;
            const style = maps.getStyle();
            if (!style) return;
            const labelLayerId = style.layers.find(
                (layer) => layer.type === 'symbol' && layer.layout && layer.layout['text-field']
            )?.id;

            if (!turnOffBuilding3D) {
                maps.addLayer(layers.buildings_3d, labelLayerId);
            }

            if (!turnOffTerrain) {
                maps.addSource('mapbox-dem', {
                    type    : 'raster-dem',
                    url     : 'mapbox://mapbox.mapbox-terrain-dem-v1',
                    tileSize: 512,
                    maxzoom : 14
                });
                maps.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
            }

            if (!turnOffTraffic) {
                maps.addSource('mapbox-traffic', {
                    type: 'vector',
                    url : 'mapbox://mapbox.mapbox-traffic-v1'
                });
                maps.addLayer(layers.traffic);
            }
        };

        map.on('style.load', () => {
            setMapLoaded(true);
            setTerrain();
            MapWorker.current?.geojson.updateAllSourcesData();
            MapWorker.current?.readdLayers();
        });
    }, [map, turnOffBuilding3D, turnOffTerrain, turnOffTraffic]);

    useEffect(() => {
        if (!('ResizeObserver' in window)) return;

        const onResize = () => {
            if (map) {
                map.resize();
            }
        };

        const observer = new window.ResizeObserver(onResize);
        if (mapWrapper.current) observer.observe(mapWrapper.current);

        return () => {
            observer.disconnect();
        };
    }, [map]);

    return (
        <GeneralMapStyled.Map ref={mapWrapper}>
            {mapLoaded && MapWorker.current && map && mapWrapper.current ? (
                typeof children === 'function' ? (
                    children({
                        containerStyle,
                        mapWorker : MapWorker.current,
                        mapWrapper: mapWrapper.current,
                        map,
                        mapMode   : mode
                    })
                ) : (
                    children
                )
            ) : (
                <Preloader />
            )}
        </GeneralMapStyled.Map>
    );
}

export const GeneralMap = GeneralMapComponent;
