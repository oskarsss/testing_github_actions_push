import { AppThunkAction } from '../types';
import { MapControllersActions, WeatherControllerType } from './slice';

const MAP_WEATHER_CONTROLLERS = 'MAP_WEATHER_CONTROLLERS';

export const setMapWeatherControllerAction =
    (payload: { storageKey: string; value: WeatherControllerType }): AppThunkAction =>
        (dispatch, getState) => {
            dispatch(
                MapControllersActions.setWeatherController({
                    storageKey: payload.storageKey,
                    value     : payload.value
                })
            );

            const storage = getState().mapsControllers;

            localStorage.setItem(MAP_WEATHER_CONTROLLERS, JSON.stringify(storage));
        };

export const initiateMapControllersAction = (): AppThunkAction => (dispatch) => {
    const storage = localStorage.getItem(MAP_WEATHER_CONTROLLERS);

    if (storage) {
        dispatch(MapControllersActions.initiateControllers(JSON.parse(storage)));
    }
};
