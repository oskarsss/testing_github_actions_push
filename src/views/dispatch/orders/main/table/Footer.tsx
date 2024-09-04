import React, { memo } from 'react';
import { useOrdersTotals } from '@/store/storage/orders/hooks/useOrdersTotals';
import { OrdersTableFooter, OrdersTableHeaderCell } from '@/@core/ui-kits/loads/table';
import loadsTableColumns from './columns/columns';
import styles from './OrdersTable.module.scss';

type Props = { showTotals: boolean; rows: number[] };

function Footer({
    showTotals,
    rows
}: Props) {
    const totals = useOrdersTotals(rows);

    return (
        <OrdersTableFooter
            className={styles.rowGridTemplate}
            showTotals={showTotals}
        >
            {loadsTableColumns.map((column) => (
                <OrdersTableHeaderCell
                    key={`footer_${column.field_name}`}
                    style={{
                        ...column.headerStyle,
                        paddingTop   : 0,
                        paddingBottom: 0
                    }}
                >
                    <span>{column?.renderTotalCell?.(totals) || ''} </span>
                </OrdersTableHeaderCell>
            ))}
        </OrdersTableFooter>
    );
}

export default memo(Footer);
