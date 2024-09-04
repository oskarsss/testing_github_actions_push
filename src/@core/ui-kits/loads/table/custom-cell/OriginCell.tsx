import { OrdersTableStopCell } from '@/@core/ui-kits/loads/table/custom-cell';
import useOrderStops from '@/store/storage/orders/hooks/useOrderStops';
import { LoadData_Load } from '@proto/loads';
import React from 'react';

type Props = { row: LoadData_Load };

export const OrdersTableOriginCell = ({ row }: Props) => {
    const stops = useOrderStops(row);

    const firstStop = stops[0];
    const city = firstStop?.location?.city || '';
    const state = firstStop?.location?.state || '';
    const time = firstStop?.appointmentStartAtLocal || '';
    return (
        <OrdersTableStopCell
            city={city}
            state={state}
            time={time}
        />
    );
};
