import React, { CSSProperties, memo, useCallback, useEffect, useRef, useState } from 'react';
import { IconButton, InputAdornment } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import { useEventListener } from 'usehooks-ts';
import { Container, SearchTextField } from '@/@core/components/search/search-field/styled';
import { TestKey } from '@/configs/tests';
// eslint-disable-next-line import/no-extraneous-dependencies
import Mark from 'mark.js';
import useDebounce from '@/hooks/useDebounce';
import { useAppDispatch } from '@/store/hooks';
import useAdvancedUpdateFilters from '@/hooks/useAdvancedUpdateFilters';
import { updateFilters as _updateFilters } from '@/store/filters/actions';
import { useStableLinks } from '@/@core/components/table/hooks/helpers';
import { useFilters } from '@/@core/components/filters/filter-button/hooks';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import type { IntlMessageKey } from '@/@types/next-intl';

const tableID = 'table-body';

export const tableBodyProps = { id: tableID };

export const classDisableHighlight = 'disable-highlight';

type Props = {
    disabled?: boolean;
    placeholder?: IntlMessageKey;
    style?: CSSProperties;
    testID?: string;
    highlight_text_in_table?: boolean;
    filter_id: string;
    isLoading: boolean;
    format_query_parameters?: boolean;
};

function SearchField({
    disabled = false,
    placeholder = 'fields:search.placeholder',
    style = {},
    testID,
    filter_id,
    isLoading,
    highlight_text_in_table = true,
    format_query_parameters = true
}: Props) {
    const { t } = useAppTranslation();
    const [search_value, setSearchValue] = useState('');
    const [focused, setFocused] = useState(false);

    const { emptyObject } = useStableLinks();
    const dispatch = useAppDispatch();
    const updateQueryParameters = useAdvancedUpdateFilters({ filter_id });
    const markInstance = useRef(new Mark(`#${tableID}`));
    const filter: Record<string, any> = useFilters(filter_id, emptyObject);

    const updateFilters = useCallback(
        (filter: object) =>
            format_query_parameters
                ? updateQueryParameters(filter)
                : dispatch(_updateFilters(filter_id, filter)),
        [dispatch, filter_id, format_query_parameters, updateQueryParameters]
    );
    const search_text = typeof filter?.search === 'string' ? filter.search : '';

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value);
        const search_value = e.target.value.trim();
        updateFilters({
            search: search_value,
            page  : 0
        });
    };

    const debounceValue = useDebounce(highlight_text_in_table ? JSON.stringify(filter) : '', 100);

    useEffect(() => {
        if (!highlight_text_in_table || isLoading) return;
        markInstance.current.unmark();
        const data = JSON.parse(debounceValue);
        const search = typeof data?.search === 'string' ? data.search : search_value;
        if (search.length >= 1) {
            markInstance.current.mark(search.trim(), {
                className         : 'highlight-table',
                separateWordSearch: false,
                exclude           : [
                    '.MuiAvatar-root',
                    'svg',
                    'button',
                    'input',
                    'path',
                    'img',
                    '[data-mui-internal-clone-element="true"]',
                    '.MuiBadge-root',
                    `.${classDisableHighlight}`
                ]
            });
        }
    }, [debounceValue, markInstance.current, highlight_text_in_table, isLoading]);

    const handleBlur = () => {
        if (focused) {
            updateFilters({ search: search_value, page: 0 });
        }
        setFocused(false);
    };

    const enterFunction = (event: KeyboardEvent) => {
        if (event.keyCode === 13 && focused) {
            updateFilters({ search: search_value, page: 0 });
        }
    };

    useEventListener('keydown', enterFunction);

    const showSearch = () => {
        setFocused(true);
    };

    const onClear = () => {
        setSearchValue('');
        updateFilters({
            search: '',
            page  : 0
        });
    };

    useEffect(() => {
        setSearchValue(search_text);
    }, [search_text]);

    return (
        <Container style={{ ...style }}>
            <SearchTextField
                fullWidth
                InputProps={{
                    placeholder : t(placeholder),
                    value       : search_value,
                    onChange    : handleChange,
                    onFocus     : showSearch,
                    disabled,
                    autoFocus   : false,
                    autoComplete: 'off',
                    color       : 'primary',
                    sx          : {
                        height: '40px',

                        'input::placeholder': {
                            color: (theme) => `${theme.palette.semantic.text.disabled} !important`
                        }
                    },
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon
                                sx={{
                                    fill: (theme) => theme.palette.semantic.foreground.primary
                                }}
                            />
                        </InputAdornment>
                    ),
                    inputProps: {
                        [TestKey]: testID
                    },
                    endAdornment: (
                        <InputAdornment position="end">
                            {search_value && (
                                <Tooltip title={disabled ? '' : t('core:search.clear_search')}>
                                    <IconButton
                                        sx={{ padding: '4px' }}
                                        onClick={onClear}
                                        disabled={disabled}
                                    >
                                        <ClearIcon
                                            sx={{
                                                fontSize: '20px',
                                                fill    : (theme) =>
                                                    theme.palette.semantic.foreground.primary
                                            }}
                                        />
                                    </IconButton>
                                </Tooltip>
                            )}
                        </InputAdornment>
                    )
                }}
                placeholder={t(placeholder)}
                variant="standard"
                onBlur={handleBlur}
            />
        </Container>
    );
}

export default memo(SearchField);
