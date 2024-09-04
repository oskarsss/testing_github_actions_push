import { useFactoringInvoices } from '@/store/billing/hooks';
import OrdersArchiveListener from '@/@core/components/orders-archive-listener';
import React from 'react';

export default function ArchiveListener() {
    const {
        selectedFilters,
        filterId
    } = useFactoringInvoices();
    return (
        <OrdersArchiveListener
            filterId={filterId}
            startAt={selectedFilters.start_at}
        />
    );
}
