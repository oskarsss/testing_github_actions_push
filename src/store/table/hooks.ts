import { createSelector } from '@reduxjs/toolkit';
import { useAppSelector } from '../hooks';
import { RootState } from '../types';

const selectSelectedIds = (state: RootState) => state.table.selectedIds;

export const useSelectedTableIds = (tableName: string) => {
    const selectSelectedTableIds = createSelector(
        [selectSelectedIds],
        (selectedIds) => selectedIds[tableName] || []
    );
    return useAppSelector(selectSelectedTableIds);
};
