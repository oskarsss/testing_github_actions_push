import { LoadStopTypesEnum } from '@/models/loads/load-stop';
import {
    DropOffIcon,
    PickUpAndDropOffIcon,
    PickupIcon
} from '@/@core/theme/entities/load/load_stop_icons';
import mapboxgl from 'mapbox-gl';
import { MapHelper } from '@/utils/mapbox-utils/map-helper';

export const layers = {
    buildings_3d: {
        id            : 'add-3d-buildings',
        source        : 'composite',
        'source-layer': 'building',
        filter        : ['==', 'extrude', 'true'],
        type          : 'fill-extrusion',
        minzoom       : 15,
        paint         : {
            'fill-extrusion-color' : '#aaa',
            'fill-extrusion-height': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'height']
            ],
            'fill-extrusion-base': [
                'interpolate',
                ['linear'],
                ['zoom'],
                15,
                0,
                15.05,
                ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
        }
    } as mapboxgl.AnyLayer,

    route_polyline_to_next_stop_arrows: {
        id    : 'route_polyline_to_next_stop_arrows_layer',
        type  : 'symbol',
        source: 'route_polyline_to_next_stop_source',
        layout: {
            'symbol-placement'  : 'line',
            'text-field'        : '▶',
            'text-size'         : ['interpolate', ['linear'], ['zoom'], 5, 30, Infinity, 40],
            'symbol-spacing'    : ['interpolate', ['linear'], ['zoom'], 5, 10, 100, 45],
            'text-keep-upright' : false,
            'text-allow-overlap': true
        },
        paint: {
            'text-color': {
                type    : 'identity',
                property: 'color',
                default : '#c7dbfc'
            },
            'text-halo-color': 'hsl(55, 11%, 96%)',
            'text-opacity'   : 1
        }
    } as mapboxgl.AnyLayer,
    route_polyline_to_destination_arrows: {
        id    : 'route_polyline_to_destination_arrows_layer',
        type  : 'symbol',
        source: 'route_polyline_to_destination_source',
        layout: {
            'symbol-placement'  : 'line',
            'text-field'        : '▶',
            'text-size'         : ['interpolate', ['linear'], ['zoom'], 5, 30, Infinity, 40],
            'symbol-spacing'    : ['interpolate', ['linear'], ['zoom'], 5, 7, 100, 50],
            'text-keep-upright' : false,
            'text-allow-overlap': true
        },
        paint: {
            'text-color': {
                type    : 'identity',
                property: 'color',

                default: '#266EBC'

                // default: '#7a9af0'
            },
            'text-halo-color': 'hsl(55, 11%, 96%)',
            'text-opacity'   : 1
        }
    } as mapboxgl.AnyLayer,
    traffic: {
        id            : 'traffic',
        type          : 'line',
        source        : 'mapbox-traffic',
        'source-layer': 'traffic',
        paint         : {
            'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                12,
                ['match', ['get', 'class'], 'motorway', 2, 1],
                16,
                ['match', ['get', 'class'], 'motorway', 6, 4],
                20,
                ['match', ['get', 'class'], 'motorway', 20, 10],
                22,
                ['match', ['get', 'class'], 'motorway', 40, 20],
                23,
                ['match', ['get', 'class'], 'motorway', 80, 40]
            ],
            'line-color': [
                'match',
                ['get', 'congestion'],
                'low',
                '#16DF97',
                'moderate',
                '#FFCF43',
                'heavy',
                '#F24E42',
                'severe',
                '#A92627',
                '#ccc'
            ]
        }
    } as mapboxgl.AnyLayer,
    load_route: {
        id    : 'load_route',
        type  : 'line',
        source: 'polyline_source',
        layout: {
            'line-join': 'round',
            'line-cap' : 'round'
        },
        paint: {
            'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                12,
                6,
                16,
                12,
                20,
                30,
                22,
                60,
                23,
                120
            ],

            // 'line-opacity': 0.9,
            'line-color': '#266EBC' // '#3c7eff'
        }
    } as mapboxgl.AnyLayer,
    route_polyline_to_next_stop: {
        id    : 'route_polyline_to_next_stop_layer',
        type  : 'line',
        source: 'route_polyline_to_next_stop_source',
        layout: {
            'line-join': 'round',
            'line-cap' : 'round'
        },
        paint: {
            'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                12,
                6,
                16,
                12,
                20,
                30,
                22,
                60,
                23,
                120
            ],

            // 'line-opacity': 0.9,
            'line-color': '#155EEF' // '#3c7eff'
        }
    } as mapboxgl.AnyLayer,

    passed_route_polyline: {
        id    : 'passed_route_polyline_layer',
        type  : 'line',
        source: 'passed_route_polyline_source',
        layout: {
            'line-join': 'round',
            'line-cap' : 'round'
        },
        paint: {
            'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                12,
                6,
                16,
                12,
                20,
                30,
                22,
                60,
                23,
                120
            ],

            // 'line-opacity': 0.7,
            'line-color': '#B2CCFF' // '#3c7eff'
        }
    } as mapboxgl.AnyLayer,
    route_polyline_to_destination: {
        id    : 'route_polyline_to_destination_layer',
        type  : 'line',
        source: 'route_polyline_to_destination_source',
        layout: {
            'line-join': 'round',
            'line-cap' : 'round'
        },
        paint: {
            'line-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                12,
                6,
                16,
                12,
                20,
                30,
                22,
                60,
                23,
                120
            ],

            // 'line-opacity': 0.5,
            'line-color': '#BBC5DA' // '#3c7eff'
        }
    } as mapboxgl.AnyLayer,
    completed_stops: {
        id    : 'completed_stops_layer',
        type  : 'circle',
        source: 'completed_stops_source',
        paint : {
            'circle-radius'      : 12,
            'circle-color'       : ['get', 'color'],
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': 4
        }
    } as mapboxgl.AnyLayer,
    load_eta_state_circles: {
        id    : 'load_eta_state_circles_layer',
        type  : 'circle',
        source: 'load_eta_state_circles_source',
        paint : {
            // 'circle-radius'      : 6,
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                5,
                3,
                9,
                6,

                // 16,
                // 12,
                // 20,
                // 30,
                // 22,
                // 60,
                23,
                10
            ],
            'circle-color'       : '#266EBC', // ['get', 'color'],
            // 'circle-opacity'     : 0.5,
            'circle-stroke-color': '#ffffff',
            'circle-stroke-width': [
                'interpolate',
                ['linear'],
                ['zoom'],
                1,
                0,
                5,
                0,
                9,
                1

                // 23,
                // 10
            ]
        }
    } as mapboxgl.AnyLayer,
    index: {
        id    : 'index',
        type  : 'symbol',
        source: 'points',
        layout: {
            'text-field'        : ['get', 'index'],
            'text-allow-overlap': true,
            'text-size'         : 12,
            'symbol-sort-key'   : 9
        },
        paint: {
            'text-color': '#ffffff'
        }
    } as mapboxgl.AnyLayer,
    driver_image: {
        id    : 'driver_image',
        type  : 'symbol',
        source: 'driver', // reference the data source
        layout: {
            'icon-image'        : 'driver', // reference the image
            'icon-size'         : 0.4,
            'icon-allow-overlap': true,
            'symbol-sort-key'   : 10
        }
    } as mapboxgl.AnyLayer,
    truck_image: {
        id    : 'truck_image',
        type  : 'symbol',
        source: 'truck', // reference the data source
        layout: {
            'icon-image'        : 'truck', // reference the image
            'icon-size'         : 0.4,
            'icon-allow-overlap': true,
            'symbol-sort-key'   : 10
        }
    } as mapboxgl.AnyLayer,
    truck_route: {
        id    : 'truck_route',
        type  : 'symbol',
        source: 'truck_route', // reference the data source
        layout: {
            'icon-image'   : { type: 'identity', property: 'image' },
            'icon-padding' : 5,
            'icon-anchor'  : 'bottom',
            'text-anchor'  : 'bottom',
            'icon-text-fit': 'both',

            'icon-size': 0.8,

            // "text-font": ["Roboto Mono"],
            'text-size': 16,

            // 'text-padding': 7,

            // 'text-field'  : { type: 'identity', property: 'title' },

            'text-field': { type: 'identity', property: 'title' },

            // 'icon-offset'          : [0, -10],
            // 'text-offset'          : [0, -10],
            'text-letter-spacing': 0,
            'text-justify'       : 'left',
            'icon-allow-overlap' : true,
            'text-allow-overlap' : true,

            'icon-text-fit-padding': [6, 14, 18, 14] // selected: ? [12, 16, 18, 16] :
        },

        /** @type {mapboxgl.AnyPaint} */
        paint: {
            'text-color'     : '#000',
            'icon-halo-color': 'rgba(255, 255, 0, 0.7)',
            'icon-halo-blur' : 5,
            'icon-halo-width': 5
        }
    } as mapboxgl.AnyLayer,
    trailer_image: {
        id    : 'trailer_image',
        type  : 'symbol',
        source: 'trailer', // reference the data source
        layout: {
            'icon-image'        : 'trailer', // reference the image
            'icon-size'         : 0.4,
            'icon-allow-overlap': true,
            'symbol-sort-key'   : 10
        }
    } as mapboxgl.AnyLayer,
    weather: {
        id     : 'weather',
        type   : 'raster',
        source : 'tomorrow-io-api',
        minzoom: 1,
        maxzoom: 12,
        paint  : {
            'raster-opacity': 0.7
        }
    } as mapboxgl.AnyLayer
};

