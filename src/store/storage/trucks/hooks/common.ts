import { useAppSelector } from '@/store/hooks';
import { TruckModel_Truck } from '@proto/models/model_truck';
import { selectTruckByDriverId, selectTruckByTrailerId, selectTruckRowById } from '../selectors';
import { TrucksDataSelectors } from '../slice';

export const useTruckById = (truckId: string): TruckModel_Truck | undefined =>
    useAppSelector(selectTruckRowById(truckId));

export const useTrucksMap = (): Record<string, TruckModel_Truck> =>
    useAppSelector(TrucksDataSelectors.getMap);

export const useTruckByTrailerId = (trailerId: string): TruckModel_Truck | undefined =>
    useAppSelector(selectTruckByTrailerId(trailerId));

export const useTruckByDriverId = (driverId: string): TruckModel_Truck | undefined =>
    useAppSelector(selectTruckByDriverId(driverId));
