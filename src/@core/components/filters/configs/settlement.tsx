import { SettlementStatus } from '@/models/settlements/settlement-status';
import { useMemo } from 'react';
import { SETTLEMENTS_STATUS_ICONS } from '@/@core/theme/entities/settlement/status';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { DRIVER_NET_TYPE_ICONS } from '@/@core/theme/entities/settlement/driver_net_type';
import { $Filter } from '../utils';
import Icon from '../filter-button/Icon';

const statusOrder: SettlementStatus[] = ['open', 'in_review', 'verified', 'sent', 'paid', 'closed'];

export const SETTLEMENT_STATUS_FILTER_CONFIG = $Filter.configure((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            statusOrder.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        icon={SETTLEMENTS_STATUS_ICONS[status]}
                        color="gray"
                    />,
                    t(`state_info:settlements.status.${status}`)
                ),
                searchValue: status,
                value      : status,
                count      : counts?.[status]
            })),
        [counts, t]
    );

    return {
        filterItems,
        label: 'common:status' as const
    };
});

const driverNetTypeOrder: ('positive' | 'negative')[] = ['positive', 'negative'];

export const SETTLEMENT_DRIVER_NET_TYPE_FILTER_CONFIG = $Filter.configure((counts, amounts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            driverNetTypeOrder.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        icon={DRIVER_NET_TYPE_ICONS[status]}
                        color="gray"
                    />,
                    t(`state_info:settlements.driver_net_type.${status}`),
                    amounts?.[status] ? `(${amounts?.[status]})` : ''
                ),
                searchValue: status,
                value      : status,
                count      : counts?.[status]
            })),
        [counts, amounts, t]
    );

    return {
        filterItems,
        label: 'core:filters.labels.driver_net_type' as const
    };
});
