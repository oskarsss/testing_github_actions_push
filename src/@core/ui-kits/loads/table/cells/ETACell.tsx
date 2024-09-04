import { useAppTranslation } from '@/hooks/useAppTranslation';
import React, { memo } from 'react';
import { formatMinutes } from '@/utils/formatting';
import styles from './VUIKOrdersTableCells.module.scss';

type Props = {
    isLocalEta: boolean;
    lateness: number;
    earliness: number;
    eta: number;
};

export const OrdersTableETACell = memo(({
    earliness,
    isLocalEta,
    lateness,
    eta
}: Props) => {
    const { t } = useAppTranslation();

    return (
        <div className={styles.container}>
            {!isLocalEta && <p className={styles.eta}>{formatMinutes(eta, t)}</p>}
            {lateness > 0 && <span className={styles.lateness}>{formatMinutes(lateness, t)}</span>}
            {earliness > 0 && (
                <span className={styles.earliness}>{formatMinutes(earliness, t)}</span>
            )}
            {lateness === 0 && earliness === 0 && (
                <div className={styles.empty}>{formatMinutes(earliness, t)}</div>
            )}
        </div>
    );
});
