import OrdersArchiveListener from '@/@core/components/orders-archive-listener';
import { useTrackingFilters } from '@/@grpcServices/services/loads-service/service-hooks/tracking-service-hooks';
import React from 'react';

export default function ArchiveListener() {
    const {
        filter_id,
        selected_filters
    } = useTrackingFilters();
    return (
        <OrdersArchiveListener
            filterId={filter_id}
            startAt={selected_filters.start_at}
        />
    );
}
