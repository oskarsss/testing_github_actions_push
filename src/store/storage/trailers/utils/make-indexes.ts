import { TrailerModel_Trailer } from '@proto/models/model_trailer';

export const makeIndexes = (rows: TrailerModel_Trailer[]) => {
    const trailerIdToIndexesMap: Record<string, number> = {};
    rows.forEach((row, index) => {
        trailerIdToIndexesMap[row.trailerId] = index;
    });
    return {
        trailerIdToIndexesMap
    };
};
