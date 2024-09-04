import React, { useCallback } from 'react';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import { useManifestsFilters } from '@/store/dispatch/manifests/hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { ManifestsActions } from '@/store/dispatch/manifests/slice';
import SwitchTotalsButton from '@/@core/components/switch-totals-button/switch-totals-button';
import { OrdersTablePagination } from '@/@core/ui-kits/loads/table';

type Props = {
    scrollTop: () => void;
    rowsCount: number;
};

function ManifestTablePagination({
    scrollTop,
    rowsCount
}: Props) {
    const showTotals = useAppSelector((state) => state.manifests.settings.showTotals);
    const dispatch = useAppDispatch();
    const setShowTotals = useCallback(() => {
        dispatch(ManifestsActions.ToggleShowTotals());
    }, [dispatch]);
    const {
        selected_filters,
        filter_id
    } = useManifestsFilters();

    const updateFilters = useUpdateFilters({ filter_id });

    const {
        per_page,
        page
    } = selected_filters;

    const onPageChange = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
        updateFilters({
            page: newPage
        });
        scrollTop();
    };

    const onRowsPerPageChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        updateFilters({
            per_page: Number(event.target.value),
            page    : 0
        });
        scrollTop();
    };

    return (
        <OrdersTablePagination
            rowsPerPageOptions={[5, 10, 25, 50, 75, 100]}
            count={rowsCount}
            rowsPerPage={per_page}
            page={page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        >
            <SwitchTotalsButton
                showTotals={showTotals}
                setShowTotals={setShowTotals}
            />
        </OrdersTablePagination>
    );
}

export default React.memo(ManifestTablePagination);
