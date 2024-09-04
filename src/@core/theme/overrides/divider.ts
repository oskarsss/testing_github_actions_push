import { Components, Theme } from '@mui/material';

const Divider = (theme: Theme): Components<Omit<Theme, 'components'>> => ({
    MuiDivider: {
        styleOverrides: {
            root: {
                margin     : `${theme.spacing(2)} 0`,
                borderColor: theme.palette.semantic.border.secondary
            }
        }
    }
});

export default Divider;
