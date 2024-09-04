import React, { memo } from 'react';
import styles from './OrdersChartsHeader.module.scss';

type Props = {
    title: string;
    children?: React.ReactNode;
};
function ChartHeader({
    title,
    children
}: Props) {
    return (
        <>
            <div className={styles.container}>
                <p className={styles.title}>{title}</p>
                {children}
            </div>
            <div className={styles.divider} />
        </>
    );
}

export default memo(ChartHeader);
