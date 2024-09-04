import LoadboardGrpcService from '@/@grpcServices/services/loadboard-service/loadboard.service';
import { MapHelper } from '@/utils/mapbox-utils/map-helper';
import { layers } from '@/views/dispatch/orders/Details/sections/load-map/config';
import { useEffect, useMemo } from 'react';
import mapbox_polyline from '@mapbox/polyline';

type Props = {
    integrationId: string;
    resultId: string;
    searchId: string;
    mapWorker: MapHelper;
};

function RouteLayer({
    integrationId,
    resultId,
    searchId,
    mapWorker
}: Props) {
    const { data } = LoadboardGrpcService.useGetLoadboardRouteQuery({
        integrationId,
        resultId,
        searchId
    });
    const polyline = useMemo(() => data?.polyline || '', [data]);

    useEffect(() => {
        mapWorker.geojson.updateSourceData(
            'route_polyline_to_next_stop_source',
            mapWorker.defaultSources.featureLineString
        );
        mapWorker.addLayer(layers.route_polyline_to_next_stop);

        mapWorker.addLayer(layers.route_polyline_to_next_stop_arrows);

        return () => {
            mapWorker.removeLayer(layers.route_polyline_to_next_stop_arrows.id);
            mapWorker.removeLayer(layers.route_polyline_to_next_stop.id);
        };
    }, []);

    useEffect(() => {
        mapWorker.geojson.updateSourceData('route_polyline_to_next_stop_source', {
            type      : 'Feature',
            properties: {},
            geometry  : polyline
                ? mapbox_polyline.toGeoJSON(polyline)
                : {
                    type       : 'LineString',
                    coordinates: []
                }
        });
    }, [polyline]);
    return null;
}

export default RouteLayer;
