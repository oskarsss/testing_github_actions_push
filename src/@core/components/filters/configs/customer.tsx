import { useAllCustomers } from '@/store/dispatch/customers/hooks';
import { useMemo } from 'react';
import { AvatarFilterItem } from '../filter-button/filter_helpers';
import { $Filter } from '../utils';

export const CUSTOMER_FILTER_CONFIG = $Filter.configure<string>((counts) => {
    const { customers } = useAllCustomers();
    const filterItems = useMemo(
        () =>
            $Filter
                .sortItemsByCount(customers, 'customerId', 'name', counts)
                .map(({
                    customerId,
                    name
                }) => ({
                    label: $Filter.createLabel(
                        <AvatarFilterItem
                            url={null}
                            label={name}
                            type="user"
                        />,
                        name
                    ),
                    searchValue: name,
                    value      : customerId,
                    count      : counts?.[customerId]
                })),
        [counts, customers]
    );

    return { filterItems, label: 'entity:customers' as const };
});
