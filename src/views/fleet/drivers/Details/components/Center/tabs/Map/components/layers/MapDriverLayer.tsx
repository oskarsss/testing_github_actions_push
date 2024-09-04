/* eslint-disable indent */
/* eslint-disable consistent-return */
/* eslint-disable import/no-extraneous-dependencies */
import mapboxgl, { GeoJSONSource, LngLatLike } from 'mapbox-gl';
import React, { useEffect } from 'react';
import DriversTypes from '@/store/fleet/drivers/types';
import { Feature, GeoJsonProperties, Geometry, Point } from 'geojson';
import { useAppDispatch } from '@/store/hooks';
import { createRoot } from 'react-dom/client';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { useSettings } from '@/store/settings/hooks';
import MobileAppIcons from '@/views/fleet/drivers/Details/components/Right/components/MobileApp/mobile_app_icons';
import { MapboxEvent } from '@/views/dispatch/orders/Details/sections/load-map/LoadMap';
import { ListenReply_DriverDeviceLocations } from '@proto/events_serv';
import DriverIcon from '../../../../../../../../../../../public/images/icons/map/driver_icon.png';
import MapPopup from '../MapPopup';
import map_options from '../map_options';

type Props = {
    map: mapboxgl.Map;
    driver_id: string;
    driverLocations: Record<string, ListenReply_DriverDeviceLocations['locations'][0]>;
    devices: DriversTypes.DriverDevice[];
    popup: mapboxgl.Popup;
};

export default function LayerDriver({
map,
driver_id,
driverLocations,
devices,
popup
}: Props) {
    const dispatch = useAppDispatch();
    const { driverPpp } = useSettings();

    useEffect(() => {
        const loadDriver = () => {
            if (!driverLocations) return;
            const driverSource = map.getSource(map_options.sources.driver) as GeoJSONSource;
            const entity_features: Feature<Geometry, GeoJsonProperties>[] = [];

            devices.forEach((device) => {
                const coordinates = Object.values(driverLocations).find(
                    (location) => location.deviceId === device.deviceId
                );
                if (!coordinates) return;

                entity_features.push({
                    type    : 'Feature',
                    geometry: {
                        type       : 'Point',
                        coordinates: [coordinates?.lon, coordinates?.lat]
                    },

                    properties: {
                        id         : driver_id,
                        device_id  : device.deviceId,
                        model      : device.model,
                        os         : device.os,
                        app_version: device.appVersion
                    }
                });
            });

            if (driverSource) {
                driverSource.setData({
                    type    : 'FeatureCollection',
                    features: entity_features
                });
            } else {
                map.addSource(map_options.sources.driver, {
                    type: 'geojson',
                    data: {
                        type    : 'FeatureCollection',
                        features: entity_features
                    }
                });

                map.loadImage(DriverIcon.src, (error, image) => {
                    if (error) return console.log('e', error);
                    if (map && image) {
                        map.addImage(map_options.images_names.driver, image);
                        map.addLayer({
                            id    : map_options.layers.driver,
                            source: map_options.sources.driver,
                            type  : 'symbol',
                            layout: {
                                'icon-image' : map_options.images_names.driver,
                                'icon-size'  : 0.35,
                                'text-font'  : ['Open Sans Bold', 'Arial Unicode MS Bold'],
                                'text-offset': [0, 1],
                                'text-anchor': 'top'
                            }
                        });
                    }
                });
            }
        };

        loadDriver();
        map.on('style.load', loadDriver);

        const layer_ids = [map_options.layers.driver];

        const mouseEnterHandler = (e: MapboxEvent) => {
            if (!driverPpp) return;

            const {
androidAppVersion,
iosAppVersion
} = driverPpp;

            // eslint-disable-next-line no-param-reassign
            map.getCanvas().style.cursor = 'pointer';

            const coordinates =
                e.features &&
                e.features[0].geometry?.type === 'Point' &&
                e.features[0].geometry.coordinates.slice();

            const model = e.features && e.features[0].properties?.model;
            const os = e.features && e.features[0].properties?.os;
            const app_version = e.features && e.features[0].properties?.app_version;
            const icon =
                ((os === 'iOS' && iosAppVersion) || (os === 'android' && androidAppVersion)) ===
                app_version ? (
                    <MobileAppIcons.UpToDateVersionIcon />
                ) : (
                    <MobileAppIcons.OutdatedVersionIcon />
                );

            if (coordinates) {
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                const popupNode = document.createElement('div');
                createRoot(popupNode).render(
                    <MapPopup
                        icon={icon}
                        title={model}
                    />
                );
                popup
                    .setLngLat(coordinates as LngLatLike)
                    .setDOMContent(popupNode)
                    .addTo(map);

                const mapboxglPopupTip = document.querySelector(
                    '.mapboxgl-popup-tip'
                ) as HTMLElement;
                const mapboxglPopupContent = document.querySelector(
                    '.mapboxgl-popup-content'
                ) as HTMLElement;
                mapboxglPopupTip.style.display = 'none';
                mapboxglPopupContent.style.padding = '12px 16px';
                mapboxglPopupContent.style.boxShadow = '4px 4px 16px 0 #7587AA4D';
            }
        };

        const mouseLeaveHandler = () => {
            // eslint-disable-next-line no-param-reassign
            map.getCanvas().style.cursor = '';
            popup.remove();
        };

        const clickHandler = (e: MapboxEvent) => {
            if (e.features) {
                const coordinates = (e.features[0].geometry as Point).coordinates.slice();
                dispatch(DriverActions.setCoordinates(coordinates));
            }

            // eslint-disable-next-line no-param-reassign
            map.getCanvas().style.cursor = '';
        };

        map.on('mouseenter', layer_ids, mouseEnterHandler);
        map.on('mouseleave', layer_ids, mouseLeaveHandler);
        map.on('click', layer_ids, clickHandler);

        return () => {
            if (driverLocations) {
                map.off('style.load', loadDriver);
                map.off('mouseenter', layer_ids, mouseEnterHandler);
                map.off('mouseleave', layer_ids, mouseLeaveHandler);
                map.off('click', layer_ids, clickHandler);

                map.removeSource(map_options.sources.driver);

                dispatch(DriverActions.selectDeviceId(''));
            }
        };
    }, [driverLocations, map]);

    return null;
}
