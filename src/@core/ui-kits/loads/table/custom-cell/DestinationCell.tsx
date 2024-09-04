import { OrdersTableStopCell } from '@/@core/ui-kits/loads/table/custom-cell';
import useOrderStops from '@/store/storage/orders/hooks/useOrderStops';
import { LoadData_Load } from '@proto/loads';

type Props = { row: LoadData_Load };

export function OrdersTableDestinationCell({ row }: Props) {
    const stops = useOrderStops(row);

    const firstStop = stops[stops.length - 1];
    return (
        <OrdersTableStopCell
            city={firstStop?.location?.city || ''}
            state={firstStop?.location?.state || ''}
            time={firstStop?.appointmentStartAtLocal || ''}
        />
    );
}
