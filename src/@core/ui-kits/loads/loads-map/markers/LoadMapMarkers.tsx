/* eslint-disable max-len */
// import { GeneralStopMarker } from '@/@core/components/general-map/general-map-markers/general-stop-marker/GeneralStopMarker';
// import { transformPhpStop } from '@/@core/components/general-map/general-map-markers/general-stop-marker/utils';
// import { MapHelper } from '@/utils/mapbox-utils/map-helper';
// import mapboxgl, { LngLatBoundsLike } from 'mapbox-gl';
// import { useEffect, useMemo, useRef, useState } from 'react';
// import { GeneralStopPopup } from '@/@core/components/general-map/general-map-popups/general-stop-popup/GeneralStopPopup';
// import { createPortal } from 'react-dom';
// import { LOAD_STOP_TYPE_GRPC_ENUM } from '@/models/loads/load-mappings';
// import {
//     useDomElementsMap,
//     useMapWorkerMarkerMouseHandlers
// } from '../../../../../views/dispatch/loads/Details/sections/load-map/hooks';

// type Props = {
//     mapWorker: MapHelper;
//     stopsList: ReturnType<typeof transformPhpStop>[] | null;
// };

// export default function LoadMapMarkers({
//     mapWorker,
//     stopsList
// }: Props) {
//     const [popupStop, setPopupStop] = useState<ReturnType<typeof transformPhpStop> | null>(null);

//     const [popupElement] = useState(() => document.createElement('div'));

//     const popupRef = useRef<mapboxgl.Popup>(
//         new mapboxgl.Popup({
//             offset      : 0,
//             anchor      : 'top',
//             closeButton : false,
//             closeOnClick: true,
//             closeOnMove : true,
//             className   : 'popup-stop-marker'
//         })
//     ).current;

//     const markersListRef = useRef<(mapboxgl.Marker | undefined)[]>([]);

//     const elements = useDomElementsMap(stopsList || [], 'load-details-delivered-stop-marker');

//     useEffect(() => {
//         if (!stopsList) return;
//         markersListRef.current = stopsList.map((feature) =>
//             mapWorker.addProMarker(feature.uniqueId, feature.lngLat, {
//                 anchor : 'bottom',
//                 offset : [0, -20],
//                 element: elements.get(feature.uniqueId)
//             }));
//     }, [stopsList, elements, mapWorker]);

//     const stopsCoordinates = useMemo(() => {
//         const coordinatesList =
//             stopsList
//                 ?.map((stop) => ({
//                     lon: stop.lngLat[0],
//                     lat: stop.lngLat[1]
//                 }))
//                 .filter((stop) => stop.lat && stop.lon) ?? [];

//         const stopsCoordinates: LngLatBoundsLike | null =
//             coordinatesList.length >= 2
//                 ? [coordinatesList[0], coordinatesList[coordinatesList.length - 1]]
//                 : null;
//         return stopsCoordinates;
//     }, [stopsList]);

//     const { generateClickToBoundHandler } = useMapWorkerMarkerMouseHandlers(
//         stopsCoordinates,
//         mapWorker
//     );

//     return (
//         <>
//             {stopsList?.map((stop, i) => {
//                 const element = elements.get(stop.uniqueId);
//                 if (!element) return null;

//                 if (stop.isSelected) element.style.zIndex = '600';
//                 if (!stop.isSelected) element.style.zIndex = '500';
//                 return createPortal(
//                     <GeneralStopMarker
//                         key={stop.uniqueId}
//                         sequence={i + 1}
//                         stopType={LOAD_STOP_TYPE_GRPC_ENUM[stop.stopType]}
//                         isCompleted={stop.isCompleted}
//                         scheduledAt={stop.scheduledAt}
//                         day={stop.day}
//                         isSelected={stop.isSelected}
//                         month={stop.month}
//                         time={stop.time}
//                         onClick={generateClickToBoundHandler(stop.lngLat)}
//                         onMouseEnter={() => {
//                             setPopupStop(stop);
//                             popupRef
//                                 .setLngLat(stop.lngLat)
//                                 .setDOMContent(popupElement)
//                                 .addTo(mapWorker.map);
//                         }}

//                         // stopStatus={LoadStopGrpcStatusEnumMap[stop.status]}
//                     />,
//                     element
//                 );
//             })}
//             {popupStop
//                 ? createPortal(
//                     <GeneralStopPopup
//                         city={popupStop.city}
//                         state={popupStop.state}
//                         stopType={LOAD_STOP_TYPE_GRPC_ENUM[popupStop.stopType]}
//                     />,
//                     popupElement
//                 )
//                 : null}
//         </>
//     );
// }
