import { memo, useCallback, useMemo, useRef } from 'react';
import ChartEmptyState from '@/views/dispatch/orders/main/analytics/components/chart-empty-state/ChartEmptyState';
import ChartTreemap from '@/views/dispatch/orders/main/analytics/brokers-stats/ChartTreemap';
import { useLoadsStatsStream } from '@/store/streams/loads';
import { useOrdersPageFilters } from '@/@grpcServices/services/loads-service/service-hooks/loads-service-hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import ChartHeader from '../components/chart-header/ChartHeader';
import CheckboxControl from './CheckboxControl';
import styles from './OrdersBrokersStats.module.scss';

const trimLabel = (name: string, characterCount = 14, wordCount = 3) => {
    if (name.length <= characterCount) return name;

    const splitName = name.split(' ');
    if (splitName.length <= wordCount) return `${name.slice(0, characterCount)}...`;

    const newName = splitName.slice(0, wordCount).join(' ');
    return newName.length <= characterCount ? newName : `${newName.slice(0, characterCount)}...`;
};

const BrokersStats = () => {
    const stableArray = useRef([]).current;
    const { clients } = useLoadsStatsStream();
    const {
        selected_filters,
        updateFilters
    } = useOrdersPageFilters();
    const { t } = useAppTranslation();

    const total = useMemo(() => clients.reduce((acc, item) => acc + item.loadsCount, 0), [clients]);

    const {
        items,
        otherBrokers
    } = useMemo(() => {
        const formattedItems = clients.map((item) => ({
            short_label: trimLabel(item.name),
            value      : item.entityId,
            count      : item.loadsCount,
            label      : item.name
        }));

        if (formattedItems.length > 5) {
            const otherCount = formattedItems.slice(5).reduce((acc, item) => acc + item.count, 0);
            const visibleItems = formattedItems.slice(0, 5);
            visibleItems.push({
                label      : t('loads:analytics.clients.other'),
                count      : otherCount,
                value      : 'other',
                short_label: t('loads:analytics.clients.other')
            });

            return { items: visibleItems, otherBrokers: formattedItems.slice(5) };
        }

        return { items: formattedItems, otherBrokers: stableArray };
    }, [clients, stableArray, t]);

    const isSelectedOther = useMemo(() => {
        if (otherBrokers.length === 0 || selected_filters.broker.length === 0) return false;
        return otherBrokers.every((item) => selected_filters.broker.includes(item.value));
    }, [selected_filters.broker, otherBrokers]);

    const handleSelect = useCallback(
        (value: string) => {
            const updateBrokerFilter = (broker: string[]) => updateFilters({ broker });

            if (value === 'other') {
                if (isSelectedOther) {
                    updateBrokerFilter([]);
                } else {
                    updateBrokerFilter(otherBrokers.map((item) => item.value));
                }
            } else {
                const newSelected = selected_filters.broker.includes(value)
                    ? selected_filters.broker.filter((item) => item !== value)
                    : [...selected_filters.broker, value];
                updateBrokerFilter(newSelected);
            }
        },
        [selected_filters.broker, updateFilters, isSelectedOther, otherBrokers]
    );

    if (!items.length) {
        return (
            <>
                <ChartHeader title={t('loads:analytics.clients.title')} />
                <ChartEmptyState type="brokers" />
            </>
        );
    }

    return (
        <>
            <ChartHeader title={t('loads:analytics.clients.title')} />
            <div className={styles.container}>
                <ChartTreemap
                    items={items}
                    total={total}
                    is_selected_other={isSelectedOther}
                    selected_filters={selected_filters}
                    setSelected={handleSelect}
                />
                <div className={styles.chartDivider} />
                <div className={styles.checkboxes}>
                    {items.map((item, index) => (
                        <CheckboxControl
                            key={item.value}
                            index={index}
                            item={item}
                            is_selected_other={isSelectedOther}
                            selected_filters={selected_filters.broker}
                            onClick={handleSelect}
                        />
                    ))}
                </div>
            </div>
        </>
    );
};

export default memo(BrokersStats);
