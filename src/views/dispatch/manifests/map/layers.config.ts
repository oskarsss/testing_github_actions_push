import { AnyLayer } from 'mapbox-gl';

export const MANIFEST_MAP_CONFIG = {
    route_polyline_to_next_stop: {
        layerId : 'route_polyline_to_next_stop',
        sourceId: 'route_polyline_to_next_stop_source'
    },
    eta_states: {
        layerId : 'eta_states',
        sourceId: 'eta_states_source'
    },
    passed_route_polyline: {
        layerId : 'passed_route_polyline',
        sourceId: 'passed_route_polyline_source'
    },
    stops_pointers: {
        layerId : 'stops_pointers',
        sourceId: 'stops_pointers_source'
    },
    route_from_stop_to_next_stop: {
        layerId : 'route_from_stop_to_next_stop',
        sourceId: 'route_from_stop_to_next_stop_source'
    }
} as const;

type T = AnyLayer;

const MANIFEST_LAYERS = {
    route_polyline_to_next_stop: {
        id: MANIFEST_MAP_CONFIG.route_polyline_to_next_stop.layerId,

        type  : 'line',
        source: MANIFEST_MAP_CONFIG.route_polyline_to_next_stop.sourceId,
        paint : {
            'line-color': '#155EEF',
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
            ]
        }
    } as T,
    eta_states: {
        id    : MANIFEST_MAP_CONFIG.eta_states.layerId,
        type  : 'circle',
        source: MANIFEST_MAP_CONFIG.eta_states.sourceId,
        paint : {
            // 'circle-radius'      : 6,
            'circle-radius': [
                'interpolate',
                ['linear'],
                ['zoom'],
                5,
                4,
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
                2,
                5,
                2,
                9,
                2

                // 23,
                // 10
            ]
        }
    } as T,
    passed_route_polyline: {
        id    : MANIFEST_MAP_CONFIG.passed_route_polyline.layerId,
        type  : 'line',
        source: MANIFEST_MAP_CONFIG.passed_route_polyline.sourceId,
        paint : {
            'line-color': '#91abdf',
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
            ]
        }
    } as T,
    stops_pointers: {
        id    : MANIFEST_MAP_CONFIG.stops_pointers.layerId,
        type  : 'circle',
        source: MANIFEST_MAP_CONFIG.stops_pointers.sourceId,
        filter: ['!=', 'cluster', true],
        paint : {
            'circle-radius': 5,
            'circle-color' : '#FFFFFF',

            'circle-stroke-color': '#0A43E1',

            'circle-stroke-width': 5
        }
    } as T,
    route_from_stop_to_next_stop: {
        id    : MANIFEST_MAP_CONFIG.route_from_stop_to_next_stop.layerId,
        type  : 'line',
        source: MANIFEST_MAP_CONFIG.route_from_stop_to_next_stop.sourceId,
        paint : {
            'line-color': '#BBC5DA',
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
            ]
        }
    } as T
} as const;

export default MANIFEST_LAYERS;
