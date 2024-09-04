import { SearchTextField } from '@/@core/components/search/search-field/styled';
import { useAppTranslation } from '@/hooks/useAppTranslation';
import { IconButton, InputAdornment, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { on } from 'events';
import React from 'react';

type Props = {
    value: string;
    onChange: (value: string) => void;
};

export default function Search({
    onChange,
    value
}: Props) {
    const { t } = useAppTranslation();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.value);
    };

    const clearSearch = () => {
        onChange('');
    };

    return (
        <SearchTextField
            sx={{
                border: ({ palette }) => `1px solid ${palette.semantic.border.secondary}`
            }}
            fullWidth
            InputProps={{
                placeholder : 'mydomain.com',
                value,
                onChange    : handleChange,
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
                endAdornment: (
                    <InputAdornment position="end">
                        {value && (
                            <Tooltip title={t('core:search.clear_search')}>
                                <IconButton
                                    sx={{ padding: '4px' }}
                                    onClick={clearSearch}
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
            placeholder="mydomain.com"
            variant="standard"
        />
    );
}
