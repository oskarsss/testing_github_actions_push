import { createSelector } from '@reduxjs/toolkit';
import { TrucksDataSelectors } from './slice';

export const selectTruckRowById = (truckId: string) =>
    createSelector(TrucksDataSelectors.getMap, (trucksByIdMap) => trucksByIdMap[truckId]);

export const selectTruckByTrailerId = (trailerId: string) =>
    createSelector(
        TrucksDataSelectors.getRows,
        TrucksDataSelectors.getIndexes,
        (trucks, indexes) => {
            const index = indexes.trailerIdToIndexesMap[trailerId];
            return trucks[index];
        }
    );

export const selectTruckByDriverId = (driverId: string) =>
    createSelector(
        TrucksDataSelectors.getRows,
        TrucksDataSelectors.getIndexes,
        (trucks, indexes) => {
            const index = indexes.driverIdToIndexesMap[driverId];
            return trucks[index];
        }
    );
