import React from 'react';
import OrdersArchiveListener from '@/@core/components/orders-archive-listener';
import { useAllInvoices } from '@/store/billing/hooks';

export default function ArchiveListener() {
    const {
        selectedFilters,
        filterId
    } = useAllInvoices();
    return (
        <OrdersArchiveListener
            filterId={filterId}
            startAt={selectedFilters.start_at}
        />
    );
}
