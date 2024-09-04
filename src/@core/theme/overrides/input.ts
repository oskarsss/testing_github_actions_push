/* eslint-disable max-len */
import { Components, Theme } from '@mui/material';

const Input = (theme: Theme): Components<Omit<Theme, 'components'>> => ({
    MuiFormLabel: {
        styleOverrides: {
            root: {
                '&.MuiFormLabel-root': {
                    color: theme.palette.semantic.text.secondary
                },
                '&.Mui-focused': {
                    color: theme.palette.semantic.text.brand.primary
                },
                '&.Mui-error': {
                    color: theme.palette.utility.text.error
                }
            }
        }
    },

    MuiInput: {
        styleOverrides: {
            root: {
                '&:before': {
                    borderBottom: `1px solid ${theme.palette.semantic.border.primary}`
                },
                '&:hover:not(.Mui-disabled):before': {
                    borderBottom: `1px solid ${theme.palette.semantic.border.primary}`
                },
                '&.Mui-disabled:before': {
                    borderBottom: `1px solid ${theme.palette.semantic.text.disabled}`
                }
            }
        }
    },

    MuiFilledInput: {
        styleOverrides: {
            root: {
                backgroundColor: theme.palette.semantic.foreground.secondary, // Use without !important if possible
                // '&:hover:not(.Mui-disabled)': {
                //     backgroundColor: theme.palette.semantic.foreground.secondary
                // },

                '&.Mui-error:before': {
                    borderBottomColor: theme.palette.semantic.border.error.primary // More specific to increase specificity
                },
                '&.Mui-error:after': {
                    borderBottomColor: theme.palette.semantic.border.error.primary // More specific to increase specificity
                },
                '&:before': {
                    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
                },
                '&:after': {
                    borderBottom: `1px solid ${theme.palette.semantic.border.brand.primary}`
                },

                // '&:hover:not(.Mui-disabled):before': {
                //     borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
                // },

                // // set up hover if has error

                // '&:hover:not(.Mui-error):before': {
                //     borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
                // }
                '&:hover:not(.Mui-disabled):not(.Mui-error):before': {
                    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
                }

                // Note: "focused" class is not a direct class applied to the root. If you want to style the focused state, you should use the '&.Mui-focused' selector within the root.
            }
        }
    },

    MuiFormHelperText: {
        styleOverrides: {
            root: {
                '&.Mui-error': {
                    color: theme.palette.utility.text.error
                }
            }
        }
    },

    MuiOutlinedInput: {
        styleOverrides: {
            root: {
                '&:hover:not(.Mui-focused) .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.semantic.border.secondary
                },
                '&:hover.Mui-error .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.utility.foreground.error.primary
                },
                '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.semantic.border.secondary
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.semantic.foreground.brand.primary
                },
                '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                    borderColor: theme.palette.semantic.text.disabled
                }
            }
        }
    },

    MuiInputBase: {
        styleOverrides: {
            root: {
                '&.Mui-focused.MuiInput-root.MuiInput-underline::after': {
                    border: `1px solid ${theme.palette.semantic.foreground.brand.primary}`
                },
                '& input[type="time"]::-webkit-datetime-edit-hour-field:focus': {
                    backgroundColor: theme.palette.semantic.foreground.brand.secondary,
                    color          : theme.palette.semantic.text.primary
                },
                '& input[type="time"]::-webkit-datetime-edit-minute-field:focus': {
                    backgroundColor: theme.palette.semantic.foreground.brand.secondary,
                    color          : theme.palette.semantic.text.primary
                },
                '& input[type="time"]::-webkit-datetime-edit-ampm-field:focus': {
                    backgroundColor: theme.palette.semantic.foreground.brand.secondary,
                    color          : theme.palette.semantic.text.primary
                },
                '& input::selection': {
                    backgroundColor: theme.palette.semantic.foreground.brand.secondary,
                    color          : theme.palette.semantic.text.primary
                },
                '& textarea::selection': {
                    backgroundColor: theme.palette.semantic.foreground.brand.secondary,
                    color          : theme.palette.semantic.text.primary
                }
            }
        }
    }
});

export default Input;
