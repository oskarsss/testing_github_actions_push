import ChartPie from '@/views/dispatch/orders/main/analytics/active-loads-stats/ChartPie';
import { useMemo, useRef } from 'react';
import ChartEmptyState from '@/views/dispatch/orders/main/analytics/components/chart-empty-state/ChartEmptyState';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { useLoadsStatsStream } from '@/store/streams/loads';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { LoadStatus } from '@/models/loads/load';
import ChartHeader from '../components/chart-header/ChartHeader';
import Controls from './Controls';
import styles from './ActiveOrdersStats.module.scss';

export default function ActiveLoads() {
    const stableArray = useRef([]).current;
    const { t } = useAppTranslation();
    const {
        active_loads,
        totalLoadsCount
    } = useLoadsStatsStream();

    const {
        selected_filters,
        filter_id
    } = useOrdersPageFilters();

    const items = useMemo(() => {
        if (!active_loads.length) return stableArray;
        return active_loads.map((item) => {
            if (item.value === 'drafts') {
                return {
                    ...item,
                    value: item.value,
                    label: t('loads:stats.drafts')
                };
            }

            return {
                ...item,
                value: item.value,
                label: t(`state_info:loads.status.${item.label as LoadStatus}`)
            };
        });
    }, [active_loads, stableArray, t]);

    if (!items.length || totalLoadsCount === 0) {
        return (
            <>
                <ChartHeader title={t('loads:analytics.active_loads.title')} />
                <ChartEmptyState type="active_loads" />
            </>
        );
    }

    return (
        <>
            <ChartHeader title={t('loads:analytics.active_loads.title')} />
            <div className={styles.container}>
                <ChartPie
                    selected_filters={selected_filters}
                    filter_id={filter_id}
                    items={items}
                    total={totalLoadsCount}
                />
            </div>

            <div className={styles.checkboxes}>
                {items.map((item) => (
                    <Controls
                        item={item}
                        filter_id={filter_id}
                        selected_filters_status={selected_filters.load_status}
                    />
                ))}
            </div>
        </>
    );
}
