import OrdersArchiveListener from '@/@core/components/orders-archive-listener';
import React from 'react';
import { useMapLoads } from './hooks/loads';

export default function ArchiveListener() {
    const { selected_filters } = useMapLoads();
    return (
        <OrdersArchiveListener
            filterId="map_loads"
            startAt={selected_filters.start_at}
        />
    );
}
