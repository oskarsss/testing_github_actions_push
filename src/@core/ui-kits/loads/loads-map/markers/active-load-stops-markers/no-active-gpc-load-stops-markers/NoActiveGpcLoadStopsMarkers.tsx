/* eslint-disable max-len */
// import { transformPhpStop } from '@/@core/components/general-map/general-map-markers/general-stop-marker/utils';
// import { MapHelper } from '@/utils/mapbox-utils/map-helper';
// import { LngLatBoundsLike } from 'mapbox-gl';
// import { useEffect, useMemo, useState } from 'react';
// import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
// import { LoadModel_Stop_Status } from '@proto/models/model_load';
// import { loadMapFitBoundsOptions } from '../../../../../../../views/dispatch/loads/Details/sections/load-map/config';
// import LoadMapMarkers from '../../LoadMapMarkers';

// type Props = {
//     mapWorker: MapHelper;
//     selectedLoadId: string;
// };

// export default function NoActiveGpcLoadStopsMarkers({
//     mapWorker,
//     selectedLoadId
// }: Props) {
//     const { data: loadData } = LoadsGrpcService.useGetLoadQuery(
//         { loadId: selectedLoadId },
//         { skip: !selectedLoadId }
//     );
//     const [fitToBounds, setFitToBounds] = useState(false);

//     const [stopsList, stopsCoordinates] = useMemo(() => {
//         const stopsList =
//             loadData?.load?.stops.map((stop) =>
//                 transformPhpStop(stop, {
//                     truckId: loadData?.load?.truckId || '',
//                     selectedLoadId
//                 })) || [];

//         const coordinatesList =
//             loadData?.load?.stops
//                 .filter((stop) => stop.status !== LoadModel_Stop_Status.completed)
//                 .map((stop) => ({
//                     lon: stop.location?.lon,
//                     lat: stop.location?.lat
//                 }))
//                 .filter((stop) => stop.lon && stop.lat) ?? [];
//         const stopsCoordinates =
//             coordinatesList.length >= 2
//                 ? ([
//                     coordinatesList[0],
//                     coordinatesList[coordinatesList.length - 1]
//                 ] as LngLatBoundsLike)
//                 : null;
//         return [stopsList, stopsCoordinates];
//     }, [loadData?.load?.stops, loadData?.load?.truckId, selectedLoadId]);

//     useEffect(() => {
//         setFitToBounds(true);
//     }, [selectedLoadId]);

//     useEffect(() => {
//         if (!stopsCoordinates || !fitToBounds) return;
//         mapWorker.fitBounds(stopsCoordinates, loadMapFitBoundsOptions);
//     }, [fitToBounds, mapWorker, stopsCoordinates]);

//     return (
//         <LoadMapMarkers
//             stopsList={stopsList}
//             mapWorker={mapWorker}
//         />
//     );
// }
