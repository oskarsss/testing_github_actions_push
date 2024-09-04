import { Components, Theme } from '@mui/material';

const Switch = (theme: Theme): Components<Omit<Theme, 'components'>> => ({
    MuiSwitch: {
        styleOverrides: {
            root: {
                '& .MuiSwitch-track': {
                    backgroundColor: theme.palette.semantic.foreground.secondary
                }
            }
        }
    }
});

export default Switch;
