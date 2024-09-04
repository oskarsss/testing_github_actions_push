/* eslint-disable max-len */
// /* eslint-disable max-len */
// /* eslint-disable consistent-return */
// /* eslint-disable prefer-destructuring */
// import React, { useMemo } from 'react';
// // eslint-disable-next-line import/no-extraneous-dependencies
// import { useLastDriversLocation } from '@/store/streams/events/hooks';
// import { MapHelper } from '@/utils/mapbox-utils/map-helper';

// import moment from 'moment-timezone';
// import usePrivateFileUrl from '@/hooks/usePrivatFileUrl';
// import DriversGrpcService from '@/@grpcServices/services/drivers.service';
// import { FlyToPoint } from '@/views/dispatch/loads/Details/sections/load-map/LoadMap';
// import LoadDriverMarkerPortal from './LoadDriverMarkerPortal';

// type Props = {
//     MapWorker: MapHelper;
//     driverId?: string;
//     flyToPoint: FlyToPoint;
//     isHideLayer: boolean;
// };

// function LoadDriverMarker({
//     MapWorker,
//     driverId,
//     isHideLayer,
//     flyToPoint
// }: Props) {
//     const locations = useLastDriversLocation();
//     const { data: drivers } = DriversGrpcService.endpoints.getDrivers.useQueryState({});

//     const driver = useMemo(
//         () => drivers?.drivers.find((driver) => driver.driverId === driverId),
//         [drivers?.drivers, driverId]
//     );

//     const { url } = usePrivateFileUrl(driver?.selfieThumbUrl);

//     const mainDriver = useMemo(() => {
//         const location = locations.get(driverId || '');
//         if (!location || isHideLayer) {
//             return {
//                 driver  : null,
//                 isOnline: false
//             };
//         }

//         return {
//             isOnline: moment().diff(moment(location.timestamp), 'minutes') < 2,
//             driver  : {
//                 lngLat              : [location.lon, location.lat] as [number, number],
//                 driverId            : driverId || '',
//                 driverAvatarText    : `${driver?.firstName.at(0)} ${driver?.lastName?.at(0) || ''}`,
//                 driverName          : `${driver?.firstName} ${driver?.lastName || ''}`,
//                 driverSelfieThumbUrl: url || ''
//             }
//         };
//     }, [locations, driverId, driver, url, isHideLayer]);

//     return (
//         <LoadDriverMarkerPortal
//             flyToPoint={flyToPoint}
//             isOnline={mainDriver.isOnline}
//             mainDriver={mainDriver.driver}
//             mapWorker={MapWorker}
//         />
//     );
// }

// export default React.memo(LoadDriverMarker);
