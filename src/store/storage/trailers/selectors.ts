import { createSelector } from '@reduxjs/toolkit';
import createMap from '@/utils/create-map';
import { TrailerDataSelectors } from './slice';

const selectTrailerRowById = (trailerId: string) =>
    createSelector(
        TrailerDataSelectors.getRows,
        TrailerDataSelectors.getIndexes,
        (rows, indexes) => {
            const index = indexes.trailerIdToIndexesMap[trailerId];
            return rows[index];
        }
    );

const selectTrailersMapById = createSelector(TrailerDataSelectors.getRows, (rows) =>
    createMap(rows, 'trailerId'));

export { selectTrailerRowById, selectTrailersMapById };
