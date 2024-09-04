import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Feature } from 'geojson';
import { CIRCLE_MAX_SIZE, CIRCLE_MIN_SIZE } from '@/views/map/layers/layer_options';

const ids = {
    trucks: {
        source: {
            trucks: 'trucks_source'
        },
        layer: {
            trucks: 'trucks_layer',
            labels: 'trucks_labels_layer'
        }
    },
    trailers: {
        source: {
            trailers: 'trailers_source'
        },
        layer: {
            trailers: 'trailers_layer',
            labels  : 'trailers_labels_layer'
        }
    },
    drivers: {
        source: {
            drivers: 'drivers_source'
        },
        layer: {
            drivers: 'drivers_layer',
            labels : 'drivers_labels_layer'
        }
    },
    loads: {
        source: {
            lines      : 'load_lines_source',
            lines_hover: 'load_lines_hover_source',
            stops      : 'load_stops_source'
        },
        layer: {
            lines      : 'load_lines_layer',
            lines_hover: 'load_lines_hover_layer',
            lines_popup: 'load_lines_popup_layer',
            arrows     : 'load_arrows_layer',
            stops      : 'load_stops_layer'
        }
    }
};

const sources = {
    trucks: {
        type: 'geojson',
        data: {
            type    : 'FeatureCollection',
            features: []
        }
    } as mapboxgl.AnySourceData,
    trailers: {
        type: 'geojson',
        data: {
            type    : 'FeatureCollection',
            features: []
        }
    } as mapboxgl.AnySourceData,
    drivers: {
        type: 'geojson',
        data: {
            type    : 'FeatureCollection',
            features: []
        }
    } as mapboxgl.AnySourceData,
    loads: {
        lines: {
            type       : 'geojson',
            lineMetrics: true,
            data       : {
                type    : 'Feature',
                geometry: {
                    type       : 'LineString',
                    coordinates: []
                },
                properties: {}
            }
        } as mapboxgl.AnySourceData,
        lines_hover: {
            type    : 'Feature',
            geometry: {
                type       : 'LineString',
                coordinates: []
            },
            properties: {
                id: ''
            }
        } as Feature,
        stops: {
            type: 'geojson',
            data: {
                type    : 'FeatureCollection',
                features: []
            }
        } as mapboxgl.AnySourceData
    }
};

