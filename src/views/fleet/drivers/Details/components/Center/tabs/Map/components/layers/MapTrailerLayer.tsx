/* eslint-disable import/no-extraneous-dependencies */
import mapboxgl, { GeoJSONSource, LngLatLike } from 'mapbox-gl';
import { ListenReply_TrailerLocations } from '@proto/events_serv';
import { useAppDispatch } from '@/store/hooks';
import React, { useEffect } from 'react';
import { trailersActions } from '@/store/fleet/trailers/slice';
import map_options from '@/views/fleet/drivers/Details/components/Center/tabs/Map/components/map_options';
import { Feature, GeoJsonProperties, Geometry, Point } from 'geojson';
import { MapboxEvent } from '@/views/dispatch/orders/Details/sections/load-map/LoadMap';
import { createRoot } from 'react-dom/client';
import MapPopup from '@/views/fleet/drivers/Details/components/Center/tabs/Map/components/MapPopup';
import { DriverActions } from '@/store/fleet/drivers/slice';
import TrailerIcon from '../../../../../../../../../../../public/images/icons/map/trailer_icon.png';

type Props = {
    map: mapboxgl.Map;
    trailerLocation: ListenReply_TrailerLocations['locations'][0];
    trailer_reference_id: string;
    popup: mapboxgl.Popup;
};

export default function MapTrailerLayer({
    map,
    trailerLocation,
    trailer_reference_id,
    popup
}: Props) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const loadTrailer = () => {
            dispatch(trailersActions.setProviderId(trailerLocation.integrationProviderId));
            const trailerSource = map.getSource(map_options.sources.trailer) as GeoJSONSource;
            const trailer_feature: Feature<Geometry, GeoJsonProperties> = {
                type    : 'Feature',
                geometry: {
                    type       : 'Point',
                    coordinates: [trailerLocation.lon, trailerLocation.lat]
                },
                properties: {
                    reference_id: trailer_reference_id
                }
            };

            if (trailerSource) {
                trailerSource.setData({
                    type    : 'FeatureCollection',
                    features: [trailer_feature]
                });
            } else {
                map.addSource(map_options.sources.trailer, {
                    type: 'geojson',
                    data: {
                        type    : 'FeatureCollection',
                        features: [trailer_feature]
                    }
                });

                map.loadImage(TrailerIcon.src, (error, image) => {
                    if (error) return console.log('e', error);
                    if (map && image) {
                        map.addImage(map_options.images_names.trailer, image);
                        map.addLayer({
                            id    : map_options.layers.trailer,
                            source: map_options.sources.trailer,
                            type  : 'symbol',
                            layout: {
                                'icon-image' : map_options.images_names.trailer,
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

        loadTrailer();
        map.on('style.load', loadTrailer);

        const layer_ids = [map_options.layers.trailer];

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
                        title={trailer_reference_id}
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
            if (trailerLocation) {
                map.off('style.load', loadTrailer);
                map.off('mouseenter', layer_ids, mouseEnterHandler);
                map.off('mouseleave', layer_ids, mouseLeaveHandler);
                map.off('click', layer_ids, clickHandler);

                map.removeSource(map_options.sources.trailer);

                dispatch(trailersActions.setProviderId(''));
            }
        };
    }, [map, trailerLocation]);

    return null;
}
