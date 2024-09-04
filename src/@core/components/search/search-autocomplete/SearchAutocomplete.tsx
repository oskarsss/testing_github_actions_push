import React, { memo, useCallback, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useLocalStorage } from 'usehooks-ts';

import SearchIcon from '@mui/icons-material/Search';

import { useAccountCompanies } from '@/store/app/hooks';
import { useAppDispatch } from '@/store/hooks';

import { useFilters } from '@/@core/components/filters/filter-button/hooks';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import { ParsedUrlQuery } from 'querystring';
import { IntlMessageKey } from '@/@types/next-intl';
import Autocomplete from './Autocomplete';
import ChipsComponent from './Chips';

// import { updateFilters as _updateFilters } from '../../../../services/filters/actions';
import { Chip, Chips, DataLS, SearchOptionType, SelectedFilters } from './type';
import { Container } from './styled';

const KEY_LOCAL_STORAGE = 'search_autocomplete';

const default_value: Chips = {
    select_chip: null,
    chips      : []
};

type MainProps = {
    filter_id: string;
    search_options: SearchOptionType[];
    routerQuery?: null | ParsedUrlQuery;
    placeholder?: IntlMessageKey;
    number_of_first_page?: number;
    customChangeFilters?: (value: SelectedFilters) => void;
};
const default_search_filter = {
    search: ''
};

function SearchAutocomplete({
    filter_id,
    search_options,
    routerQuery = null,
    placeholder = 'core:search.autocomplete.placeholder',
    number_of_first_page = 0,
    customChangeFilters
}: MainProps) {
    const selected_filters = useFilters(filter_id, default_search_filter);
    const {
        control,
        setValue,
        getValues
    } = useForm({
        defaultValues: { search_value: '' },
        values       : { search_value: selected_filters.search || '' }
    });

    // eslint-disable-next-line no-underscore-dangle
    const _updateFilters = useAdvancedUpdateFilters({ filter_id });
    const companyId = useAccountCompanies().company?.companyId || '0';
    const dispatch = useAppDispatch();

    const [valueLS, setValueLS] = useLocalStorage<DataLS>(KEY_LOCAL_STORAGE, {});

    const chips = useMemo(
        () => valueLS[companyId]?.[filter_id] || default_value,
        [valueLS, filter_id, companyId]
    );

    const updateFilters = useCallback(
        (filters: SelectedFilters) => {
            if (selected_filters.search !== filters.search) {
                if (customChangeFilters) {
                    customChangeFilters(filters);
                } else {
                    _updateFilters({ ...filters, page: number_of_first_page });
                }
            }
        },
        [dispatch, filter_id, selected_filters.search]
    );

    const updateLS = useCallback(
        (data: Chips) => {
            setValueLS({
                ...valueLS,
                [companyId]: {
                    ...valueLS[companyId],
                    [filter_id]: data
                }
            });
        },
        [setValueLS, companyId, filter_id, valueLS]
    );

    useEffect(() => {
        if (Array.isArray(valueLS)) {
            updateLS(default_value);
            return;
        }
        const data = valueLS?.[companyId]?.[filter_id];
        if (data?.select_chip?.search) {
            updateFilters({ search: data.select_chip.search });

            // updateFilters({ search: data.select_chip.search });
        }
    }, []);

    useEffect(() => {
        if (selected_filters.search && !chips.select_chip) {
            const selected_chip = chips.chips.find(
                (chip) => chip.search === selected_filters.search
            );
            updateLS({
                select_chip: selected_chip || null,
                chips      : chips.chips
            });
        } else if (!selected_filters.search && chips.select_chip) {
            updateLS({
                select_chip: null,
                chips      : chips.chips
            });
        }
    }, [selected_filters.search]);

    const setNewChip = useCallback(
        (chip: Chip) => {
            const new_chips = chips;
            const chip_array = [...new_chips.chips];
            const index = new_chips.chips.findIndex((item_chip) => item_chip.label === chip.label);
            if (index >= 0) {
                chip_array.unshift(...chip_array.splice(index, 1));
            } else {
                chip_array.unshift(chip);
            }
            if (chip_array.length > 10) {
                chip_array.splice(10);
            }
            const select_chip = chip_array[0];

            updateLS({
                select_chip,
                chips: chip_array
            });
        },
        [updateLS]
    );

    useEffect(() => {
        if (routerQuery && Object.keys(routerQuery).length > 0 && search_options?.length) {
            const key = Object.keys(routerQuery)[0];
            const querySearch = `${key}:${routerQuery[key]}`;

            if (routerQuery[key] && selected_filters.search !== querySearch) {
                const searchOption = search_options.filter((el) => el.key === `${key}:`)[0];
                if (searchOption) {
                    setNewChip({
                        label : `${searchOption.value}:${routerQuery[key]}`,
                        search: querySearch
                    });
                    updateFilters({ search: querySearch });
                }
            }
        }
    }, [routerQuery, search_options?.length]);

    const handlerSelectChip = useCallback(
        (new_chips: Chips) => {
            if (new_chips.select_chip === null) setValue('search_value', '');

            updateLS(new_chips);
            updateFilters({
                search: new_chips.select_chip ? new_chips.select_chip.search : ''
            });
        },
        [setValue, updateFilters, updateLS]
    );

    const handlerDeleteAll = useCallback(() => {
        setValue('search_value', '');
        updateFilters({ search: '' });
        updateLS(default_value);
    }, [setValue, updateFilters, updateLS]);

    return (
        <Container
            sx={{
                width: chips?.chips.length ? '100%' : 'auto'
            }}
        >
            <SearchIcon
                sx={{
                    color: (theme) => theme.palette.semantic.foreground.primary
                }}
            />
            <Autocomplete
                control={control}
                placeholder={placeholder}
                search_options={search_options}
                updateFilters={updateFilters}
                updateLS={updateLS}
                chips={chips}
                setValue={setValue}
                getValues={getValues}
                setNewChip={setNewChip}
            />
            <ChipsComponent
                value={chips}
                onSelectChip={handlerSelectChip}
                onDeleteAll={handlerDeleteAll}
            />
        </Container>
    );
}

export default memo(SearchAutocomplete);