export const getMapLoadStopType = (type: LoadStopTypesEnum) => {
    switch (type) {
    case 'pickup':
        return {
            label     : 'Pick up',
            color     : '#32D583',
            background: '#D1FADF',
            icon      : PickupIcon
        };
    case 'dropoff':
        return {
            label     : 'Drop off',
            color     : '#F97066',
            background: '#FEE4E2',
            icon      : DropOffIcon
        };
    case 'pickup_dropoff':
        return {
            label     : 'Pick up & Drop off',
            color     : '#F97066',
            background: '#FEE4E2',
            icon      : PickUpAndDropOffIcon
        };
    default:
        return {
            label     : 'none',
            color     : '#F97066',
            background: '#FEE4E2',
            icon      : PickUpAndDropOffIcon
        };
    }
};

export const timeThreshold = 24;

export const loadMapFitBoundsOptions: mapboxgl.FitBoundsOptions = {
    padding    : { bottom: 40, top: 120, left: 80, right: 80 },
    speed      : 10,
    maxDuration: 1900
};

export const doubleClickBoundHandler = (
    mapWorker: MapHelper,
    stopLngLat: number[],
    stopsCoordinates: mapboxgl.LngLatBoundsLike | null
) => {
    let firstClickTimestamp = 0;
    let timeoutId: NodeJS.Timeout | null = null;
    return (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        mapWorker.map.doubleClickZoom.disable();
        if (e.detail === 1 && timeoutId === null) {
            firstClickTimestamp = e.timeStamp;
            timeoutId = setTimeout(() => {
                timeoutId = null;
                mapWorker.map.doubleClickZoom.enable();
                if (firstClickTimestamp === e.timeStamp) {
                    mapWorker.flyTo([stopLngLat[0], stopLngLat[1]], 14);
                    firstClickTimestamp = 0;
                }
            }, 250);
            return;
        }

        if (e.detail > 1 && timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
            firstClickTimestamp = 0;

            if (stopsCoordinates) {
                mapWorker.fitBounds(stopsCoordinates, loadMapFitBoundsOptions);
            }
        }
        setTimeout(() => {
            mapWorker.map.doubleClickZoom.enable();
            timeoutId = null;
            firstClickTimestamp = 0;
        }, 300);
    };
};

