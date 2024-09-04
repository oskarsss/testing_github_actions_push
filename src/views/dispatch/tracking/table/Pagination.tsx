import React from 'react';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import SwitchTotalsButton from '@/@core/components/switch-totals-button/switch-totals-button';
import { OrdersTablePagination } from '@/@core/ui-kits/loads/table';
import { useTrackingFilters } from '@/@grpcServices/services/loads-service/service-hooks/tracking-service-hooks';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { TrackingActions } from '@/store/dispatch/tracking/slice';

type Props = {
    scrollTop: () => void;
    totalsOrdersCount: number;
};

const Pagination = ({
    scrollTop,
    totalsOrdersCount
}: Props) => {
    const dispatch = useAppDispatch();
    const showTotals = useAppSelector((state) => state.tracking.settings.showTotals);

    const setShowTotals = () => dispatch(TrackingActions.ToggleShowTotals());

    const {
        filter_id,
        selected_filters
    } = useTrackingFilters();
    const updateFilters = useUpdateFilters({ filter_id });

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
            count={totalsOrdersCount}
            rowsPerPage={selected_filters.per_page}
            page={selected_filters.page}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
        >
            <SwitchTotalsButton
                showTotals={showTotals}
                setShowTotals={setShowTotals}
            />
        </OrdersTablePagination>
    );
};

export default Pagination;
