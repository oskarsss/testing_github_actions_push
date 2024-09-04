/* eslint-disable max-len */
// /* eslint-disable prefer-destructuring */
// import React, { useMemo } from 'react';
// import { useTruckLocation } from '@/store/streams/events/hooks';
// import { MapHelper } from '@/utils/mapbox-utils/map-helper';
// import moment from 'moment-timezone';
// import TrucksGrpcService from '@/@grpcServices/services/trucks.service';
// import LoadTruckMarkerPortal from './LoadTruckMarkerPortal';
// import { FlyToPoint } from '../../../../../../views/dispatch/loads/Details/sections/load-map/LoadMap';

// type Props = {
//     MapWorker: MapHelper;
//     truck_id?: string;
//     isHideLayer: boolean;
//     flyToPoint: FlyToPoint;
// };

// export default function LoadTruckMarker({
//     MapWorker,
//     truck_id,
//     isHideLayer,
//     flyToPoint
// }: Props) {
//     const location = useTruckLocation(truck_id || '');
//     const { data: trucks } = TrucksGrpcService.endpoints.getTrucks.useQueryState({});
//     const isOnline = location ? moment().diff(moment(location.timestamp), 'minutes') < 2 : false;

//     const truck_data = useMemo(() => {
//         if (!trucks?.trucks || !truck_id || !location || !location.lon || !location.lat) {
//             return null;
//         }
//         const truck = trucks.trucks.find((truck) => truck.truckId === truck_id);
//         if (!truck || isHideLayer) {
//             return {
//                 lngLat          : [location.lon, location.lat] as [number, number],
//                 truckId         : truck_id,
//                 truckReferenceId: ''
//             };
//         }

//         return {
//             lngLat          : [location.lon, location.lat] as [number, number],
//             truckId         : truck_id,
//             truckReferenceId: truck.referenceId
//         };
//     }, [location?.lon, location?.lat, trucks?.trucks, truck_id, isHideLayer]);

//     return (
//         <LoadTruckMarkerPortal
//             isOnline={isOnline}
//             flyToPoint={flyToPoint}
//             truckData={truck_data}
//             mapWorker={MapWorker}
//         />
//     );
// }
