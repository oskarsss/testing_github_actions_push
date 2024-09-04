import { Theme } from '@mui/material';

const List = (theme: Theme) => ({
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                minWidth   : 0,
                marginRight: theme.spacing(2.25),
                color      : theme.palette.semantic.text.secondary
            }
        }
    },
    MuiListItemAvatar: {
        styleOverrides: {
            root: {
                minWidth   : 0,
                marginRight: theme.spacing(4)
            }
        }
    },
    MuiListItemText: {
        styleOverrides: {
            dense: {
                '& .MuiListItemText-primary': {
                    color: theme.palette.semantic.text.primary
                }
            }
        }
    },
    MuiListSubheader: {
        styleOverrides: {
            root: {
                fontWeight   : 600,
                textTransform: 'uppercase',
                color        : theme.palette.semantic.text.primary
            }
        }
    },
    MuiListItemButton: {
        styleOverrides: {
            gutters: {
                '&.Mui-selected, &.Mui-selected:hover': {
                    backgroundColor: theme.palette.semantic.foreground.brand.secondary
                }
            }
        }
    }
});

export default List;
