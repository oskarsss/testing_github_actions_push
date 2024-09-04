import { cards } from '@/views/dispatch/orders/main/analytics/performance-stats/config';
import CardItem from '@/views/dispatch/orders/main/analytics/performance-stats/CardItem';
import { useLoadsStatsStream } from '@/store/streams/loads';
import { useCallback } from 'react';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import styles from './OrdersPerfomanceStats.module.scss';

export default function LoadsPerformanceStats() {
    const stats = useLoadsStatsStream();

    const {
        selected_filters,
        updateFilters
    } = useOrdersPageFilters();

    const setSelected = useCallback(
        (field: string, value: boolean) => {
            updateFilters({ [field]: !value });
        },
        [updateFilters]
    );

    return (
        <div className={styles.container}>
            {cards.map((item) => (
                <CardItem
                    key={item.id}
                    isSelected={selected_filters[item.field]}
                    setSelected={() => setSelected(item.field, selected_filters[item.field])}
                    item={item}
                    count={stats[item.field] || 0}
                />
            ))}
        </div>
    );
}
