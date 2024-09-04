import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { MenuList } from '@mui/material';
import { useUpdateFilters } from '@/hooks/useAdvancedUpdateFilters';
import { IntlMessageKey } from '@/@types/next-intl';
import useUpdateSearchFilters from '@/hooks/search-params-filters/useUpdateSearchFilters';
import SortByMenuItem from './SortByMenuItem';

export type SortByOption = {
    id: number;
    title: IntlMessageKey;
    description: IntlMessageKey;
};

export const useSortByMenu = menuHookFabric(SortByMenu);

type Props<T extends { sortBy: number }> = {
    filter_id: string;
    selected_filters: T;
    options: SortByOption[];
    updateType: 'redux' | 'search';
    defaultFilters: any;
};

function SortByMenu<T extends { sortBy: number }>({
    filter_id,
    selected_filters,
    options,
    updateType,
    defaultFilters
}: Props<T>) {
    const menu = useSortByMenu(true);
    const updateFilters = useUpdateFilters({ filter_id });
    const updateSearchFilters = useUpdateSearchFilters(defaultFilters);

    const handleClick = (option_id: number) => {
        if (updateType === 'redux') {
            updateFilters({
                ...selected_filters,
                sortBy: option_id
            });
            menu.close();
            return;
        }
        updateSearchFilters({
            ...selected_filters,
            sortBy: option_id
        });

        // updateFilters({
        //     ...selected_filters,
        //     sortBy: option_id
        // });
        menu.close();
    };

    return (
        <MenuList disablePadding>
            {options.map((option) => (
                <SortByMenuItem
                    key={option.id}
                    option={option}
                    sortBy={selected_filters.sortBy}
                    onClick={handleClick}
                />
            ))}
        </MenuList>
    );
}
