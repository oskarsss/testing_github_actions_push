// /* eslint-disable max-len */
// import React, { useMemo } from 'react';
// import { useTrailerLocation } from '@/store/streams/events/hooks';
// import { MapHelper } from '@/utils/mapbox-utils/map-helper';
// import { FlyToPoint } from '@/views/dispatch/loads/Details/sections/load-map/LoadMap';
// import TrailersGrpcService from '@/@grpcServices/services/trailers.service';
// import { useAppSelector } from '@/store/hooks';
// import { TrailerDataSelectors } from '@/store/data-storage/trailers/slice';
// import LoadTrailerMarkerPortal from './LoadTrailerMarkerPortal';

// type Props = {
//     MapWorker: MapHelper;
//     trailer_id?: string;
//     isHideLayer: boolean;
//     flyToPoint: FlyToPoint;
// };

// export default function LoadTrailerMarker({
//     MapWorker,
//     trailer_id,
//     isHideLayer,
//     flyToPoint
// }: Props) {
//     const location = useTrailerLocation(trailer_id || '');

//     // const { data: trailers } = TrailersGrpcService.endpoints.getTrailers.useQueryState({});
//     const trailers = useAppSelector(TrailerDataSelectors.getRows);

//     const trailer_data = useMemo(() => {
//         if (
//             !trailerstrailers ||
//             !trailer_id ||
//             !location ||
//             !location.lon ||
//             !location.lat ||
//             isHideLayer
//         ) {
//             return null;
//         }
//         const trailer = trailers.trailers.find((trailer) => trailer.trailerId === trailer_id);
//         if (!trailer) {
//             return {
//                 trailerId         : trailer_id,
//                 trailerReferenceId: '',
//                 latLon            : [location.lon, location.lat] as [number, number]
//             };
//         }
//         return {
//             trailerId         : trailer_id,
//             trailerReferenceId: trailer.referenceId,
//             latLon            : [location.lon, location.lat] as [number, number]
//         };
//     }, [location, location?.lon, location?.lat, trailers?.trailers, trailer_id, isHideLayer]);

//     return (
//         <LoadTrailerMarkerPortal
//             mapWorker={MapWorker}
//             trailerData={trailer_data}
//             flyToPoint={flyToPoint}
//         />
//     );
// }
