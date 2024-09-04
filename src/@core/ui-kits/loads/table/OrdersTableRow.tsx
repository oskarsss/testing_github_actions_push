/* eslint-disable prefer-const */
/* eslint-disable no-restricted-syntax */
import React, { memo, PropsWithChildren } from 'react';
import clsx from 'clsx';
import styles from './VUIKOrdersTable.module.scss';

export type OrdersRowColor =
    | 'yellow'
    | 'success'
    | 'warning'
    | 'blueDark'
    | 'pink'
    | 'gray'
    | 'error'
    | null;

type Props = PropsWithChildren<{
    color: OrdersRowColor;
    focused: boolean;
    selected: boolean;
    onClick: () => void;
    className?: string;
}>;

export const OrdersTableRow = memo(
    ({
        children,
        color,
        focused,
        selected,
        onClick,
        className
    }: Props) => (
        <div
            className={clsx(
                styles.ordersRow,
                {
                    [styles.ordersRowSelected]: selected,
                    [styles.ordersRowFocused] : focused,
                    [styles.ordersRowWarning] : color === 'warning',
                    [styles.ordersRowSuccess] : color === 'success',
                    [styles.ordersRowYellow]  : color === 'yellow',
                    [styles.ordersRowDarkBlue]: color === 'blueDark',
                    [styles.ordersRowError]   : color === 'error',
                    [styles.ordersRowPink]    : color === 'pink',
                    [styles.ordersRowGray]    : color === 'gray',
                    [styles.ordersRowGray]    : color === null
                },
                className
            )}
            onClick={onClick}
        >
            {children}
        </div>
    )
);
