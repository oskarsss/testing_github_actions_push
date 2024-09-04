import { memo, useCallback } from 'react';
import { Item } from '@/views/dispatch/orders/main/analytics/utils';
import { LoadStatus } from '@/models/loads/load';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import clsx from 'clsx';
import styles from './ActiveOrdersStats.module.scss';
import CheckboxControl from '../components/checkbox-control/CheckboxControl';

type Props = {
    selected_filters_status: string[];
    item: Item;
    filter_id: string;
};

function Controls({
    item,
    selected_filters_status,
    filter_id
}: Props) {
    const updateFilter = useUpdateFilters({ filter_id });
    const onClick = useCallback(() => {
        if (item.value === 'drafts') return;

        if (selected_filters_status?.includes(item.value as LoadStatus)) {
            const new_selected = selected_filters_status.filter((status) => status !== item.value);
            updateFilter({ load_status: new_selected });
        } else {
            updateFilter({ load_status: [...selected_filters_status, item.value as LoadStatus] });
        }
    }, [item.value, selected_filters_status, updateFilter]);

    return (
        <CheckboxControl
            item={item}
            onClick={onClick}
            selected={selected_filters_status.includes(item.value as LoadStatus)}
            className={clsx(styles.checkbox, {
                [styles.selected]   : selected_filters_status.includes(item.value),
                [styles.drafts]     : item.value === 'drafts',
                [styles.in_progress]: item.value === 'in_progress',
                [styles.assigned]   : item.value === 'assigned',
                [styles.pending]    : item.value === 'pending'
            })}
        />
    );
}

export default memo(Controls);