export const doubleClickMapBoundHandler = (
    map: mapboxgl.Map,
    stopLngLat: number[],
    stopsCoordinates: mapboxgl.LngLatBoundsLike | null
) => {
    let firstClickTimestamp = 0;
    let timeoutId: NodeJS.Timeout | null = null;
    return (e: React.MouseEvent<HTMLElement>) => {
        e.stopPropagation();
        map.doubleClickZoom.disable();
        if (e.detail === 1 && timeoutId === null) {
            firstClickTimestamp = e.timeStamp;
            timeoutId = setTimeout(() => {
                timeoutId = null;
                map.doubleClickZoom.enable();
                if (firstClickTimestamp === e.timeStamp) {
                    map.flyTo({
                        center: [stopLngLat[0], stopLngLat[1]],
                        zoom  : 14,
                        speed : 14
                    });
                    firstClickTimestamp = 0;
                }
            }, 250);
            return;
        }

        if (e.detail > 1 && timeoutId !== null) {
            clearTimeout(timeoutId);
            timeoutId = null;
            firstClickTimestamp = 0;

            if (stopsCoordinates) {
                map.fitBounds(stopsCoordinates, loadMapFitBoundsOptions);
            }
        }
        setTimeout(() => {
            map.doubleClickZoom.enable();
            timeoutId = null;
            firstClickTimestamp = 0;
        }, 300);
    };
};
