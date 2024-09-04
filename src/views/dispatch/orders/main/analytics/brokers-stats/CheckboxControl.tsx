import { Item } from '@/views/dispatch/orders/main/analytics/utils';
import { memo, useMemo } from 'react';
import clsx from 'clsx';
import styles from './OrdersBrokersStats.module.scss';
import CheckboxControl from '../components/checkbox-control/CheckboxControl';

type Props = {
    item: Item;
    is_selected_other: boolean;
    selected_filters: string[];
    index: number;
    onClick: (value: string) => void;
};

function BrokersCheckboxControl({
    item,
    is_selected_other,
    selected_filters,
    onClick,
    index
}: Props) {
    const selected = useMemo(() => {
        if (item.value === 'other') {
            return is_selected_other;
        }
        return selected_filters.includes(item.value);
    }, [is_selected_other, item.value, selected_filters]);

    return (
        <CheckboxControl
            item={item}
            onClick={() => onClick(item.value)}
            selected={selected}
            className={clsx(styles.checkbox, {
                [styles.first]  : index === 0,
                [styles.second] : index === 1,
                [styles.third]  : index === 2,
                [styles.fourth] : index === 3,
                [styles.fifth]  : index === 4,
                [styles.sixth]  : index === 5,
                [styles.seventh]: index === 6
            })}
        />
    );
}

export default memo(BrokersCheckboxControl);
