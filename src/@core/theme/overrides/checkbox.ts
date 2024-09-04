import { Components, Theme } from '@mui/material';

const Checkbox = (theme: Theme): Components<Omit<Theme, 'components'>> => ({
    MuiCheckbox: {
        styleOverrides: {
            root: {
                '&.Mui-checked': {
                    color: theme.palette.semantic.foreground.brand.primary
                },
                '&.Mui-disabled': {
                    color: theme.palette.semantic.actions.foreground.gray.secondary
                },

                // for intermidiate state
                '&.MuiCheckbox-indeterminate': {
                    color: theme.palette.semantic.foreground.brand.primary
                },

                // hover for not checked

                '&:hover:not(.Mui-checked)': {
                    backgroundColor: theme.palette.semantic.actions.foreground.gray.secondary
                }

                // '&.Mui-checked:hover': {
                //     backgroundColor: theme.palette.semantic.actions.foreground.gray
                // }
            }
        }
    }
});

export default Checkbox;
