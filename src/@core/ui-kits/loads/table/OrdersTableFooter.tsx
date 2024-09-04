import React, { memo, PropsWithChildren } from 'react';
import { Collapse } from '@mui/material';
import clsx from 'clsx';
import styles from './VUIKOrdersTable.module.scss';

type Props = PropsWithChildren<{ showTotals: boolean; className?: string }>;

export const OrdersTableFooter = memo(({
    children,
    showTotals,
    className
}: Props) => (
    <Collapse
        in={showTotals}
        sx={{
            flexShrink: 0,
            position  : 'sticky',
            bottom    : 0,
            zIndex    : 1000
        }}
    >
        <div className={clsx(styles.ordersTableFooter, className)}>{children}</div>
    </Collapse>
));
