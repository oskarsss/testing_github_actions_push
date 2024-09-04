import driver from '@/@core/fields/select/manifests-select/components/driver';
import { TruckModel_Truck } from '@proto/models/model_truck';

const makeIndexes = (trucks: TruckModel_Truck[]) => {
    const indexes = {
        truckIdToIndexesMap: trucks.reduce<Record<string, number>>((acc, truck, idx) => {
            acc[truck.truckId] = idx;
            return acc;
        }, {}),
        trailerIdToIndexesMap: trucks.reduce<Record<string, number>>((acc, truck, idx) => {
            acc[truck.trailerId] = idx;
            return acc;
        }, {}),
        driverIdToIndexesMap: trucks.reduce<Record<string, number>>((acc, truck, idx) => {
            truck.drivers.forEach((driver) => {
                acc[driver.driverId] = idx;
            });
            return acc;
        }, {})
    };

    return indexes;
};

export { makeIndexes };
