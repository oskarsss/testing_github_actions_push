import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import { Theme } from '@mui/material';

const Menu = (theme: Theme, skin: LayoutSettingsType['skin']) => {
    const boxShadow = () => {
        if (skin === 'bordered') {
            return theme.shadows[0];
        }
        if (theme.palette.mode === 'light') {
            return theme.shadows[8];
        }
        return theme.shadows[9];
    };

    return {
        MuiMenu: {
            styleOverrides: {
                root: {
                    '& .MuiMenu-paper': {
                        borderRadius: 5,
                        boxShadow   : boxShadow(),
                        ...(skin === 'bordered' && {
                            border: `1px solid ${theme.palette.semantic.border.secondary}`
                        })
                    }
                }
            }
        }
    };
};

export default Menu;
