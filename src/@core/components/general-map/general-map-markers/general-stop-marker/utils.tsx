/* eslint-disable max-len */
// import { LoadStopTypesEnum } from '@/models/loads/load-stop';
// import LoadsTypes from '@/services/dispatch/loads/types';
// import { Event_Truck_Route_Stop, Event_Truck_Route_Stop_Type } from '@proto/events/events';
// import { LoadModel_Stop_Status } from '@proto/models/model_load';
// import { GetTruckRouteReply_Stop } from '@proto/trucks';
// import moment from 'moment-timezone';

// type MarkerOptions = {
//     selectedLoadId: string;
//     truckId: string;
// };

// export const defaultStopMarkerData = {
//     appointmentEndAt  : '',
//     appointmentStartAt: '',
//     loadId            : '',
//     location          : {
//         city : '',
//         state: ''
//     },
//     status      : 1,
//     stopId      : '',
//     arrivedAt   : '',
//     checkedInAt : '',
//     checkedOutAt: ''
// };

// export const transformGrpcStopType = (stopType: Event_Truck_Route_Stop_Type): LoadStopTypesEnum => {
//     switch (stopType) {
//     case Event_Truck_Route_Stop_Type.Pickup:
//         return LoadStopTypesEnum.PICKUP;
//     case Event_Truck_Route_Stop_Type.Dropoff:
//         return LoadStopTypesEnum.DROPOFF;
//     default:
//         return LoadStopTypesEnum.PICKUP_DROPOFF;
//     }
// };

// export const transformPhpStop = (
//     stop: LoadsTypes.Stop,
//     {
//         selectedLoadId,
//         truckId
//     }: MarkerOptions
// ) => {
//     const startDate = moment(stop.appointmentStartAt);
//     return {
//         truckId,
//         arriveAt   : moment(stop.arrivedAt).unix(),
//         sequence   : stop.sequence,
//         stopId     : stop.stopId,
//         stopType   : stop.type,
//         city       : stop.location?.city || '',
//         state      : stop.location?.state || '',
//         isCompleted: stop.status === LoadModel_Stop_Status.completed,
//         scheduledAt: {
//             day  : startDate.isValid() ? startDate.format('D') : '',
//             month: startDate.isValid() ? startDate.format('MMM') : '',
//             time : startDate.isValid() ? startDate.format('H:mm') : ''
//         },
//         day       : startDate.isValid() ? startDate.format('D') : '',
//         month     : startDate.isValid() ? startDate.format('MMM') : '',
//         time      : startDate.isValid() ? startDate.format('H:mm') : '',
//         isSelected: true,
//         uniqueId  : `${selectedLoadId}_${stop.stopId}`,
//         lngLat    : [stop.location?.lon || 0, stop.location?.lat || 0] as [number, number]

//         // status    : stop.status,
//     };
// };

// export const transformGrpcStop = (
//     routeStop: Event_Truck_Route_Stop,
//     truckRouteStops: { [key: string]: GetTruckRouteReply_Stop },
//     {
//         selectedLoadId,
//         truckId
//     }: MarkerOptions & { truckId: string }
// ) => {
//     const stopMapKey = `${routeStop.loadId}_${routeStop.stopId}`;

//     const stopByMapKey: GetTruckRouteReply_Stop =
//         truckRouteStops[stopMapKey] || defaultStopMarkerData;

//     const scheduledAt = stopByMapKey.checkedOutAt || stopByMapKey.appointmentStartAt || '';

//     return {
//         truckId,
//         uniqueId   : `${routeStop.loadId}_${routeStop.stopId}`,
//         arriveAt   : routeStop.arrivesAt,
//         sequence   : routeStop.sequence,
//         stopId     : routeStop.stopId,
//         stopType   : routeStop.type,
//         city       : stopByMapKey.location?.city || '',
//         state      : stopByMapKey.location?.state || '',
//         isCompleted: truckRouteStops?.[stopMapKey]?.status === LoadModel_Stop_Status.completed,
//         scheduledAt: {
//             day  : moment(scheduledAt).format('D'),
//             month: moment(scheduledAt).format('MMM'),
//             time : moment(scheduledAt).format('H:mm')
//         },
//         day       : moment(routeStop.arrivesAt).format('D'),
//         month     : moment(routeStop.arrivesAt).format('MMM'),
//         time      : moment(routeStop.arrivesAt).format('H:mm'),
//         isSelected: routeStop.loadId === selectedLoadId,
//         lngLat    : [routeStop.lon ?? 0, routeStop.lat ?? 0] as [number, number]

//         // status    : routeStop. || LoadStopStatusEnumMap[StopStatuses.SCHEDULED]
//     };
// };
