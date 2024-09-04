import { useEffect } from 'react';
import mapboxgl, { GeoJSONSource } from 'mapbox-gl';

const sources = {
    entity: 'entity'
};

const layers = {
    entity: 'entity_layer'
};

type Props = {
    map: mapboxgl.Map;
    lat: number;
    lon: number;
    icon: string;
};

export default function EntityLayer({
    map,
    lat,
    lon,
    icon
}: Props) {
    useEffect(() => {
        const loadDriver = () => {
            const source = map.getSource(sources.entity) as GeoJSONSource;

            if (source) {
                source.setData({
                    type    : 'FeatureCollection',
                    features: [
                        {
                            type    : 'Feature',
                            geometry: {
                                type       : 'Point',
                                coordinates: [lon, lat]
                            },

                            properties: {}
                        }
                    ]
                });
            } else {
                map.addSource(sources.entity, {
                    type: 'geojson',
                    data: {
                        type    : 'FeatureCollection',
                        features: [
                            {
                                type    : 'Feature',
                                geometry: {
                                    type       : 'Point',
                                    coordinates: [lon, lat]
                                },

                                properties: {}
                            }
                        ]
                    }
                });

                map.loadImage(icon, (error, image) => {
                    if (error) return console.log('e', error);
                    if (map && image) {
                        map.addImage('entity', image);
                        map.addLayer({
                            id    : layers.entity,
                            source: sources.entity,
                            type  : 'symbol',
                            layout: {
                                'icon-image': 'entity',
                                'icon-size' : 0.35
                            }
                        });
                    }
                });
            }
        };

        map.flyTo({
            center: [lon, lat],
            zoom  : 12
        });

        loadDriver();
        map.on('style.load', loadDriver);

        return () => {
            map.off('style.load', loadDriver);

            map.removeLayer(layers.entity);

            map.removeSource(sources.entity);

            map.removeImage('entity');
        };
    }, [lat, lon]);

    return null;
}
