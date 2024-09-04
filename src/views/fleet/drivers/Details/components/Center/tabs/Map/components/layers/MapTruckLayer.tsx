/* eslint-disable import/no-extraneous-dependencies */
import mapboxgl, { GeoJSONSource, LngLatLike } from 'mapbox-gl';
import React, { useEffect } from 'react';
import map_options from '@/views/fleet/drivers/Details/components/Center/tabs/Map/components/map_options';
import { Feature, GeoJsonProperties, Geometry, Point } from 'geojson';
import { MapboxEvent } from '@/views/dispatch/orders/Details/sections/load-map/LoadMap';
import { createRoot } from 'react-dom/client';
import { DriverActions } from '@/store/fleet/drivers/slice';
import { useAppDispatch } from '@/store/hooks';
import { trucksActions } from '@/store/fleet/trucks/slice';
import { ListenReply_TruckLocations } from '@proto/events_serv';
import MapPopup from '@/views/fleet/drivers/Details/components/Center/tabs/Map/components/MapPopup';
import TruckIcon from '../../../../../../../../../../../public/images/icons/map/truck_icon.png';

type Props = {
    map: mapboxgl.Map;
    truckLocation: ListenReply_TruckLocations['locations'][0];
    truck_model: string;
    popup: mapboxgl.Popup;
};

export default function MapTruckLayer({
    map,
    truckLocation,
    truck_model,
    popup
}: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadTruck = () => {
            dispatch(trucksActions.setProviderId(truckLocation.integrationProviderId));
            const truckSource = map.getSource(map_options.sources.truck) as GeoJSONSource;
            const truck_feature: Feature<Geometry, GeoJsonProperties> = {
                type    : 'Feature',
                geometry: {
                    type       : 'Point',
                    coordinates: [truckLocation.lon, truckLocation.lat]
                },
                properties: {
                    model: truck_model
                }
            };

            if (truckSource) {
                truckSource.setData({
                    type    : 'FeatureCollection',
                    features: [truck_feature]
                });
            } else {
                map.addSource(map_options.sources.truck, {
                    type: 'geojson',
                    data: {
                        type    : 'FeatureCollection',
                        features: [truck_feature]
                    }
                });

                map.loadImage(TruckIcon.src, (error, image) => {
                    if (error) return console.log('e', error);
                    if (map && image) {
                        map.addImage(map_options.images_names.truck, image);
                        map.addLayer({
                            id    : map_options.layers.truck,
                            source: map_options.sources.truck,
                            type  : 'symbol',
                            layout: {
                                'icon-image' : map_options.images_names.truck,
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

        loadTruck();
        map.on('style.load', loadTruck);

        const layer_ids = [map_options.layers.truck];

        const mouseEnterHandler = (e: MapboxEvent) => {
            // eslint-disable-next-line no-param-reassign
            map.getCanvas().style.cursor = 'pointer';

            const coordinates =
                e.features &&
                e.features[0].geometry?.type === 'Point' &&
                e.features[0].geometry.coordinates.slice();

            if (coordinates) {
                while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                    coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
                }

                const popupNode = document.createElement('div');
                createRoot(popupNode).render(
                    <MapPopup
                        icon={<div />}
                        title={truck_model}
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
                // dispatch(DriverActions.selectDeviceId(e.features[0].properties?.device_id));
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
            if (truckLocation) {
                map.off('style.load', loadTruck);
                map.off('mouseenter', layer_ids, mouseEnterHandler);
                map.off('mouseleave', layer_ids, mouseLeaveHandler);
                map.off('click', layer_ids, clickHandler);

                map.removeSource(map_options.sources.truck);

                dispatch(trucksActions.setProviderId(''));
            }
        };
    }, [truckLocation, map]);

    return null;
}
