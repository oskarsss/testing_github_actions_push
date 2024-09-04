import { createSelector } from '@reduxjs/toolkit';
import createMap from '@/utils/create-map';
import { DriversDataSelectors } from './slice';

const selectDriverRowById = (driverId: string) =>
    createSelector(
        DriversDataSelectors.getRows,
        DriversDataSelectors.getIndexes,
        (rows, indexes) => {
            const index = indexes.driverIdToIndexesMap[driverId];
            return rows[index];
        }
    );

const selectDriversMapById = createSelector(DriversDataSelectors.getRows, (rows) =>
    createMap(rows, 'driverId'));

export { selectDriverRowById, selectDriversMapById };
