import { updateFilters } from '@/store/filters/actions';
import { useAppDispatch } from '@/store/hooks';
import { useCallback } from 'react';

type Props = {
    filter_id: string;
};

function useAdvancedUpdateFilters({ filter_id }: Props) {
    const dispatch = useAppDispatch();

    const updateAllFilters = useCallback(
        (filters: object) => {
            dispatch(updateFilters(filter_id, filters));
        },
        [dispatch, filter_id]
    );

    return updateAllFilters;
}

export function useUpdateFilters({ filter_id }: Props) {
    const dispatch = useAppDispatch();

    return useCallback(
        (filters: object) => {
            dispatch(updateFilters(filter_id, filters));
        },
        [dispatch, filter_id]
    );
}

export default useAdvancedUpdateFilters;
