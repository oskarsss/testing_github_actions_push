import { DriverModel_Driver } from '@proto/models/model_driver';

export const makeIndexes = (rows: DriverModel_Driver[]) => ({
    driverIdToIndexesMap: rows.reduce<Record<string, number>>((acc, row, index) => {
        acc[row.driverId] = index;
        return acc;
    }, {})
});
