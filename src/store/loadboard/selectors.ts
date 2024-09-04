/* eslint-disable import/prefer-default-export */
import { RootState } from '@/store/types';
import { useStableArray } from '@/hooks/useStable';
import { useMemo } from 'react';
import createMap from '@/utils/create-map';
import { useAppSelector } from '../hooks';

export const loadboardSelectedSearchIdSelectors = (state: RootState) =>
    state.loadboard.selectedSearchId;

export const loadboardSelectedLoadIdSelector = (state: RootState) =>
    state.loadboard.selectedLoads[state.loadboard.selectedSearchId];

export const loadboardEquipmentsMapSelector = (state: RootState) => state.loadboard.equipmentsMap;

export const loadboardSearchesMapSelector = (state: RootState) => state.loadboard.searchesMap;

export const loadboardFavoritesLoads = (state: RootState) =>
    state.loadboard.favoriteLoads[state.loadboard.selectedSearchId];

export const useLoadboardSelectedSearchResultsMap = () => {
    const searchId = useAppSelector(loadboardSelectedSearchIdSelectors);
    const results = useAppSelector((state) => state.loadboard.resultsBySearchId);

    const list = useStableArray(results[searchId]);

    const map = useMemo(() => createMap(list, 'resultId'), [list]);

    return { map, list };
};

export const useLoadboardSearchResultsMapById = () => {};
