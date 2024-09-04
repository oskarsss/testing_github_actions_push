import { useActiveBrokers } from '@/store/dispatch/brokers/hooks';
import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { $Filter } from '../utils';

export const BROKER_FILTER_CONFIG = $Filter.configure<string>((counts) => {
    const { brokers } = useActiveBrokers();
    const { t } = useAppTranslation('common');
    const filterItems = useMemo(
        () =>
            $Filter
                .sortItemsByCount(brokers, 'brokerId', 'nameAndMc', counts)
                .map(({
                    brokerId,
                    nameAndMc,
                    name,
                    mc
                }) => ({
                    label      : `${name || t('not_provided')} (${mc})`,
                    searchValue: nameAndMc,
                    value      : brokerId,
                    count      : counts?.[brokerId]
                })),
        [counts, brokers, t]
    );

    return { filterItems, label: 'entity:broker' as const };
});
