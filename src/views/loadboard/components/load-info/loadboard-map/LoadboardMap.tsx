/* eslint-disable react/destructuring-assignment */
import 'mapbox-gl/dist/mapbox-gl.css';
import { GeneralMap, GeneralMapContentProps } from '@/@core/components/general-map/GeneralMap';
import {
    LB_ListenSearchResultsReply_SearchResult_Destination,
    LB_ListenSearchResultsReply_SearchResult_Origin
} from '@proto/loadboard';
import { useEffect, useMemo } from 'react';
import mapboxgl from 'mapbox-gl';
import { useTruckLocation } from '@/store/streams/events/hooks';
import { Measures_Distance } from '@proto/models/model_measures';
import { Box } from '@mui/material';
import DestinationMarkerPortal from './markers/destination-marker/DestinationMarkerPortal';
import OriginMarkerPortal from './markers/origin-marker/OriginMarkerPortal';
import TruckMarkerPortal from './markers/truck-marker/TruckMarkerPortal';
import DetailPanel from './detail-panel/DetailPanel';
import RouteLayer from './route-layer/RouteLayer';

type Props = {
    destination?: LB_ListenSearchResultsReply_SearchResult_Destination;
    origin?: LB_ListenSearchResultsReply_SearchResult_Origin;
    truckId?: string;
    distance?: Measures_Distance;
    integrationId: string;
    resultId: string;
    searchId: string;
};

function LoadboardMapContent({
    map,
    destination,
    origin,
    truckId,
    distance,
    integrationId,
    mapMode,
    resultId,
    mapWorker,
    searchId
}: GeneralMapContentProps & Props) {
    const truckLocation = useTruckLocation(truckId);

    const waypoints = useMemo(() => {
        const bounds = new mapboxgl.LngLatBounds();

        if (origin) {
            bounds.extend([origin.lon, origin.lat]);
        }
        if (destination) {
            bounds.extend([destination.lon, destination.lat]);
        }
        if (truckLocation) {
            bounds.extend([truckLocation.lon, truckLocation.lat]);
        }
        return bounds;
    }, [origin, destination, truckLocation]);

    useEffect(() => {
        if (!waypoints) return;
        map.fitBounds(waypoints, {
            padding    : { bottom: 40, top: 30, left: 20, right: 20 },
            speed      : 10,
            maxDuration: 1900
        });
    }, [waypoints, map]);

    return (
        <Box
            sx={{
                position: 'relative',
                height  : '100%'
            }}
        >
            <OriginMarkerPortal
                origin={origin}
                map={map}
            />
            <DestinationMarkerPortal
                destination={destination}
                map={map}
            />
            <TruckMarkerPortal
                truckId={truckId}
                map={map}
            />
            <RouteLayer
                integrationId={integrationId}
                mapWorker={mapWorker}
                resultId={resultId}
                searchId={searchId}
            />
            <DetailPanel
                destination={destination}
                origin={origin}
                distance={distance}
            />
        </Box>
    );
}

const LoadboardMap = (params: Props) => (
    <GeneralMap>
        {(props) => (
            <LoadboardMapContent
                {...params}
                {...props}
            />
        )}
    </GeneralMap>
);

export default LoadboardMap;
