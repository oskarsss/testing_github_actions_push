import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import { Theme } from '@mui/material';

const Autocomplete = (theme: Theme, skin: LayoutSettingsType['skin']) => ({
    MuiAutocomplete: {
        styleOverrides: {
            paper: {
                ...(skin === 'bordered' && {
                    boxShadow: 'none',
                    border   : `1px solid ${theme.palette.semantic.border.secondary}`
                })
            },
            listbox: {
                '& .MuiAutocomplete-option[aria-selected="true"]': {
                    backgroundColor: `${theme.palette.semantic.foreground.brand.primary}14`
                },
                '& .MuiAutocomplete-option[aria-selected="true"].Mui-focused': {
                    backgroundColor: theme.palette.semantic.foreground.brand.secondary
                }
            }
        }
    }
});

export default Autocomplete;
