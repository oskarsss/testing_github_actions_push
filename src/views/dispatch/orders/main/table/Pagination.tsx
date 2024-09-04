import React, { memo } from 'react';

import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import { OrdersTablePagination } from '@/@core/ui-kits/loads/table';
import SwitchTotalsButton from '@/@core/components/switch-totals-button/switch-totals-button';

type Props = {
    scrollTop: () => void;
    showTotals: boolean;
    setShowTotals: (showTotals: boolean) => void;
    totalOrdersCount: number;
};

const LoadsTablePagination = ({
    scrollTop,
    setShowTotals,
    showTotals,
    totalOrdersCount
}: Props) => {
    const {
        filter_id,
        selected_filters
    } = useOrdersPageFilters();

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
            count={totalOrdersCount}
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
};

export default memo(LoadsTablePagination);
