import React, { memo, PropsWithChildren } from 'react';
import styles from './VUIKOrdersTable.module.scss';

type Props = PropsWithChildren;

export const OrdersTableCell = memo(({ children }: Props) => (
    <div className={styles.ordersCells}>{children}</div>
));
