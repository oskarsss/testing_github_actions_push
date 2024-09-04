import { useAmazonInvoices } from '@/store/billing/hooks';
import OrdersArchiveListener from '@/@core/components/orders-archive-listener';
import React from 'react';

export default function ArchiveListener() {
    const {
        selectedFilters,
        filterId
    } = useAmazonInvoices();
    return (
        <OrdersArchiveListener
            filterId={filterId}
            startAt={selectedFilters.start_at}
        />
    );
}