const layers = {
    trucks: {
        trucks: {
            id    : ids.trucks.layer.trucks,
            source: ids.trucks.source.trucks,
            type  : 'circle',
            paint : {
                'circle-color': {
                    type    : 'identity',
                    property: 'status_color'
                },
                'circle-stroke-width'   : 3,
                'circle-stroke-color'   : '#ffffff',
                'circle-pitch-alignment': 'map',
                'circle-radius'         : [
                    'interpolate',
                    ['linear'],
                    ['zoom'],

                    // zoom is 5 (or less) -> circle radius will be 1px
                    8,
                    CIRCLE_MIN_SIZE,

                    // zoom is 10 (or greater) -> circle radius will be 5px
                    20,
                    CIRCLE_MAX_SIZE
                ]
            }
        } as mapboxgl.AnyLayer,
        label: {
            id    : ids.trucks.layer.labels,
            source: ids.trucks.source.trucks,
            type  : 'symbol',
            layout: {
                'icon-image'           : 'rectangle-blue-6',
                'icon-text-fit'        : 'both',
                'icon-text-fit-padding': [5, 5, 7, 5],
                'icon-allow-overlap'   : true,
                'icon-anchor'          : 'bottom',

                'text-font'         : ['Lato Black'],
                'text-anchor'       : 'top',
                'text-offset'       : [0, -2.5],
                'text-size'         : 12,
                'text-allow-overlap': true,
                'text-field'        : {
                    type    : 'identity',
                    property: 'title'
                },
                'text-justify': 'center',

                'icon-offset'        : [0, -2.5],
                'text-letter-spacing': 0.15
            },
            paint: {
                'text-color': '#FFFFFF'

                // 'text-halo-color': '#fff',
                // 'text-halo-width': 2
            }
        } as mapboxgl.AnyLayer
    },
    trailers: {
        trailers: {
            id    : ids.trailers.layer.trailers,
            source: ids.trailers.source.trailers,
            type  : 'circle',
            paint : {
                'circle-color': {
                    type    : 'identity',
                    property: 'status_color'
                },
                'circle-stroke-width'   : 3,
                'circle-stroke-color'   : '#FFFFFF',
                'circle-pitch-alignment': 'map',
                'circle-radius'         : ['interpolate', ['linear'], ['zoom'], 5, CIRCLE_MIN_SIZE, 10, 8]
            }
        } as mapboxgl.AnyLayer,
        label: {
            id    : ids.trailers.layer.labels,
            source: ids.trailers.source.trailers,
            type  : 'symbol',
            layout: {
                'icon-image'           : 'rectangle-blue-6',
                'icon-text-fit'        : 'both',
                'icon-text-fit-padding': [5, 5, 7, 5],
                'icon-allow-overlap'   : true,
                'icon-anchor'          : 'bottom',

                'text-font'         : ['Lato Black'],
                'text-anchor'       : 'top',
                'text-offset'       : [0, -2.5],
                'text-size'         : 12,
                'text-allow-overlap': true,
                'text-field'        : {
                    type    : 'identity',
                    property: 'title'
                },
                'text-justify': 'center',

                'icon-offset'        : [0, -2.5],
                'text-letter-spacing': 0.15
            },
            paint: {
                'text-color': '#FFFFFF'
            }
        } as mapboxgl.AnyLayer
    },
    drivers: {
        drivers: {
            id    : ids.drivers.layer.drivers,
            source: ids.drivers.source.drivers,
            type  : 'circle',
            paint : {
                'circle-color'          : { type: 'identity', property: 'status_color' },
                'circle-stroke-width'   : 3,
                'circle-stroke-color'   : '#ffffff',
                'circle-pitch-alignment': 'map',
                'circle-radius'         : [
                    'interpolate',
                    ['linear'],
                    ['zoom'],

                    // zoom is 5 (or less) -> circle radius will be 1px
                    8,
                    CIRCLE_MIN_SIZE,

                    // zoom is 10 (or greater) -> circle radius will be 5px
                    20,
                    CIRCLE_MAX_SIZE
                ]
            }
        } as mapboxgl.AnyLayer,
        label: {
            id    : ids.drivers.layer.labels,
            source: ids.drivers.source.drivers,
            type  : 'symbol',
            layout: {
                'text-font'          : ['Lato Black'],
                'text-padding'       : 20,
                'text-anchor'        : 'top',
                'text-offset'        : [0, 0.7],
                'text-size'          : 12,
                'text-allow-overlap' : false,
                'text-field'         : { type: 'identity', property: 'title' },
                'text-justify'       : 'center',
                'text-letter-spacing': 0.15
            },
            paint: {
                'text-color'     : '#000',
                'text-halo-color': '#fff',
                'text-halo-width': 1
            }
        } as mapboxgl.AnyLayer
    },
    loads: {
        lines: {
            id    : ids.loads.layer.lines,
            type  : 'line',
            source: ids.loads.source.lines,
            layout: {
                'line-join': 'round',
                'line-cap' : 'round'
            },
            paint: {
                'line-width': 5,
                'line-color': {
                    type    : 'identity',
                    property: 'color',
                    default : '#3c7eff'
                },
                'line-opacity': {
                    type    : 'identity',
                    property: 'opacity',
                    default : 1
                }
            }
        } as mapboxgl.AnyLayer,
        lines_hover: {
            id    : ids.loads.layer.lines_hover,
            type  : 'line',
            source: ids.loads.source.lines_hover,
            layout: {
                'line-join': 'round',
                'line-cap' : 'round'
            },
            paint: {
                'line-width': 5,
                'line-color': '#707070'
            }
        } as mapboxgl.AnyLayer,
        arrows: {
            id    : ids.loads.layer.arrows,
            type  : 'symbol',
            source: ids.loads.source.lines,
            layout: {
                'symbol-placement' : 'line',
                'text-field'       : '▶',
                'text-size'        : ['interpolate', ['linear'], ['zoom'], 5, 30, Infinity, 40],
                'symbol-spacing'   : ['interpolate', ['linear'], ['zoom'], 5, 30, 100, 50],
                'text-keep-upright': false
            },
            paint: {
                'text-color': {
                    type    : 'identity',
                    property: 'color',
                    default : '#3c7eff'
                },
                'text-halo-color': 'hsl(55, 11%, 96%)',
                'text-opacity'   : 0.6
            }
        } as mapboxgl.AnyLayer,
        lines_popup: {
            id    : ids.loads.layer.lines_popup,
            type  : 'line',
            source: ids.loads.source.lines,
            layout: {
                'line-join': 'round',
                'line-cap' : 'round'
            },
            paint: {
                'line-width': 14,
                'line-color': 'transparent'
            }
        } as mapboxgl.AnyLayer,
        stops: {
            id    : ids.loads.layer.stops,
            source: ids.loads.source.stops,
            type  : 'circle',
            paint : {
                'circle-color': {
                    type    : 'identity',
                    property: 'color'
                },
                'circle-opacity': {
                    type    : 'identity',
                    property: 'opacity'
                },
                'circle-radius'        : 5,
                'circle-stroke-width'  : 2,
                'circle-stroke-color'  : '#fff',
                'circle-stroke-opacity': {
                    type    : 'identity',
                    property: 'opacity'
                }
            },
            layout: {
                'circle-sort-key': 1
            }
        } as mapboxgl.AnyLayer
    }
};

const layers_configs = {
    ids,
    sources,
    layers
};
export default layers_configs;
