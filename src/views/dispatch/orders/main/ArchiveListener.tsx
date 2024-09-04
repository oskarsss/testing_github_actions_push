import OrdersArchiveListener from '@/@core/components/orders-archive-listener';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import React from 'react';

export default function ArchiveListener() {
    const {
        filter_id,
        selected_filters
    } = useOrdersPageFilters();
    return (
        <OrdersArchiveListener
            filterId={filter_id}
            startAt={selected_filters.start_at}
        />
    );
}
