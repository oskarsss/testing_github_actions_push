import React, { memo, useMemo } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import RemoveIcon from '@mui/icons-material/Remove';
import { useLoadsTrendsStream } from '@/store/streams/loads';
import { GetTrendsReply, GetTrendsReply_Position } from '@proto/stats';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import clsx from 'clsx';
import ChartHeader from '../components/chart-header/ChartHeader';
import ChartTrend from './ChartTrend';
import styles from './OrdersTrendsStats.module.scss';

const dummyData: Required<GetTrendsReply> = {
    avgFuelPricePerQuantity: {
        avgPrice: '$0.00',
        change  : '0.00%',
        position: GetTrendsReply_Position.FLAT,
        series  : [0, 0]
    },
    avgFuelPricePerTotalMile: {
        avgPrice: '$0.00',
        change  : '0.00%',
        position: GetTrendsReply_Position.FLAT,
        series  : [0, 0]
    },
    avgRpm: {
        avgPrice: '$0.00',
        change  : '0.00%',
        position: GetTrendsReply_Position.FLAT,
        series  : [0, 0]
    }
};

type TrendNames = 'avgFuelPricePerQuantity' | 'avgFuelPricePerTotalMile' | 'avgRpm';

function TrendsStats() {
    const { t } = useAppTranslation();
    const data = useLoadsTrendsStream();

    const trends = useMemo(() => {
        if (!data || !Object.keys(data).length) return dummyData;
        return data as Required<GetTrendsReply>;
    }, [data]);

    return (
        <>
            <ChartHeader title={t('loads:analytics.trends.title')} />
            <div className={styles.container}>
                {Object.entries(trends).map(([name, trend], index) => (
                    <React.Fragment key={name}>
                        <div className={styles.containerItem}>
                            <div>
                                <p
                                    className={styles.title}
                                    style={{ whiteSpace: 'nowrap' }}
                                >
                                    {t(`loads:analytics.trends.items.${name as TrendNames}`)}
                                </p>
                                <p className={styles.price}>{trend.avgPrice}</p>
                                <div
                                    className={clsx(styles.trendIndicator, {
                                        [styles.trendUp]:
                                            trend.position === GetTrendsReply_Position.UP,
                                        [styles.empty]:
                                            trend.position === GetTrendsReply_Position.FLAT
                                    })}
                                >
                                    {trend.position === GetTrendsReply_Position.FLAT ? (
                                        <RemoveIcon />
                                    ) : (
                                        <ArrowDownwardIcon />
                                    )}
                                    <span>{trend.change}</span>
                                </div>
                            </div>
                            <div style={{ width: '126px', height: '66px' }}>
                                <ChartTrend
                                    data={trend.series}
                                    position={trend.position}
                                />
                            </div>
                        </div>
                        {index !== Object.keys(trends).length - 1 && (
                            <div className={styles.divider} />
                        )}
                    </React.Fragment>
                ))}
            </div>
        </>
    );
}

export default memo(TrendsStats);
