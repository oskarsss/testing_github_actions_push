import mapboxgl from 'mapbox-gl';
import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import EtaStatePopupContent from './Content';
import { PopupData } from '../../layers/EtaStatesLayer';

type Props = {
    data: PopupData | null;
    map: mapboxgl.Map;
    onMouseLeave?: () => void;
};

export default function EtaStatePopup({
    data,
    map,
    onMouseLeave
}: Props) {
    const popupElement = useRef(document.createElement('div'));
    const popupRef = useRef<mapboxgl.Popup>(
        new mapboxgl.Popup({
            offset      : 0,
            anchor      : 'top',
            closeButton : false,
            closeOnClick: true,
            closeOnMove : true,
            className   : 'manifest-popup-stop-marker'
        })
    ).current;

    useEffect(() => {
        if (!data) {
            popupRef.remove();
            return;
        }
        popupRef
            .setLngLat(data.coordinates as [number, number])
            .setDOMContent(popupElement.current)
            .addTo(map);
    }, [map, data, popupElement, popupRef]);

    return data
        ? createPortal(
            <EtaStatePopupContent
                onMouseLeave={onMouseLeave}
                data={data}
            />,
            popupElement.current
        )
        : null;
}
