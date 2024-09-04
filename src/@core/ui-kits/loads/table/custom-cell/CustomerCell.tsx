import { useCustomersMap } from '@/store/hash_maps/hooks';
import { LoadData_Load } from '@proto/loads';
import { memo } from 'react';
import { OrdersTableTextCell } from '../cells/TextCell';

type Props = {
    row: LoadData_Load;
};

export const OrdersTableCustomerCell = memo(({ row }: Props) => {
    const customer = useCustomersMap(row.customerId);

    if (!customer) return null;

    return (
        <OrdersTableTextCell
            title={row.referenceId}
            description={customer.name.toLowerCase().substring(0, 12) || 'N/A'}
        />
    );
});
