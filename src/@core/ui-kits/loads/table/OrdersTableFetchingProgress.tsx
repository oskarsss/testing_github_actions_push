import { LinearProgress } from '@mui/material';
import React from 'react';
import styles from './VUIKOrdersTable.module.scss';

export const OrdersTableFetchingProgress = () => (
    <LinearProgress
        className={styles.linearProgress}
        color="primary"
        variant="indeterminate"
    />
);
