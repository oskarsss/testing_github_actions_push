import { useAllUsers } from '@/@grpcServices/services/users-service/hooks';
import { useMemo } from 'react';
import { AvatarFilterItem } from '../filter-button/filter_helpers';
import { $Filter } from '../utils';

export const USER_FILTER_CONFIG = $Filter.configure<string>((counts) => {
    const { users } = useAllUsers();
    const filterItems = useMemo(
        () =>
            $Filter
                .sortItemsByCount(users, 'userId', 'firstName', counts)
                .map(({
                    userId,
                    firstName,
                    lastName,
                    selfieThumbUrl
                }) => ({
                    label: $Filter.createLabel(
                        <AvatarFilterItem
                            url={selfieThumbUrl}
                            label={`${firstName} ${lastName}`}
                            type="user"
                        />,
                        `${firstName} ${lastName}`
                    ),
                    searchValue: `${firstName} ${lastName}`,
                    value      : userId,
                    count      : counts?.[userId]
                })),
        [counts, users]
    );

    return { filterItems, label: 'entity:dispatcher' as const };
});

export const TRUCK_USERS_FILTER_CONFIG = $Filter.configure<string>((counts) => {
    const { users } = useAllUsers();

    const filterItems = useMemo(
        () =>
            $Filter
                .sortItemsByCount(users, 'userId', 'firstName', counts)
                .map(({
                    userId,
                    firstName,
                    lastName,
                    selfieThumbUrl
                }) => ({
                    label: $Filter.createLabel(
                        <AvatarFilterItem
                            url={selfieThumbUrl}
                            label={`${firstName} ${lastName}`}
                            type="user"
                        />,
                        `${firstName} ${lastName}`
                    ),
                    searchValue: `${firstName} ${lastName}`,
                    value      : userId,
                    count      : counts?.[userId]
                })),
        [counts, users]
    );

    return { filterItems, label: 'entity:dispatcher' as const, counts };
});
