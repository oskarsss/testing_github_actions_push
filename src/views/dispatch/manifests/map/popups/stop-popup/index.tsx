// import React, { useEffect, useRef, useState } from 'react';
// import { createPortal } from 'react-dom';
// import mapboxgl from 'mapbox-gl';
// import StopMarkerPopupContent from './Content';
// import { PreparedMapStop } from '../../../utils';

// type Props = {
//     popupData?: PreparedMapStop | null;
//     map: mapboxgl.Map;
//     setPopupData: React.Dispatch<React.SetStateAction<PreparedMapStop | null>>;
// };

// function StopMarkerPopup({
//     popupData,
//     map,
//     setPopupData
// }: Props) {
//     const popupElement = useRef(document.createElement('div'));
//     const popupRef = useRef<mapboxgl.Popup>(
//         new mapboxgl.Popup({
//             offset      : 0,
//             anchor      : 'top',
//             closeButton : false,
//             closeOnClick: true,
//             closeOnMove : true,
//             className   : 'manifest-popup-stop-marker'
//         })
//     ).current;
//     useEffect(() => {
//         if (!popupData) {
//             popupRef.remove();

//             // setPopupData(null);
//             return;
//         }
//         popupRef
//             .setLngLat(popupData.lonLat as [number, number])
//             .setDOMContent(popupElement.current)
//             .addTo(map);

//         const onClose = () => {
//             setPopupData(null);
//         };
//         popupRef.on('close', onClose);
//         return () => {
//             popupRef.off('close', onClose);
//         };
//     }, [map, popupData, popupElement, popupRef, setPopupData]);

//     return popupData
//         ? createPortal(
//             <StopMarkerPopupContent
//                 stop={popupData}
//             />,
//             popupElement.current
//         )
//         : null;
// }

// export default React.memo(StopMarkerPopup);
