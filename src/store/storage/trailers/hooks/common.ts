import { useAppSelector } from '@/store/hooks';
import { TrailerModel_Trailer } from '@proto/models/model_trailer';
import { selectTrailerRowById, selectTrailersMapById } from '../selectors';

export const useTrailersMap = () => useAppSelector(selectTrailersMapById);

export const useTrailerById = (trailerId: string): TrailerModel_Trailer | undefined =>
    useAppSelector(selectTrailerRowById(trailerId));
