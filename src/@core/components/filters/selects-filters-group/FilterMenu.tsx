import EntityFilters from '@/@core/components/filters/filter-button/types';
import { menuHookFabric } from '@/utils/menu-hook-fabric';
import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import VectorIcons from '@/@core/icons/vector_icons';
import FilterMenuItem from '@/@core/components/filters/selects-filters-group/FilterMenuItem';
import {
    ListMenu,
    Menu,
    MenuHeader,
    SearchField,
    SearchWrap
} from '@/@core/components/filters/selects-filters-group/styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';

export const useFilterMenu = menuHookFabric(FilterMenu, {}, (props) => <Menu {...props} />);

export type Props = {
    id: string;
    selected: string[];
    items: EntityFilters.FilterConfigItem[];
    width?: CSSProperties['width'];
    onChange: (new_selected: string[], filter_type: string) => void;
    focus?: boolean;
    customTotalCount?: number;
};

export function FilterMenu({
    id,
    selected = [],
    items,
    width,
    onChange,
    focus = true,
    customTotalCount
}: Props) {
    const [search_text, setSearchText] = useState('');
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { t } = useAppTranslation();

    const selectedSet = useMemo(() => new Set(selected), [selected]);

    useEffect(() => {
        if (focus) {
            inputRef.current?.focus();
        }
    }, [focus]);

    const updateMenuFilters = useCallback(
        (value: string) => {
            if (selectedSet.has(value)) {
                selectedSet.delete(value);
            } else {
                selectedSet.add(value);
            }
            onChange(Array.from(selectedSet), id);
        },
        [selectedSet, id, onChange]
    );

    const filteredItems = useMemo(
        () =>
            items.filter(({ searchValue }) =>
                searchValue.toLowerCase().includes(search_text.toLowerCase())),
        [items, search_text]
    );

    const count =
        typeof customTotalCount === 'number'
            ? customTotalCount
            : items.reduce((acc, item) => acc + (item.count || 0), 0);

    const selectAll = () => {
        if (!selected.length) return;
        onChange([], id);
    };

    const clearFilters = () => {
        setSearchText('');
        onChange([], id);
    };

    return (
        <div style={{ width, minWidth: 290 }}>
            <MenuHeader>
                <SearchWrap>
                    <SearchField
                        autoFocus
                        value={search_text}
                        inputRef={inputRef}
                        autoComplete="off"
                        placeholder={`${t('core:filters.menu.search.placeholder')}...`}
                        variant="filled"
                        style={{ flexGrow: 1 }}
                        size="small"
                        InputProps={{
                            startAdornment: <VectorIcons.Search />
                        }}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Tooltip
                        title={t('core:filters.menu.clear_filter_tooltip')}
                        disableInteractive
                    >
                        <IconButton
                            onClick={clearFilters}
                            sx={{
                                svg: {
                                    path: {
                                        fill: (theme) =>
                                            selected.length > 0
                                                ? theme.palette.semantic.foreground.brand.primary
                                                : theme.palette.semantic.text.secondary
                                    }
                                }
                            }}
                        >
                            <VectorIcons.Garbage />
                        </IconButton>
                    </Tooltip>
                </SearchWrap>

                <FilterMenuItem
                    checked={!selected?.length}
                    label={(
                        <>
                            <VectorIcons.CheckBox />
                            <span>{t('common:all')}</span>
                        </>
                    )}
                    value=""
                    count={count || undefined}
                    onClick={selectAll}
                />
            </MenuHeader>

            <ListMenu>
                {filteredItems.map((item) => (
                    <FilterMenuItem
                        key={item.value}
                        value={item.value}
                        count={item.count}
                        label={item.label}
                        checked={selectedSet.has(item.value)}
                        onClick={updateMenuFilters}
                    />
                ))}
            </ListMenu>
        </div>
    );
}
