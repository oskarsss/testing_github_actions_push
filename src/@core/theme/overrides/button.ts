import { Components, Theme } from '@mui/material';

// ** Theme Config Imports
import themeConfig from '../../../configs/themeConfig';

const Button = (theme: Theme): Components<Omit<Theme, 'components'>> => ({
    MuiButton: {
        styleOverrides: {
            outlinedError: {
                color      : theme.palette.utility.text.error,
                borderColor: theme.palette.utility.text.error,
                '&:hover'  : {
                    backgroundColor: theme.palette.utility.foreground.error.secondary,
                    borderColor    : theme.palette.utility.text.error
                }
            },
            containedError: {
                color          : theme.palette.semantic.text.white,
                backgroundColor: theme.palette.utility.text.error,
                '&:hover'      : {
                    backgroundColor: theme.palette.utility.foreground.error.primary,
                    borderColor    : theme.palette.utility.text.error
                }
            },
            outlinedSecondary: {
                color      : theme.palette.semantic.text.secondary,
                borderColor: theme.palette.semantic.text.secondary,
                '&:hover'  : {
                    backgroundColor: theme.palette.semantic.actions.foreground.gray.primary
                }
            },
            textError: {
                color    : theme.palette.utility.text.error,
                '&:hover': {
                    backgroundColor: theme.palette.utility.foreground.error.secondary
                }
            },
            textSecondary: {
                color    : theme.palette.semantic.text.secondary,
                '&:hover': {
                    backgroundColor: theme.palette.semantic.actions.foreground.gray.primary
                }
            },
            text: {
                '&:hover': {
                    backgroundColor: theme.palette.semantic.actions.foreground.tertiary
                }
            },

            root: {
                fontWeight   : 500,
                borderRadius : 5,
                lineHeight   : 1.71,
                letterSpacing: '0.3px',
                padding      : `${theme.spacing(1.875, 3)}`,
                color        : theme.palette.semantic.foreground.brand.primary
            },

            contained: {
                boxShadow      : theme.shadows[3],
                padding        : `${theme.spacing(1.875, 5.5)}`,
                backgroundColor: theme.palette.semantic.foreground.brand.primary,
                color          : theme.palette.semantic.text.white,
                '&:hover'      : {
                    backgroundColor: theme.palette.semantic.actions.foreground.primary
                }
            },
            outlined: {
                padding: `${theme.spacing(1.625, 5.25)}`,

                borderColor: theme.palette.semantic.border.brand.primary,
                color      : theme.palette.semantic.text.brand.primary,
                '&:hover'  : {
                    borderColor    : theme.palette.semantic.border.brand.primary,
                    backgroundColor: theme.palette.semantic.foreground.brand.secondary
                },

                '&:active': {
                    borderColor    : theme.palette.semantic.border.brand.primary,
                    backgroundColor: theme.palette.semantic.foreground.brand.secondary
                },
                '&.Mui-focused': {
                    '&.MuiOutlinedInput-notchedOutline': {
                        borderColor: theme.palette.semantic.border.brand.primary
                    }
                }
            },
            sizeSmall: {
                padding                : `${theme.spacing(1, 2.25)}`,
                '&.MuiButton-contained': {
                    padding: `${theme.spacing(1, 3.5)}`
                },
                '&.MuiButton-outlined': {
                    padding: `${theme.spacing(0.75, 3.25)}`
                }
            },
            sizeLarge: {
                padding                : `${theme.spacing(2.125, 5.5)}`,
                '&.MuiButton-contained': {
                    padding: `${theme.spacing(2.125, 6.5)}`
                },
                '&.MuiButton-outlined': {
                    padding: `${theme.spacing(1.875, 6.25)}`
                }
            }
        }
    },
    MuiButtonBase: {
        defaultProps: {
            disableRipple: themeConfig.disableRipple
        },

        styleOverrides: {
            root: {
                '&.Mui-selected.MuiMenuItem-root': {
                    backgroundColor: `${theme.palette.semantic.foreground.brand.primary}14`
                },
                '&.Mui-selected:hover.MuiMenuItem-root': {
                    backgroundColor: theme.palette.semantic.foreground.brand.secondary
                }
            }
        }
    }

    // MuiIconButton: {
    //     styleOverrides: {
    //         root: {
    //             padding: theme.spacing(1.25),
    //             color  : theme.palette.semantic.text.primary,

    //             // set up styles for hover
    //             '&:hover': {
    //                 backgroundColor: theme.palette.semantic.background.secondary
    //             }
    //         }
    //     }
    // }
});

export default Button;
