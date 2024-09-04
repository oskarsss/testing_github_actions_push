import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import { Theme } from '@mui/material';

const Popover = (theme: Theme, skin: LayoutSettingsType['skin']) => ({
    MuiPopover: {
        styleOverrides: {
            root: {
                '& .MuiPopover-paper': {
                    boxShadow: theme.shadows[skin === 'bordered' ? 0 : 6],
                    ...(skin === 'bordered' && {
                        border: `1px solid ${theme.palette.semantic.border.secondary}`
                    })
                }
            }
        }
    }
});

export default Popover;
