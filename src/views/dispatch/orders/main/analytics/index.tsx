import TrendsStats from '@/views/dispatch/orders/main/analytics/trends-stats/TrendStats';
import BrokersStats from '@/views/dispatch/orders/main/analytics/brokers-stats';
import ActiveLoads from '@/views/dispatch/orders/main/analytics/active-loads-stats/ActiveLoads';
import LoadsPerformanceStats from '@/views/dispatch/orders/main/analytics/performance-stats/PerformanceStats';
import styles from './OrdersAnalytics.module.scss';

export default function LoadsAnalytics() {
    return (
        <div className={styles.container}>
            <LoadsPerformanceStats />

            <div className={styles.charts}>
                <div className={styles.wrapper}>
                    <ActiveLoads />
                </div>
                <div className={styles.wrapper}>
                    <BrokersStats />
                </div>
            </div>
            <div className={styles.wrapper}>
                <TrendsStats />
            </div>
        </div>
    );
}
