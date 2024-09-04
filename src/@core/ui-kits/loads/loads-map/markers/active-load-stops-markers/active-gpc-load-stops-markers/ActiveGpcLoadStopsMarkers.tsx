/* eslint-disable max-len */
// /* eslint-disable react/jsx-props-no-multi-spaces */
// /* eslint-disable max-len */
// import React, { memo, useEffect, useMemo } from 'react';
// import { useManifestTruckRoute } from '@/services/streams/events/hooks';
// import { MapHelper } from '@/utils/mapbox-utils/map-helper';
// import { useGetTruckRouteQuery } from '@/@grpcServices/services/trucks.service';

// import {
//     transformGrpcStop,
//     transformPhpStop
// } from '@/@core/components/general-map/general-map-markers/general-stop-marker/utils';
// import { useLocationFleet } from '@/services/dispatch/scheduling/hooks';
// import mapboxgl from 'mapbox-gl';

// import LoadsGrpcService from '@/@grpcServices/services/loads-service/loads.service';
// import { LoadModel_Stop_Status } from '@proto/models/model_load';
// import { useStableArray } from '@/hooks/useStable';
// import { loadMapFitBoundsOptions } from '../../../../../../../views/dispatch/loads/Details/sections/load-map/config';
// import LoadMapMarkers from '../../LoadMapMarkers';

// type Props = {
//     MapWorker: MapHelper;
//     truck_id?: string;
//     isAutoFitFounds: boolean;
//     driverId?: string;
//     selectedLoadId: string;
// };

// /*
//     // Pending
//         -- act like in [LoadDelivered] - for now same thing

//     // InProgress/Assigned[Load Status: Assigned, InProgress]
//         1) [LoadInProgressTruckRouteLayer] Display Truck Route [ACTIVE-GPS]
//             1) Load.InProgress + TruckRoute
//             1.0) Auto zoom supported
//             1.1) LoadInProgressTruckRouteZoomLayer
//                 - Zoom between truck.location(truck/device-use-latest) and first stop of load (truck.route.stops.where((stop).load_id == load.id).first)
//                 - if auto zoom is OFF, then NO ZOOM
//                 - when you switch to another load, auto zoom gets enabled
//                 - when auto zoom becomes disabled --> STOP ZOOMING, dont do anything

//         2) [LoadInProgressActiveStopsLayer] Display Load Active Stops [NO GPS]
//             1) Load.InProgress without TruckRoute[no gps]
//             1.0) Auto zoom NOT supported
//             1.1) LoadInProgressActiveStopsZoomLayer
//                 - Zoom between ALL stops besides completed

//         3)[LoadInProgressCompletedStopsLayer] Display Load Completed Stops
//             1) Display all times, where stop.status == completed

//         4) [LoadInProgressEtaStatesLayer] Display Load Eta States
//             1) Display ETA states from GetLoadEtaStates

//     // Delivered | TONU
//         1) [DeliveredLoadAllStopsLayer] Display Delivered Load All Stops
//             1) Display all times, all stops - Simple
//         2) [DeliveredLoadEtaStatesLayer] Display Load Eta States
//               1) Display ETA states from GetLoadEtaStates
//                 1.1) IF empty.. display load.polyline
//         3) [DeliveredLoadZoomLayer] Zoom between ALL stops(fitBounds all stops)

//  */

// function ActiveGpcLoadStopsMarkers({
//     MapWorker,
//     truck_id,
//     isAutoFitFounds,
//     driverId,
//     selectedLoadId
// }: Props) {
//     const { currentData } = LoadsGrpcService.useGetLoadQuery(
//         { loadId: selectedLoadId },
//         { skip: !selectedLoadId }
//     );

//     const stops = useStableArray(currentData?.load?.stops);

//     const { currentData: truckRouteData } = useGetTruckRouteQuery({
//         truckId: truck_id || ''
//     });
//     const fleetLocation = useLocationFleet(driverId || '', truck_id || '');

//     const route = useManifestTruckRoute(truck_id || '');

//     const stopListActiveStopIdx = useMemo(
//         () => route?.findIndex((stop) => stop.loadId === selectedLoadId),
//         [route, selectedLoadId]
//     );

//     const currentLoadsStopsWaypoints: mapboxgl.LngLatBounds | null = useMemo(() => {
//         if (!route || !isAutoFitFounds) return null;

//         if (stopListActiveStopIdx > -1 && fleetLocation.type) {
//             const bounds = new mapboxgl.LngLatBounds();

//             const stopsCoordinates = route
//                 .slice(0, stopListActiveStopIdx + 1)
//                 .map((stop) => ({ lng: stop.lon, lat: stop.lat }))
//                 .filter((stop) => stop.lng && stop.lat);

//             if (!stopsCoordinates.length) return null;

//             bounds.extend([fleetLocation.lon, fleetLocation.lat]);
//             stopsCoordinates.forEach((coord) => {
//                 bounds.extend([coord.lng, coord.lat]);
//             });

//             return bounds;
//         }
//         return null;
//     }, [route, isAutoFitFounds, fleetLocation, stopListActiveStopIdx]);

//     useEffect(() => {
//         if (!currentLoadsStopsWaypoints) return;
//         MapWorker.fitBounds(currentLoadsStopsWaypoints, loadMapFitBoundsOptions);
//     }, [MapWorker, currentLoadsStopsWaypoints]);

//     const truck_data = useMemo(() => {
//         const completedStops = stops.filter(
//             (stop) =>
//                 stop.status === LoadModel_Stop_Status.completed ||
//                 stop.status === LoadModel_Stop_Status.tonu
//         );

//         const featuresCompleted = completedStops.map((stop) =>
//             transformPhpStop(stop, { selectedLoadId, truckId: truck_id || '' }));

//         const featuresRouteData =
//             route?.map((routeStop) =>
//                 transformGrpcStop(routeStop, truckRouteData?.stops || {}, {
//                     selectedLoadId,
//                     truckId: truck_id || ''
//                 })) ?? [];

//         return [...featuresCompleted, ...featuresRouteData];
//     }, [stops, route?.stops, selectedLoadId, truck_id, truckRouteData]);
//     return (
//         <LoadMapMarkers

//             // @ts-ignore
//             stopsList={truck_data}
//             mapWorker={MapWorker}
//         />
//     );
// }

// export default memo(ActiveGpcLoadStopsMarkers);
