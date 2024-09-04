import { useMemo } from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import CheckCircleRounded from '@mui/icons-material/CheckCircleRounded';
import CloseCircle from 'mdi-material-ui/CloseCircle';
import Icon from '../filter-button/Icon';
import { $Filter } from '../utils';

const fuelTransactionVerifiedFilters: ('verified' | 'not_verified')[] = [
    'verified',
    'not_verified'
];

export const FUEL_TRANSACTION_VERIFIED_FILTER_CONFIG = $Filter.configure((counts) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            fuelTransactionVerifiedFilters.map((value) => ({
                value,
                label: $Filter.createLabel(
                    <Icon
                        icon={value === 'verified' ? <CheckCircleRounded /> : <CloseCircle />}
                        color={value === 'verified' ? 'blue_dark' : 'error'}
                    />,
                    t(`state_info:fuel_transaction.verified.${value}`)
                ),
                searchValue: t(`state_info:fuel_transaction.verified.${value}`),
                count      : counts?.[value]
            })),
        [counts, t]
    );

    return {
        filterItems,
        label: 'core:filters.labels.fuel_transaction' as const
    };
});
