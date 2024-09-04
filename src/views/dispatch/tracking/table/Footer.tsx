import { memo } from 'react';
import { useOrdersTotals } from '@/store/storage/orders/hooks/useOrdersTotals';
import { OrdersTableFooter, OrdersTableHeaderCell } from '@/@core/ui-kits/loads/table';
import { TRACKING_LOADS_COLUMNS } from './columns';
import styles from './TrackingTable.module.scss';

type Props = {
    showTotals: boolean;
    rows: number[];
};

function Footer({
    showTotals,
    rows
}: Props) {
    const totals = useOrdersTotals(rows);
    return (
        <OrdersTableFooter
            showTotals={showTotals}
            className={styles.row}
        >
            {TRACKING_LOADS_COLUMNS.map((column) => (
                <OrdersTableHeaderCell
                    key={`footer_${column.field_name}`}
                    style={{
                        ...column.headerStyle,
                        paddingTop   : 0,
                        paddingBottom: 0,
                        display      : 'flex',
                        alignItems   : 'center'
                    }}
                >
                    <span>{column?.renderTotalCell?.(totals) || ''} </span>
                </OrdersTableHeaderCell>
            ))}
        </OrdersTableFooter>
    );
}

export default memo(Footer);
