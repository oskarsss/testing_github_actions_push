import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import { Theme } from '@mui/material';

const Snackbar = (theme: Theme, skin: LayoutSettingsType['skin']) => ({
    MuiSnackbarContent: {
        styleOverrides: {
            root: {
                ...(skin === 'bordered' && { boxShadow: 'none' }),
                backgroundColor:
                    theme.palette.mode === 'light'
                        ? theme.palette.colors.gray[900]
                        : theme.palette.colors.gray[100]
            }
        }
    }
});

export default Snackbar;
