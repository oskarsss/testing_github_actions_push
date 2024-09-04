import { useBrokersMap } from '@/store/hash_maps/hooks';
import { LoadData_Load } from '@proto/loads';
import { memo } from 'react';
import { OrdersTableTextCell } from '../cells/TextCell';

type Props = {
    row: LoadData_Load;
};

export const OrdersTableBrokerCell = memo(({ row }: Props) => {
    const broker = useBrokersMap(row.brokerId);
    if (!broker) return null;
    return (
        <OrdersTableTextCell
            title={row.referenceId}
            description={
                broker?.name.toLowerCase().substring(0, 12) ||
                `N/A${broker.mc ? ` (${broker.mc})` : ''}`
            }
        />
    );
});
