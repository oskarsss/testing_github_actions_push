import React, { memo, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './VUIKOrdersTable.module.scss';

type Props = PropsWithChildren<{ className?: string }>;

export const OrdersTableHeaderRow = memo(({
    children,
    className
}: Props) => (
    <div className={clsx(styles.ordersHeaderRow, className)}>{children}</div>
));
