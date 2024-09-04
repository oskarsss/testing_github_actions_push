import { getActiveStopsCount } from '@/@grpcServices/services/manifests-service/utils';
import { LinearProgress } from '@mui/material';
import {
    ManifestModel_Manifest,
    ManifestModel_Status as Status
} from '@proto/models/model_manifest';
import React, { memo, useMemo } from 'react';
import clsx from 'clsx';
import styles from './ManifestTableStopsProgressCell.module.scss';

type Props = {
    row: ManifestModel_Manifest;
};

function Stops({ row }: Props) {
    const {
        stops,
        status
    } = row;

    const {
        completedStopsCount,
        totalStopsCount
    } = useMemo(() => {
        const totalStopsCount = stops.length;
        const completedStopsCount = totalStopsCount - getActiveStopsCount(stops).length;

        return {
            completedStopsCount,
            totalStopsCount
        };
    }, [stops]);

    return (
        <div className={styles.container}>
            <div className={styles.progressWrapper}>
                <LinearProgress
                    classes={{
                        root: clsx(styles.progress, {
                            [styles.progressDelivered]: status === Status.DELIVERED,
                            [styles.progressInTransit]: status === Status.IN_PROGRESS,
                            [styles.progressPlanning] : status === Status.PLANNING,
                            [styles.progressCanceled] : status === Status.CANCELED,
                            [styles.progressAssigned] : status === Status.ASSIGNED,
                            [styles.progressTonnu]    : status === Status.TONU,
                            [styles.progressDeleted]  : status === Status.DELETED
                        }),
                        bar: clsx(styles.progressBar, {
                            [styles.progressBarDelivered]: status === Status.DELIVERED,
                            [styles.progressBarInTransit]: status === Status.IN_PROGRESS,
                            [styles.progressBarPlanning] : status === Status.PLANNING,
                            [styles.progressBarCanceled] : status === Status.CANCELED,
                            [styles.progressBarAssigned] : status === Status.ASSIGNED,
                            [styles.progressBarTonnu]    : status === Status.TONU,
                            [styles.progressBarDeleted]  : status === Status.DELETED
                        })
                    }}
                    variant="determinate"
                    value={(completedStopsCount / totalStopsCount) * 100}
                />
            </div>
            <p className={styles.info}>
                {completedStopsCount}/{totalStopsCount}
            </p>
        </div>
    );
}

export default memo(Stops);
