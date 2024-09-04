/* eslint-disable max-len */
// import { transformPhpStop } from '@/@core/components/general-map/general-map-markers/general-stop-marker/utils';
// import { MapHelper } from '@/utils/mapbox-utils/map-helper';
// import { LngLatBoundsLike } from 'mapbox-gl';
// import { useEffect, useMemo, useState } from 'react';
// import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
// import { loadMapFitBoundsOptions } from '../../../../../views/dispatch/loads/Details/sections/load-map/config';
// import LoadMapMarkers from './LoadMapMarkers';

// type Props = {
//     mapWorker: MapHelper;
//     selectedLoadId: string;
// };

// export default function DeliveredStopsMarkers({
//     mapWorker,
//     selectedLoadId
// }: Props) {
//     const [fitToBounds, setFitToBounds] = useState(false);
//     const { currentData: loadData } = LoadsGrpcService.useGetLoadQuery({
//         loadId: selectedLoadId
//     });

//     const [stopsList, stopsCoordinates] = useMemo(() => {
//         const stopsList =
//             loadData?.load?.stops.map((stop) =>
//                 transformPhpStop(stop, {
//                     truckId: loadData?.load?.truckId || '',
//                     selectedLoadId
//                 })) || [];

//         const coordinatesList =
//             loadData?.load?.stops
//                 .map((stop) => ({
//                     lon: stop?.location?.lon || 0,
//                     lat: stop?.location?.lat || 0
//                 }))
//                 .filter((stop) => stop.lat && stop.lon) ?? [];

//         const stopsCoordinates: LngLatBoundsLike | null =
//             coordinatesList.length >= 2
//                 ? [coordinatesList[0], coordinatesList[coordinatesList.length - 1]]
//                 : null;
//         return [stopsList, stopsCoordinates];
//     }, [loadData?.load?.stops, loadData?.load?.truckId, selectedLoadId]);

//     useEffect(() => {
//         setFitToBounds(true);
//     }, [selectedLoadId]);

//     useEffect(() => {
//         if (!stopsCoordinates || !fitToBounds) return;
//         mapWorker.fitBounds(stopsCoordinates, loadMapFitBoundsOptions);
//         setFitToBounds(false);
//     }, [stopsCoordinates, mapWorker, fitToBounds]);

//     return (
//         <LoadMapMarkers
//             stopsList={stopsList}
//             mapWorker={mapWorker}
//         />
//     );
// }
