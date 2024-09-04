/* eslint-disable react/no-array-index-key */
import EntityFilters from '@/@core/components/filters/filter-button/types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Fade from '@mui/material/Fade';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import { isEqual } from 'lodash';
import { memo, useMemo, useState, Fragment } from 'react';
import { FieldError } from 'react-hook-form';
import { FilterConfigCallback } from '@/@core/components/filters/utils';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IntlMessageKey } from '@/@types/next-intl';
import { FilterKeys } from '../types';
import { FilterMenu } from './FilterMenu';
import { Chip, ContainerValue, FormControl, Menu } from './styled';

export const ICON_SIZE = 24;

type Props = {
    filter_type: FilterKeys;
    value: string[];
    counts?: EntityFilters.Filter['counts'];
    amounts?: EntityFilters.Filter['amounts'];
    label?: IntlMessageKey | string;
    onChange: (new_selected: string[], filter_type: string) => void;
    required?: boolean;
    quantity_show?: number;
    error?: FieldError;
    size?: 'small' | 'medium';
    variant?: 'standard' | 'filled' | 'outlined';
    getFilterConfig?: FilterConfigCallback;
};

const defaultFilterConfig: FilterConfigCallback = (counts, amounts) => ({
    filterItems: Object.entries(counts ?? {}).map(([value, count]) => ({
        label      : value,
        searchValue: value,
        value,
        count,
        amount     : amounts?.[value]
    })),
    label: ''
});

const FiltersItem = memo(
    ({
        filter_type,
        value = [],
        counts,
        amounts,
        required = false,
        onChange,
        quantity_show = 1,
        label,
        error,
        size = 'small',
        variant = 'outlined',
        getFilterConfig
    }: Props) => {
        const { t } = useAppTranslation();
        const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

        const useFilterConfig = getFilterConfig ?? defaultFilterConfig;

        const {
            filterItems,
            customTotalCount,
            label: configLabel
        } = useFilterConfig(counts, amounts);

        const count_selected = useMemo(
            () =>
                Object.entries(counts ?? {}).reduce((acc, [selected_id, count]) => {
                    if (value?.includes?.(selected_id)) {
                        return acc + (count ?? 0);
                    }
                    return acc;
                }, 0),
            [counts, value]
        );

        const inputLabel = t(label || configLabel || '');

        return (
            <>
                <Fade
                    in
                    timeout={500}
                >
                    <FormControl
                        fullWidth
                        variant={variant}
                        size={size}
                    >
                        <InputLabel
                            required={required}
                            htmlFor={`select-input-${filter_type}`}
                            shrink
                        >
                            {inputLabel}
                        </InputLabel>
                        <Select
                            size={size}
                            labelId={`select-input-${filter_type}`}
                            variant={variant}
                            label={inputLabel}
                            value="default"
                            open={false}
                            onClick={(e) => setAnchorEl(e.currentTarget)}
                            onChange={() => {}}
                            IconComponent={KeyboardArrowDownIcon}
                            inputProps={{ readOnly: true }}
                            style={{ overflow: 'hidden' }}
                        >
                            <MenuItem value="default">
                                <ContainerValue>
                                    {count_selected ? <Chip label={count_selected} /> : null}
                                    {value.length
                                        ? value
                                            .slice(0, quantity_show)
                                            .map((item, index) => (
                                                <Fragment key={`${String(item)}_${index}`}>
                                                    {
                                                        filterItems.find((i) => i.value === item)
                                                            ?.label
                                                    }
                                                </Fragment>
                                            ))
                                        : t('common:all')}
                                    {value.length > quantity_show && (
                                        <span>
                                            {t('core:filters.and_more', {
                                                count: value.length - quantity_show
                                            })}
                                        </span>
                                    )}
                                </ContainerValue>
                            </MenuItem>
                        </Select>
                        {!!error && (
                            <FormHelperText sx={{ color: 'error.main' }}>
                                <span>{error.message}</span>
                            </FormHelperText>
                        )}
                    </FormControl>
                </Fade>
                <Menu
                    open={!!anchorEl}
                    anchorEl={anchorEl}
                    onClose={() => setAnchorEl(null)}
                >
                    <FilterMenu
                        id={filter_type}
                        items={filterItems}
                        onChange={onChange}
                        selected={value}
                        focus={!!anchorEl}
                        customTotalCount={customTotalCount}
                    />
                </Menu>
            </>
        );
    },
    isEqual
);

export default FiltersItem;
