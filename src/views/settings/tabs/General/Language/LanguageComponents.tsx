import { styled } from '@mui/material/styles';
import Link from 'next/link';
import RadioButton from '@/@core/ui-kits/basic/radio-button/RadioButton';
import TextField from '@mui/material/TextField';
import { IconButton, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import ClearIcon from '@mui/icons-material/Clear';
import React from 'react';
import { useAppTranslation } from '@/hooks/useAppTranslation';

const List = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    gap          : '2px'
});

const ListItem = styled(Link)(({ theme }) => ({
    padding       : '0 12px',
    width         : '100%',
    height        : '41px',
    borderRadius  : '8px',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : '8px',
    transition    : 'background-color 0.3s',

    '&:hover': {
        backgroundColor: theme.palette.semantic.foreground.secondary
    }
}));

const ListItemWrapper = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : 'inherit'
});

const ListItemText = styled('p')(({ theme }) => ({
    margin    : 0,
    fontSize  : '18px',
    fontWeight: 600,
    lineHeight: 1.4,
    color     : theme.palette.semantic.text.primary
}));

const ListItemFlag = styled('div')({
    display   : 'flex',
    alignItems: 'center',

    svg: {
        width: '24px'
    }
});

const ListItemRadioButton = styled(RadioButton)({
    width  : '18x',
    height : '18px',
    padding: 0
});

const SearchInputStyled = styled(TextField)(({ theme }) => ({
    padding: 0,

    '.MuiInputBase-root': {
        height         : '40px',
        width          : '360px',
        borderRadius   : '8px',
        backgroundColor: theme.palette.semantic.foreground.secondary,

        '.MuiOutlinedInput-notchedOutline': {
            border: 0
        }
    },
    '.MuiInputBase-input': {
        padding: 0
    }
}));

type SearchInputProps = {
    search: string;
    setSearch: (value: string) => void;
};

const SearchInput = ({
    search,
    setSearch
}: SearchInputProps) => {
    const { t } = useAppTranslation();
    return (
        <SearchInputStyled
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t('fields:search.placeholder')}
            InputProps={{
                autoComplete  : 'off',
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
                        {search && (
                            <Tooltip title={t('core:search.clear_search')}>
                                <IconButton
                                    sx={{ padding: '4px' }}
                                    onClick={() => setSearch('')}
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
        />
    );
};

const LanguageComponents = {
    List,
    ListItem,
    ListItemWrapper,
    ListItemText,
    ListItemFlag,
    ListItemRadioButton,
    SearchInput
};

export default LanguageComponents;
