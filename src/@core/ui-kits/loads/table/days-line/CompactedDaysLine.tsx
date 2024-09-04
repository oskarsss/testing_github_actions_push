import React, { memo } from 'react';
import styles from './VUIKDaysLine.module.scss';

type Props = {
    date: string;
};

export const CompactedDaysLine = memo(({ date }: Props) => (
    <div className={styles.compactedWrapper}>
        <div className={styles.compactedDateBadge}>{date}</div>
    </div>
));
