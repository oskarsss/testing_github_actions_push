import { useMemo } from 'react';
import { PayoutStatuses } from '@/models/payouts/payout-status';
import { PAYOUT_STATUS_COLORS } from '@/@core/theme/entities/payout/status';
import ChipDotIcon from '@/@core/fields/chip-select/components/ChipDotIcon';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { $Filter } from '../utils';
import Icon from '../filter-button/Icon';

export const PAYOUTS_STATUS_FILER_CONFIG = $Filter.configure((counts) => {
    const payoutStatuses = Object.values(PayoutStatuses);
    const { t } = useAppTranslation();

    const filterItems = useMemo(
        () =>
            payoutStatuses.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        color={PAYOUT_STATUS_COLORS[status]}
                        icon={(
                            <ChipDotIcon
                                sx={{
                                    color: ({ palette }) =>
                                        palette.utility.foreground[PAYOUT_STATUS_COLORS[status]]
                                            ?.primary,
                                    fontSize: '14px'
                                }}
                            />
                        )}
                    />,
                    t(`state_info:payouts.status.${status}`)
                ),
                searchValue: t(`state_info:payouts.status.${status}`),
                value      : status,
                count      : counts ? counts[status] : 0
            })),
        [counts, payoutStatuses]
    );

    return { filterItems, label: 'common:status' as const };
});
