import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
import { MapHelper } from '@/utils/mapbox-utils/map-helper';
import { useEffect, useMemo } from 'react';
import { useAppSelector } from '@/store/hooks';
import { layers } from '../../../../../views/dispatch/orders/Details/sections/load-map/config';

type Props = {
    mapWorker: MapHelper;
    loadId?: string;
};

export default function PassedRouteLayer({
    mapWorker,
    loadId
}: Props) {
    const connected = useAppSelector((state) => state.loads.mapControllers.connectEtaPoints);
    const {
        data,
        error
    } = LoadsGrpcService.useGetLoadEtaStatesQuery({ loadId: loadId || '' });

    const isErrorEtaStates = !!error;

    const polylineCoordinates = useMemo(
        () =>
            data?.loadEtaStates && !isErrorEtaStates
                ? data?.loadEtaStates.map((etaState) => [etaState.truckLon, etaState.truckLat])
                : [],
        [data?.loadEtaStates, isErrorEtaStates]
    );

    useEffect(() => {
        mapWorker.geojson.updateSourceData(
            'passed_route_polyline_source',
            mapWorker.defaultSources.featureLineString
        );
        if (connected) {
            mapWorker.addLayer(layers.passed_route_polyline);

            return () => {
                mapWorker.removeLayer(layers.passed_route_polyline.id);
            };
        }
    }, [connected]);

    useEffect(() => {
        mapWorker.geojson.updateSourceData('passed_route_polyline_source', {
            type      : 'Feature',
            properties: {},
            geometry  : {
                type       : 'LineString',
                coordinates: polylineCoordinates
            }
        });
    }, [polylineCoordinates]);

    return null;
}
