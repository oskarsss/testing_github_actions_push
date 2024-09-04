import { cards } from '@/views/dispatch/orders/main/analytics/performance-stats/config';
import { memo, useEffect, useMemo, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import clsx from 'clsx';
import CheckIcon from '@mui/icons-material/Check';
import MuiSwitch from '@mui/material/Switch';
import MuiCheckCircleIcon from '@mui/icons-material/CheckCircle';
import VectorIcons from '@/@core/icons/vector_icons';
import styles from './OrdersPerfomanceStats.module.scss';

type Props = {
    item: (typeof cards)[0];
    count: number;
    isSelected: boolean;
    setSelected: () => void;
};

function CardItem({
    item,
    count,
    isSelected,
    setSelected
}: Props) {
    const [checked, setChecked] = useState(false);
    const { t } = useAppTranslation();

    const [showFirstIcon, setShowFirstIcon] = useState(false);
    const error = useMemo(
        () => (item.field === 'gps_inactive' ? checked && !!count : !!count),
        [checked, count, item.field]
    );

    useEffect(() => {
        if (error && !isSelected) {
            const intervalId = setInterval(() => {
                setShowFirstIcon((prev) => !prev);
            }, 6000);
            return () => clearInterval(intervalId);
        }
    }, [error, isSelected]);

    return (
        <div
            onClick={setSelected}
            className={clsx(styles.card, {
                [styles.selected]: isSelected,
                [styles.error]   : error
            })}
        >
            <div
                className={clsx(styles.containerIcon, {
                    [styles.error]        : error,
                    [styles.selected]     : isSelected,
                    [styles.showFirstIcon]: showFirstIcon
                })}
            >
                {isSelected ? (
                    <MuiCheckCircleIcon />
                ) : (
                    <>
                        {item.icon()}
                        {error && !showFirstIcon && <VectorIcons.Warning />}
                    </>
                )}
            </div>

            <div className={styles.info}>
                <p className={styles.infoTitle}>{t(item.title)}</p>
                {count ? <p className={styles.infoCount}>{count}</p> : <CheckIcon />}
            </div>

            {item.field === 'gps_inactive' && (
                <Tooltip title={t('loads:analytics.performance.tooltips.switch_gps')}>
                    <MuiSwitch
                        classes={{
                            root      : styles.switch,
                            switchBase: styles.switchBase,
                            thumb     : clsx(styles.thumb, { [styles.error]: error }),
                            track     : clsx(styles.track, { [styles.error]: error }),
                            checked   : styles.checked,
                            input     : styles.input
                        }}
                        checked={checked}
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setChecked((prev) => !prev);
                        }}
                    />
                </Tooltip>
            )}
        </div>
    );
}

export default memo(CardItem);
