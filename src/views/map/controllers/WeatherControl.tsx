import React from 'react';
import Fade from '@mui/material/Fade';
import { Stack } from '@mui/material';
import {
    WeatherControlField,
    useAdvancedWeatherSettings
} from '@/hooks/map-hooks/useWeatherSettings';
import { StaticImageData } from 'next/image';
import { IntlMessageKey } from '@/@types/next-intl';
import precipitationIntensityImage from '../assets/weather/precipitationIntensity.png';
import temperatureImage from '../assets/weather/temperature.png';
import visibilityImage from '../assets/weather/visibility.png';

type WeatherControlType = {
    field: WeatherControlField;
    label: IntlMessageKey;
    description: IntlMessageKey;
    spectrum: StaticImageData;
};

// take field from https://docs.tomorrow.io/reference/data-layers-core
export const weather_config: WeatherControlType[] = [
    {
        field      : WeatherControlField.TEMPERATURE,
        label      : 'core:basic.load.map.weather_menu.options.temperature.label',
        description: 'core:basic.load.map.weather_menu.options.temperature.description',
        spectrum   : temperatureImage
    },
    {
        field      : WeatherControlField.PRECIPITATION_INTENSITY,
        label      : 'core:basic.load.map.weather_menu.options.rain_snow.label',
        description: 'core:basic.load.map.weather_menu.options.rain_snow.description',
        spectrum   : precipitationIntensityImage
    },
    {
        field      : WeatherControlField.VISIBILITY,
        label      : 'core:basic.load.map.weather_menu.options.visibility.label',
        description: 'core:basic.load.map.weather_menu.options.visibility.description',
        spectrum   : visibilityImage
    }
];

export function SpectrumWeather() {
    const [weather] = useAdvancedWeatherSettings('map_page');
    const selected_layer = weather_config.find(({ field }) => field === weather.selected);
    if (!selected_layer) return null;
    return (
        <Fade in>
            <Stack
                position="absolute"
                bottom={40}
                left={10}
                overflow="hidden"
                width={300}
                zIndex={100}
                borderRadius="4px"
            >
                <img
                    src={selected_layer.spectrum.src}
                    alt={selected_layer.label}
                />
            </Stack>
        </Fade>
    );
}
