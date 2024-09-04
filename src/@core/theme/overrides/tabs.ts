import { Components, Theme } from '@mui/material';

const Tabs = (theme: Theme): Components<Omit<Theme, 'components'>> => ({
    MuiTabs: {
        styleOverrides: {
            vertical: {
                minWidth        : 130,
                marginRight     : theme.spacing(4),
                borderRight     : `1px solid ${theme.palette.semantic.border.secondary}`,
                '& .MuiTab-root': {
                    minWidth: 130
                }
            },
            indicator: {
                backgroundColor: theme.palette.semantic.foreground.brand.primary
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            textColorSecondary: {
                '&.Mui-selected': {
                    color: theme.palette.semantic.text.secondary
                }
            },
            root: {
                '&.Mui-selected': {
                    color: theme.palette.semantic.text.brand.primary
                }
            }
        }
    }
});

export default Tabs;
