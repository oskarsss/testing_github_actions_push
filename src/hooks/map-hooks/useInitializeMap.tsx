/* eslint-disable consistent-return */
import { MAPBOX_TOKEN } from '@/configs';
import { MapStyles, mapStyles } from '@/configs/mapbox';
import { layers } from '@/views/dispatch/orders/Details/sections/load-map/config';
import { useTheme } from '@mui/material';
import mapboxgl from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';

type Params = {
    initialMapStyle?: MapStyles;
    mapWrapper: React.RefObject<HTMLDivElement | null>;
    options?: {
        turnOffTerrain?: boolean;
        turnOffTraffic?: boolean;
        turnOffBuilding3D?: boolean;
    };
};

export const useInitializeMap = ({
    options,
    initialMapStyle,
    mapWrapper
}: Params) => {
    const { mode } = useTheme().palette;

    const mapRef = useRef<mapboxgl.Map | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const map = mapRef.current;
        if (map) {
            map.setStyle(mapStyles[mode]);
        }
    }, [mode, mapRef]);

    useEffect(() => {
        if (mapRef.current) return;
        const mapboxMap = new mapboxgl.Map({
            container  : mapWrapper.current || '',
            style      : initialMapStyle ? mapStyles[initialMapStyle] : mapStyles[mode],
            center     : [-90.935242, 40.73061],
            zoom       : 4,
            trackResize: true,
            accessToken: MAPBOX_TOKEN,
            projection : {
                name: 'mercator'
            }
        });
        mapRef.current = mapboxMap;
        const RotateControl = new mapboxgl.NavigationControl({
            showCompass   : true,
            showZoom      : false,
            visualizePitch: true
        });

        mapboxMap.addControl(RotateControl, 'bottom-left');

        const setTerrain = () => {
            const style = mapboxMap.getStyle();
            const labelLayerId = style?.layers.find(
                (layer) => layer.type === 'symbol' && layer.layout && layer.layout['text-field']
            )?.id;

            if (!options?.turnOffBuilding3D && !mapboxMap.getLayer(layers.buildings_3d.id)) {
                mapboxMap.addLayer(layers.buildings_3d, labelLayerId);
            }

            if (!options?.turnOffTerrain && !mapboxMap.getSource('mapbox-dem')) {
                mapboxMap.addSource('mapbox-dem', {
                    type    : 'raster-dem',
                    url     : 'mapbox://mapbox.mapbox-terrain-dem-v1?optimize=true',
                    tileSize: 512,
                    maxzoom : 14
                });
                mapboxMap.setTerrain({ source: 'mapbox-dem', exaggeration: 1.5 });
            }

            if (!options?.turnOffTraffic) {
                if (!mapboxMap.getSource('mapbox-traffic')) {
                    mapboxMap.addSource('mapbox-traffic', {
                        type: 'vector',
                        url : 'mapbox://mapbox.mapbox-traffic-v1?optimize=true'
                    });
                }
                if (!mapboxMap.getLayer(layers.traffic.id)) {
                    mapboxMap.addLayer(layers.traffic);
                }
            }
            setIsLoaded(true);
        };

        mapboxMap.on('style.load', () => {
            setTerrain();
        });

        // mapboxMap.on('error', (e) => {
        //     console.error('MAP_BOX_ERROR:', e);
        // });

        // eslint-disable-next-line consistent-return
        return () => {
            const map = mapRef.current;
            if (map) {
                map.off('style.load', setTerrain);
            }
        };
    }, []);

    useEffect(() => {
        if (!('ResizeObserver' in window)) return;

        const onResize = () => {
            if (mapRef.current) {
                mapRef.current.resize();
            }
        };

        const observer = new window.ResizeObserver(onResize);
        if (mapWrapper.current) observer.observe(mapWrapper.current);

        return () => {
            observer.disconnect();
        };
    }, [mapRef]);

    return {
        map: isLoaded ? mapRef.current : null
    };
};
