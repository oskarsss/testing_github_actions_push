import { useMemo } from 'react';
import DetailsIcons from '@/@core/icons/all-icons/details';
import LinkIcon from '@mui/icons-material/Link';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { $Filter } from '../utils';
import Icon from '../filter-button/Icon';

const statusOrder: ('assigned' | 'not_assigned')[] = ['assigned', 'not_assigned'];

const ICONS = {
    assigned    : <LinkIcon />,
    not_assigned: <DetailsIcons.Unassigned />
};

export const TOLL_SETTLEMENT_STATUS_FILTER_CONFIG = $Filter.configure((counts?, amounts?) => {
    const { t } = useAppTranslation();
    const filterItems = useMemo(
        () =>
            statusOrder.map((status) => ({
                label: $Filter.createLabel(
                    <Icon
                        icon={ICONS[status]}
                        color={status === 'assigned' ? 'blue_dark' : 'error'}
                    />,
                    t(`common:${status}`),
                    amounts?.[status] ? `(${amounts?.[status]})` : ''
                ),
                searchValue: status,
                value      : status,
                count      : counts?.[status]
            })),
        [counts, amounts, t]
    );

    return { filterItems, label: 'core:filters.labels.settlement' as const };
});
