import { useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setMapWeatherControllerAction } from '@/store/map-controllers/actions';
import { WeatherControllerType } from '@/store/map-controllers/slice';

export const WeatherControlField = {
    TEMPERATURE            : 'temperature',
    PRECIPITATION_INTENSITY: 'precipitationIntensity',
    VISIBILITY             : 'visibility',
    NONE                   : ''
} as const;

export type WeatherControlField = (typeof WeatherControlField)[keyof typeof WeatherControlField];

export const default_weather_settings: WeatherControllerType = {
    timestamp: 0,
    selected : WeatherControlField.PRECIPITATION_INTENSITY
};

export type SetWeatherType = (value: { selected: WeatherControlField; timestamp: number }) => void;

export const useAdvancedWeatherSettings = (storageKey: string) => {
    const storeSettings = useAppSelector((state) => state.mapsControllers[storageKey]?.weather);
    const weather = useMemo(() => storeSettings || default_weather_settings, [storeSettings]);
    const dispatch = useAppDispatch();
    const setWeather: SetWeatherType = useCallback(
        (value) => {
            dispatch(setMapWeatherControllerAction({ storageKey, value }));
        },
        [dispatch, storageKey]
    );

    return [weather, setWeather] as const;
};
