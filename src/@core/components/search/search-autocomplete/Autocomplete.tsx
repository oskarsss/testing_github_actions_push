import React, { memo, useState } from 'react';
import { Controller, Control, UseFormGetValues, UseFormSetValue } from 'react-hook-form';
import { FormControl } from '@mui/material';
import Autocomplete from '@mui/material/Autocomplete';
// eslint-disable-next-line import/no-extraneous-dependencies
import { AutocompleteInputChangeReason } from '@mui/base/useAutocomplete/useAutocomplete';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';
import { NoOptions, SearchAutocompleteField } from './styled';
import { Chip, Chips, SearchOptionType, SelectedFilters } from './type';

type TFieldValues = {
    search_value: string;
};

type Props = {
    placeholder: IntlMessageKey;
    search_options: SearchOptionType[];
    updateFilters: (value: SelectedFilters) => void;
    updateLS: (value: Chips) => void;
    chips: Chips;
    control: Control<TFieldValues, any>;
    setValue: UseFormSetValue<TFieldValues>;
    getValues: UseFormGetValues<TFieldValues>;
    setNewChip: (value: Chip) => void;
};

function AutocompleteForSearch({
    placeholder,
    search_options,
    updateFilters,
    updateLS,
    chips,
    control,
    setValue,
    getValues,
    setNewChip
}: Props) {
    const [enter, set_enter] = useState(false);
    const [focused, set_focused] = useState(false);
    const { t } = useAppTranslation();

    const removeSelectedChip = () => {
        updateFilters({ search: '' });
        updateLS({
            select_chip: null,
            chips      : chips?.chips || []
        });
    };

    const existData = (data: string | undefined) => {
        if (!data) {
            return false;
        }
        if (data.includes(':')) {
            const first = data.split(':')[0].trim();
            if (search_options.map((item) => item.key === first).length) {
                const res = data.split(':')[1];
                return Boolean(res && res.trim().length);
            }
        }
        const res = data;
        return Boolean(res && res.trim().length);
    };

    const getSearchText = () => {
        const search_value = getValues('search_value');

        let search = search_value;
        let label;

        search_options.map((value) => {
            if (search_value.search(value.key) === 0) {
                search = value.key + search_value.slice(value.key.length);
                label = `${value.value}:${search_value.slice(value.key.length)}`;
            }
            return null;
        });

        return {
            search,
            label: label || `${t('core:search.main_name')}: ${search_value}`
        };
    };

    const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        const {
            search,
            label
        } = getSearchText();

        if (focused) {
            set_focused(false);
            set_enter(false);

            if (existData(event.target.value)) {
                updateFilters({ search });
                setNewChip({ label, search });
            }
        }
    };

    const showSearch = () => {
        set_focused(true);
        set_enter(true);
    };

    const enterFunction = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.keyCode === 13) {
            const target = event.target as HTMLInputElement;
            if (enter && existData(target.value)) {
                const {
                    search,
                    label
                } = getSearchText();

                set_focused(false);
                updateFilters({ search });
                setNewChip({ label, search });
            } else {
                set_focused(false);
            }
        }
    };

    const handleInputChange = (
        event: React.SyntheticEvent,
        value: string,
        reason: AutocompleteInputChangeReason
    ) => {
        if (event === null) return;
        if (event.type === 'blur') {
            set_focused(false);
            return;
        }

        if (['reset', 'input'].includes(reason)) {
            setValue('search_value', value);
            set_focused(true);

            if (!value) {
                removeSelectedChip();
            }
        }

        if (reason === 'clear') {
            removeSelectedChip();
            setValue('search_value', value);
            set_focused(true);
        }
    };

    return (
        <FormControl
            sx={{
                flexGrow  : 1,
                width     : focused ? 300 : 140,
                transition: 'width 0.3s',
                '&:hover' : {
                    width: 300
                }
            }}
        >
            <Controller
                name="search_value"
                control={control}
                render={({ field: { value } }) => (
                    <Autocomplete
                        style={{ width: '100%' }}
                        options={search_options}
                        inputValue={value}
                        slotProps={{
                            popupIndicator: {
                                onClick: () => set_focused((prev) => !prev)
                            },
                            popper: {
                                style: {
                                    minWidth: 180
                                }
                            }
                        }}
                        popupIcon={(
                            <ArrowDropDownIcon
                                sx={{ color: (theme) => theme.palette.semantic.foreground.primary }}
                            />
                        )}
                        open={focused && search_options.length > 0}
                        classes={{
                            option: 'option'
                        }}
                        clearOnEscape
                        disableCloseOnSelect
                        getOptionLabel={(option) => {
                            if (typeof option === 'string') {
                                return option;
                            }
                            return option.key;
                        }}
                        noOptionsText={(
                            <NoOptions>
                                {t('core:search.autocomplete.show_all_result')}
                                <span>{` ${value}`}</span>
                            </NoOptions>
                        )}
                        onInputChange={handleInputChange}
                        renderOption={(props, option) => {
                            if (option.key === null) {
                                return t('core:search.autocomplete.suggested_filers');
                            }
                            return (
                                <li {...props}>
                                    <span
                                        className="key"
                                        style={{ marginRight: 3 }}
                                    >
                                        {option.key}
                                    </span>
                                    {option.value}
                                </li>
                            );
                        }}
                        renderInput={(params) => (
                            <SearchAutocompleteField
                                {...params}
                                placeholder={t(placeholder)}
                                fullWidth
                                inputProps={{
                                    ...params.inputProps,
                                    onFocus     : showSearch,
                                    autoComplete: 'off'
                                }}
                                onBlur={handleBlur}
                                onKeyDown={enterFunction}
                                onPaste={() => {
                                    setTimeout(() => {
                                        const activeElement = document.activeElement as HTMLElement;
                                        activeElement.blur();
                                    }, 0);
                                }}
                                variant="standard"
                                sx={{
                                    'input::placeholder': {
                                        color: (theme) =>
                                            `${theme.palette.semantic.text.disabled} !important`
                                    }
                                }}
                            />
                        )}
                    />
                )}
            />
        </FormControl>
    );
}

export default memo(AutocompleteForSearch);
