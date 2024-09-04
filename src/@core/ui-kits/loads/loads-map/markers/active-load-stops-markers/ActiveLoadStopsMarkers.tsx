/* eslint-disable max-len */
// import { MapHelper } from '@/utils/mapbox-utils/map-helper';
// import React from 'react';
// import { useManifestTruckRoute } from '@/services/streams/events/hooks';
// import ActiveGpcLoadStopsMarkers from './active-gpc-load-stops-markers/ActiveGpcLoadStopsMarkers';
// import NoActiveGpcLoadStopsMarkers from './no-active-gpc-load-stops-markers/NoActiveGpcLoadStopsMarkers';

// type Props = {
//     mapWorker: MapHelper;
//     truckId?: string;
//     driverId?: string;
//     isAutoFitFounds: boolean;
//     selectedLoadId: string;
// };

// export default function ActiveLoadStopsMarkers({
//     mapWorker,
//     isAutoFitFounds,
//     truckId,
//     driverId,
//     selectedLoadId
// }: Props) {
//     const route = useManifestTruckRoute(truckId || '');

//     return route ? (
//         <ActiveGpcLoadStopsMarkers
//             selectedLoadId={selectedLoadId}
//             MapWorker={mapWorker}
//             isAutoFitFounds={isAutoFitFounds}
//             truck_id={truckId}
//             driverId={driverId}
//         />
//     ) : (
//         <NoActiveGpcLoadStopsMarkers
//             selectedLoadId={selectedLoadId}
//             mapWorker={mapWorker}
//         />
//     );
// }
