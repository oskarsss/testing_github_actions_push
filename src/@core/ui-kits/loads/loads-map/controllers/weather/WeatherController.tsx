import Tooltip from '@mui/material/Tooltip';
import CloudIcon from '@mui/icons-material/Cloud';
import React, { useCallback, useState } from 'react';
import { Fade, Popper, Stack } from '@mui/material';
import {
    WeatherControlField,
    useAdvancedWeatherSettings
} from '@/hooks/map-hooks/useWeatherSettings';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { VectorSourceImpl } from 'mapbox-gl';
import moment from 'moment-timezone';
import { layers } from '@/views/dispatch/orders/Details/sections/load-map/config';
import { TOMORROW_KEY } from '@/configs';
import WeatherMenu from './WeatherMenu';
import LoadMapStyled from '../../../../../../views/dispatch/orders/Details/sections/load-map/LoadMap.styled';

type Props = {
    storageKey: string;
    map?: mapboxgl.Map | null;
    beforeLayer?: string;
};

const format = '.png';
const timestamp = moment.utc().toISOString();
const sourceId = 'tomorrow-io-api';
const getTiles = (config: string) => [
    `https://api.tomorrow.io/v4/map/tile/{z}/{x}/{y}/${config}/${timestamp}${format}?apikey=${TOMORROW_KEY}&optimize=true`
];

export default function WeatherController({
    storageKey,
    map,
    beforeLayer
}: Props) {
    const [weather, _] = useAdvancedWeatherSettings(storageKey);

    const { t } = useAppTranslation('core');

    const [anchorEl, setAnchorEL] = useState<HTMLElement | null>(null);

    const setMapWeather = useCallback(
        (selected: WeatherControlField) => {
            if (map && beforeLayer) {
                const source = map.getSource(sourceId) as VectorSourceImpl;

                if (!selected && source) {
                    if (map.getSource(sourceId)) {
                        map.removeLayer(layers.weather.id);
                        map.removeSource(sourceId);
                    }
                } else {
                    if (source) {
                        source.setTiles(getTiles(selected));
                        return;
                    }
                    map.addSource(sourceId, {
                        type    : 'raster',
                        tiles   : getTiles(selected),
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
        },
        [map, beforeLayer]
    );

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEL((prev) => (prev ? null : event.currentTarget));
    };

    return (
        <div
            style={{
                display : 'flex',
                position: 'relative'
            }}
        >
            <Tooltip
                title={t('basic.load.map.tooltips.weather_settings')}
                disableInteractive
            >
                <Stack
                    sx={{
                        maxHeight: '40px',
                        maxWidth : '40px'
                    }}
                >
                    <LoadMapStyled.ControllerSatellite onClick={handleClick}>
                        <CloudIcon color={weather.selected ? 'primary' : 'action'} />
                    </LoadMapStyled.ControllerSatellite>
                </Stack>
            </Tooltip>
            <Popper
                disablePortal
                popperOptions={{
                    placement: 'left-start'
                }}
                open={!!anchorEl}
                anchorEl={anchorEl}
                sx={{
                    zIndex  : 2000,
                    paddingX: 1
                }}
            >
                <WeatherMenu
                    storageKey={storageKey}
                    changeMapWeather={setMapWeather}
                    onClose={() => setAnchorEL(null)}
                />
            </Popper>
        </div>
    );
}
