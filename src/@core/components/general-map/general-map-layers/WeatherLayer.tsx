/* eslint-disable prefer-destructuring */
/* eslint-disable no-param-reassign */
import { useEffect } from 'react';
import moment from 'moment-timezone';
import { TOMORROW_KEY } from '@/configs';
import { layers } from '@/views/dispatch/orders/Details/sections/load-map/config';
import { useAdvancedWeatherSettings } from '@/hooks/map-hooks/useWeatherSettings';
import { VectorSourceImpl } from 'mapbox-gl';

const format = '.png';
const timestamp = moment.utc().toISOString();
const sourceId = 'tomorrow-io-api';
const getTiles = (config: string) => [
    `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${config}/${timestamp}${format}?apikey=${TOMORROW_KEY}`
];

type Props = {

    // MapWorker: MapHelper;
    beforeLayer: string;
    weatherStoreKey: string;
    map: mapboxgl.Map;
};

export default function WeatherLayer({
    beforeLayer,
    weatherStoreKey,
    map
}: Props) {
    const [weather] = useAdvancedWeatherSettings(weatherStoreKey);

    useEffect(() => {
        const initSourcesAndLayers = () => {
            if (map) {
                const source = map.getSource(sourceId) as VectorSourceImpl;

                if (!weather.selected && source) {
                    if (map.getSource(sourceId)) {
                        map.removeLayer(layers.weather.id);
                        map.removeSource(sourceId);
                    }
                } else {
                    if (source) {
                        source.setTiles(getTiles(weather.selected));
                        return;
                    }
                    map.addSource(sourceId, {
                        type    : 'raster',
                        tiles   : getTiles(weather.selected),
                        tileSize: 256
                    });
                    if (map.getLayer(layers.weather.id)) return;
                    const isExistBeforeLayer = map.getLayer(beforeLayer);
                    if (isExistBeforeLayer) {
                        map.addLayer(layers.weather, beforeLayer);
                    } else {
                        map.addLayer(layers.weather);
                    }
                }
            }
        };
        map?.on('style.load', initSourcesAndLayers);
        return () => {
            map?.off('style.load', initSourcesAndLayers);
        };
    }, [weather.selected, map, beforeLayer, weather]);

    return null;
}
