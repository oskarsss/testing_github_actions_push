import { useAppSelector } from '@/store/hooks';
import { selectDriversMapById, selectDriverRowById } from '../selectors';

export const useDriversMap = () => useAppSelector(selectDriversMapById);

export const useDriverById = (driverId: string) => useAppSelector(selectDriverRowById(driverId));
