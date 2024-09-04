/* eslint-disable no-param-reassign */
import type { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson';
import mapboxgl, { MapEventOf, MapEventType } from 'mapbox-gl';

export const isGpsCurrent = (timestamp: number) => {
    const now = Date.now();
    return now - timestamp <= 120000;
};

type SourceType =
    | string
    | Feature<Geometry, GeoJsonProperties>
    | FeatureCollection<Geometry, GeoJsonProperties>;
type Listener$1<T extends MapEventType> = (event: MapEventOf<T>) => void;

export class MapHelper {
    #map: mapboxgl.Map;

    #markers: Map<string, mapboxgl.Marker> = new Map();

    #layersIds: Map<
        string,
        {
            id: string;
            layer: mapboxgl.AnyLayer;
            before?: string;
        }
    > = new Map();

    #sourcesIds: Map<string, string> = new Map();

    #sourcesUpdater: Map<string, any> = new Map();

    constructor(map: mapboxgl.Map) {
        this.#map = map;
    }

    on = (type: Parameters<mapboxgl.Map['on']>[0], listener: (ev: any) => void) => {
        this.#map.on(type, listener);
        return this;
    };

    off = (type: MapEventType, listener: (ev: any) => void) => {
        this.#map?.off(type, listener);
        return this;
    };

    flyTo = (lngLat: mapboxgl.LngLatLike, zoom = 14) => {
        if (!lngLat) return this;
        this.#map.flyTo({
            center  : lngLat,
            zoom,
            speed   : 16,
            duration: 200
        });
        return this;
    };

    getZoom = () => this.#map.getZoom();

    fitBounds = (bounds: mapboxgl.LngLatBoundsLike, options?: mapboxgl.FitBoundsOptions) => {
        if (!this.#map) return this;
        if (!bounds) return this;

        try {
            this.#map.fitBounds(bounds, options);
        } catch (error) {
            console.error('Error while fitting bounds', error);
        }
        return this;
    };

    getCenter = () => this.#map.getCenter();

    getBounds = () => this.#map.getBounds();

    updateRasterSource = (id: string, source: mapboxgl.AnySourceData) => {
        if (!this.#map.getSource(id)) {
            return this;
        }
        this.#sourcesUpdater.set(id, source);
        return this;
    };

    addSource = (id: string, source: mapboxgl.AnySourceData) => {
        if (this.#map.getSource(id)) {
            return this;
        }
        this.#sourcesIds.set(id, id);
        if (source.type === 'raster') {
            this.#sourcesUpdater.set(id, source);
        }
        this.#map.addSource(id, source);
        return this;
    };

    removeSource = (id: string) => {
        if (!this.#map?.getSource(id)) {
            return this;
        }
        this.#sourcesIds.delete(id);
        this.#sourcesUpdater.delete(id);
        this.#map?.removeSource(id);
        return this;
    };

    removeAllSources = () => {
        if (!this.#map) return this;
        this.#sourcesIds.forEach((id) => {
            this.#map?.removeSource(id);
        });
        this.#sourcesIds.clear();
        return this;
    };

    addLayer = (layer: mapboxgl.AnyLayer, before?: string) => {
        if (this.#map?.getLayer(layer.id)) {
            return this;
        }
        this.#layersIds.set(layer.id, { layer, id: layer.id, before });
        this.#map.addLayer(layer, before);
        return this;
    };

    addLayerListener = <T extends string | string[], EventType extends mapboxgl.MapEventType>(
        eventType: EventType,
        layerId: T,
        callback: Listener$1<EventType>
    ) => {
        if (!this.#map) return () => {};
        callback = callback.bind(this.#map);
        this.#map.on(eventType, layerId, callback);
        return () => {
            this.#map?.off(eventType, layerId, callback);
        };
    };

    addMarker = (lngLat: mapboxgl.LngLatLike, el?: mapboxgl.MarkerOptions) => {
        const marker = new mapboxgl.Marker(el).setLngLat(lngLat);
        marker.addTo(this.#map);
        return marker;
    };

    readdLayers = () => {
        this.#layersIds.forEach(({
            id,
            layer,
            before
        }) => {
            // const layer = this.#map.getLayer(id);
            this.#map.addLayer(layer);
        });
        return this;
    };

    addProMarker = (markerId: string, lngLat: mapboxgl.LngLatLike, el?: mapboxgl.MarkerOptions) => {
        if (this.#markers.has(markerId)) {
            const marker = this.#markers.get(markerId)?.setLngLat(lngLat);
            return marker;
        }
        const marker = new mapboxgl.Marker(el).setLngLat(lngLat);
        this.#markers.set(markerId, marker);
        marker.addTo(this.#map);
        return marker;
    };

    removeProMarker = (markerId: string) => {
        // marker.remove();
        if (!this.#markers.has(markerId)) {
            return;
        }
        this.#markers.get(markerId)?.remove();
        this.#markers.delete(markerId);
    };

    updateMarker = (marker: mapboxgl.Marker, lngLat: mapboxgl.LngLatLike) => {
        marker.setLngLat(lngLat);
        return marker;
    };

    removeAllMarkers = (markersList: (mapboxgl.Marker | undefined)[]) => {
        markersList.forEach((marker) => marker?.remove());
    };

    removeMarker = (marker: mapboxgl.Marker) => {
        marker.remove();
    };

    moveLayer = (id: string, before_id: string) => {
        if (this.#map.getLayer(id) && this.#map.getLayer(before_id)) {
            this.#map.moveLayer(id, before_id);
        }
        return this;
    };

    loadImage = (id: string, url: string) => {
        if (this.#map.hasImage(id)) {
            return;
        }
        this.#map.loadImage(url, (error, image) => {
            if (error) {
                throw error;
            }
            if (!image) return;
            if (!this.#map.hasImage(id)) {
                this.#map.addImage(id, image);
            }
        });
    };

    loadSVGPath = (iconSrc: string, scale = 1) =>
        new Promise((resolve) => {
            const img = new Image();
            img.onload = () => {
                img.width *= scale;
                img.height *= scale;
                resolve(img);
            };

            img.src = iconSrc;
        });

    loadSVG = (id: string, url: string) => {
        if (this.#map.hasImage(id)) {
            return;
        }
        this.loadSVGPath(url).then((image) => {
            if (!image) return;
            if (!this.#map.hasImage(id)) {
                this.#map.addImage(id, image as HTMLImageElement);
            }
        });
    };

    removeImage = (id: string) => {
        if (!this.#map.hasImage(id)) {
            return this;
        }
        this.#map.removeImage(id);
        return this;
    };

    removeAllLayers = () => {
        if (!this.#map) return this;
        this.#layersIds.forEach(({ id }) => {
            this.#map.removeLayer(id);
        });
        this.#layersIds.clear();
        return this;
    };

    removeLayer = (id: string) => {
        if (!this.#map?.getLayer(id)) {
            return this;
        }
        this.#map.removeLayer(id);
        this.#layersIds.delete(id);
        return this;
    };

    get geojson() {
        return {
            updateSourceData: (
                id: string,
                data:
                    | string
                    | Feature<Geometry, GeoJsonProperties>
                    | FeatureCollection<Geometry, GeoJsonProperties>
            ) => {
                if (!this.#map.getSource(id) && this.#map) {
                    this.#map.addSource(id, {
                        type: 'geojson',
                        data
                    });
                    this.#sourcesUpdater.set(id, data);
                    return this;
                }
                (this.#map.getSource(id) as mapboxgl.GeoJSONSource).setData(data);
                this.#sourcesUpdater.set(id, data);
                return this;
            },
            updateClusterSource: (
                id: string,
                data:
                    | string
                    | Feature<Geometry, GeoJsonProperties>
                    | FeatureCollection<Geometry, GeoJsonProperties>
            ) => {
                if (!this.#map.getSource(id)) {
                    this.#map.addSource(id, {
                        type: 'geojson',
                        data,

                        cluster: true,

                        clusterRadius : 4,
                        clusterMaxZoom: 12
                    });
                    this.#sourcesUpdater.set(id, data);
                    return this;
                }
                (this.#map.getSource(id) as mapboxgl.GeoJSONSource).setData(data);
                this.#sourcesUpdater.set(id, data);
                return this;
            },
            updateAllSourcesData: () => {
                if (!this.#map) return this;
                this.#sourcesUpdater.forEach((data, id) => {
                    if (!this.#map.getSource(id)) {
                        if (data.type === 'raster') {
                            this.#map.addSource(id, data);
                            return;
                        }
                        this.#map.addSource(id, {
                            type: 'geojson',
                            data
                        });
                        return;
                    }
                    (this.#map.getSource(id) as mapboxgl.GeoJSONSource).setData(data);
                });
                return this;
            }
        };
    }

    get defaultSources() {
        return {
            featureLineString: {
                type    : 'Feature',
                geometry: {
                    type       : 'LineString',
                    coordinates: []
                },
                properties: {}
            } as SourceType,
            featurePoint: {
                type    : 'Feature',
                geometry: {
                    type       : 'Point',
                    coordinates: []
                },
                properties: {}
            } as SourceType,

            featurePolygon: {
                type    : 'Feature',
                geometry: {
                    type       : 'Polygon',
                    coordinates: []
                },
                properties: {}
            } as SourceType,

            featureCollection: {
                type      : 'FeatureCollection',
                features  : [],
                properties: {}
            } as SourceType
        };
    }

    get map() {
        return this.#map;
    }
}

export const MapDefaultSources = {
    featureLineString: {
        type    : 'Feature',
        geometry: {
            type       : 'LineString',
            coordinates: []
        },
        properties: {}
    } as SourceType,
    featurePoint: {
        type    : 'Feature',
        geometry: {
            type       : 'Point',
            coordinates: []
        },
        properties: {}
    } as SourceType,

    featurePolygon: {
        type    : 'Feature',
        geometry: {
            type       : 'Polygon',
            coordinates: []
        },
        properties: {}
    } as SourceType,

    featureCollection: {
        type      : 'FeatureCollection',
        features  : [],
        properties: {}
    } as SourceType
};
