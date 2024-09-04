import { MapHelper } from '@/utils/mapbox-utils/map-helper';
import mapboxgl from 'mapbox-gl';
import { useCallback, useMemo } from 'react';
import { doubleClickBoundHandler, doubleClickMapBoundHandler } from './config';

export const useMapWorkerMarkerMouseHandlers = (
    coordinates: mapboxgl.LngLatBoundsLike | null,
    mapWorker: MapHelper
) => {
    const generateClickToBoundHandler = useCallback(
        (stopPosition: [number, number]) =>
            doubleClickBoundHandler(mapWorker, stopPosition, coordinates),
        [coordinates]
    );

    return {
        generateClickToBoundHandler
    };
};

export const useMapMarkerMouseHandlers = (
    coordinates: mapboxgl.LngLatBoundsLike | null,
    map: mapboxgl.Map
) =>
    useCallback(
        (stopPosition: [number, number]) =>
            doubleClickMapBoundHandler(map, stopPosition, coordinates),
        [coordinates, map]
    );

export const useDomElementsMap = (targetData: { uniqueId: string }[], baseId: string) => {
    const elements = useMemo(() => {
        const elementsMap = new Map<string, HTMLElement>();
        targetData.forEach(({ uniqueId }) => {
            const currentElement = document.getElementById(`${baseId}_${uniqueId}`);
            if (currentElement) {
                elementsMap.set(uniqueId, currentElement);
                return;
            }
            const element = document.createElement('div');
            element.id = `${baseId}_${uniqueId}`;
            elementsMap.set(uniqueId, element);
        });
        return elementsMap;
    }, [targetData, baseId]);

    return elements;
};
