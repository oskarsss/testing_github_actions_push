import { RootState } from '@/pages/_app';
import { createSelector } from '@reduxjs/toolkit';
import { prepareManifestModelMapStops } from './utils/prepare';

const selectActiveMode = (state: RootState) => state.manifests.liveMode;

// Base selectors
export const selectActiveModeRows = (state: RootState) => state.manifests.liveMode.rows;
const selectSelectedManifestIndex = (state: RootState) => state.manifests.selectedManifestIndex;

export const selectDefaultIndexes = createSelector(selectActiveMode, (activeMode) =>
    activeMode.rows.map((_, idx) => idx));

export const selectFirstStopDateIndexes = createSelector(
    selectActiveMode,
    (activeMode) => activeMode.firstStopDateToIndexesMap
);

export const selectGrossAmountIndexes = createSelector(
    selectActiveMode,
    (activeMode) => activeMode.grossAmountToIndexesMap
);

export const selectDistanceIndexes = createSelector(
    selectActiveMode,
    (activeMode) => activeMode.distanceToIndexesMap
);

export const selectLoadedDistanceIndexes = createSelector(
    selectActiveMode,
    (activeMode) => activeMode.loadedDistanceToIndexesMap
);

export const selectStatusIndexes = createSelector(
    selectActiveMode,
    (activeMode) => activeMode.statusToIndexesMap
);

export const selectTruckIndexes = createSelector(
    selectActiveMode,
    (activeMode) => activeMode.truckIdToIndexesMap
);

export const selectTrailerIndexes = createSelector(
    selectActiveMode,
    (activeMode) => activeMode.trailerIdToIndexesMap
);

export const selectDriverIndexes = createSelector(
    selectActiveMode,
    (activeMode) => activeMode.driverIdToIndexesMap
);

export const selectIndexes = createSelector(
    selectActiveModeRows,
    selectDefaultIndexes,
    selectFirstStopDateIndexes,
    selectGrossAmountIndexes,
    selectDistanceIndexes,
    selectLoadedDistanceIndexes,
    selectStatusIndexes,
    selectTruckIndexes,
    selectTrailerIndexes,
    selectDriverIndexes,
    (
        manifests,
        defaultIndexes,
        firstStopDate,
        grossAmount,
        distance,
        loadedDistance,
        status,
        truck,
        trailer,
        driver
    ) => ({
        manifests,
        default: defaultIndexes,
        firstStopDate,
        grossAmount,
        distance,
        loadedDistance,
        status,
        truck,
        trailer,
        driver
    })
);

export const selectSelectedManifestMapStops = createSelector(
    [selectActiveMode, (state: RootState) => state.manifests.selectedManifestIndex],
    (activeMode, selectedManifestIndex) =>
        selectedManifestIndex !== null
            ? prepareManifestModelMapStops(activeMode.rows[selectedManifestIndex].stops)
            : []
);

export const selectIsSelectedManifest = (manifestIdx: number) => (state: RootState) =>
    state.manifests.selectedManifestIndex === manifestIdx;

// eslint-disable-next-line max-len
export const selectSelectedManifestIdx = (state: RootState) =>
    state.manifests.selectedManifestIndex;

export const selectSelectedManifestId = createSelector(
    [selectActiveMode, (state: RootState) => state.manifests.selectedManifestIndex],
    (activeMode, selectedManifestIndex) =>
        selectedManifestIndex !== null ? activeMode.rows[selectedManifestIndex].manifestId : ''
);

export const selectIsLoading = (state: RootState) => state.manifests.isLoading;

// Create selectManifestByIdx selector
export const selectManifestByIdx = (idx: number) =>
    createSelector([selectActiveModeRows], (activeModeRows) => activeModeRows[idx]);

export const selectManifestRows = createSelector(
    [selectActiveModeRows],
    (activeModeRows) => activeModeRows
);

export const selectManifestById = (manifestId: string) =>
    createSelector([selectActiveModeRows], (activeModeRows) =>
        activeModeRows.find((manifest) => manifest.manifestId === manifestId));

// Create selectSelectedManifest selector
export const selectSelectedManifest = createSelector(
    [selectSelectedManifestIndex, selectActiveModeRows],
    (selectedManifestIndex, activeModeRows) => {
        if (selectedManifestIndex === null) {
            return null;
        }
        return activeModeRows[selectedManifestIndex];
    }
);
