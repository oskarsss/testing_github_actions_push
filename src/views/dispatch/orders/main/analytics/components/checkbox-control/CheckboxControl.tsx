import React from 'react';
import DoneIcon from '@mui/icons-material/Done';
import clsx from 'clsx';
import styles from './OrdersAnalyticsCheckboxControl.module.scss';
import { Item } from '../../utils';

type Props = {
    onClick: () => void;
    item: Item;
    selected: boolean;
    className?: string;
};

export default function CheckboxControl({
    item,
    onClick,
    selected,
    className
}: Props) {
    return (
        <div
            className={clsx(styles.button, { [styles.selected]: selected })}
            onClick={onClick}
        >
            <div className={styles.info}>
                <div className={clsx(styles.checkbox, className)}>
                    <DoneIcon />
                </div>
                <p className={styles.label}>{item.label}</p>
            </div>

            <p className={styles.count}>{item.count || '-'}</p>
        </div>
    );
}
