import { useEffect } from 'react';
import mapboxgl, { VectorSourceImpl } from 'mapbox-gl';
import moment from 'moment-timezone';
import { TOMORROW_KEY } from '@/configs';
import { useAdvancedWeatherSettings } from '@/hooks/map-hooks/useWeatherSettings';

const format = '.png';
const timestamp = (time: number) => {
    if (time === 0) {
        return moment.utc().toISOString();
    }
    if (time > 0) {
        return moment.utc().add(time, 'hours').toISOString();
    }
    return moment.utc().subtract(-time, 'hours').toISOString();
};

type Props = {
    map: mapboxgl.Map;
};

export default function WeatherLayer({ map }: Props) {
    const [weather] = useAdvancedWeatherSettings('map_page');

    useEffect(() => {
        const addAdditionalSourceAndLayer = () => {
            if (!map || !weather) return;
            const weatherSource = map.getSource(
                `tomorrow-io-api-${weather.selected}`
            ) as VectorSourceImpl;
            const tiles = [
                `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${weather.selected}/${timestamp(
                    weather.timestamp
                )}${format}?apikey=${TOMORROW_KEY}`
            ];
            if (!weatherSource) {
                map?.addSource(`tomorrow-io-api-${weather.selected}`, {
                    type    : 'raster',
                    tiles,
                    tileSize: 256
                });
            } else {
                weatherSource.setTiles(tiles);
            }
            const weatherLayer = map?.getLayer(`${weather.selected}-tiles`);
            if (weatherLayer) return;
            map?.addLayer({
                id     : `${weather.selected}-tiles`,
                type   : 'raster',
                source : `tomorrow-io-api-${weather.selected}`,
                minzoom: 1,
                maxzoom: 12
            });

            map?.setPaintProperty(`${weather.selected}-tiles`, 'raster-opacity', 0.7);
        };
        addAdditionalSourceAndLayer();
        map?.on('style.load', addAdditionalSourceAndLayer);
        return () => {
            map?.off('style.load', addAdditionalSourceAndLayer);
            if (!map) return;
            const weatherSource = map.getSource(`tomorrow-io-api-${weather.selected}`);
            const weatherLayer = map?.getLayer(`${weather.selected}-tiles`);
            if (weatherSource) {
                map.removeSource(`tomorrow-io-api-${weather.selected}`);
            }
            if (weatherLayer) {
                map.removeLayer(`${weather.selected}-tiles`);
            }
        };
    }, [map, weather.selected, weather.timestamp]);
    return null;
}
