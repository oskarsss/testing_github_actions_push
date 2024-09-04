import React, { memo, PropsWithChildren } from 'react';
import styles from './VUIKOrdersTable.module.scss';

type Props = PropsWithChildren<{
    onClick?: () => void;
    style: React.CSSProperties;
}>;

export const OrdersTableHeaderCell = memo(({
    onClick,
    style,
    children
}: Props) => (
    <div
        className={styles.ordersHeaderCell}
        style={style}
        onClick={onClick}
    >
        {children}
    </div>
));
