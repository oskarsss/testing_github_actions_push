import { Theme } from '@mui/material';

// ** Util Import
import { LayoutSettingsType } from '@/context/LayoutSettingsContext';
import { hexToRGBA } from '../../../utils/hex-to-rgba';

const Dialog = (theme: Theme, skin: LayoutSettingsType['skin']) => ({
    MuiDialog: {
        styleOverrides: {
            paper: {
                backgroundColor: theme.palette.semantic.foreground.white.tertiary,
                boxShadow      : theme.shadows[skin === 'bordered' ? 0 : 6],
                ...(skin === 'bordered' && {
                    border: `1px solid ${theme.palette.semantic.border.secondary}`
                }),
                '&:not(.MuiDialog-paperFullScreen)': {
                    '@media (max-width:599px)': {
                        margin  : theme.spacing(4),
                        width   : `calc(100% - ${theme.spacing(8)})`,
                        maxWidth: `calc(100% - ${theme.spacing(8)}) !important`
                    }
                },
                '& > .MuiList-root': {
                    paddingLeft : theme.spacing(1),
                    paddingRight: theme.spacing(1)
                }
            }
        }
    },
    MuiDialogTitle: {
        styleOverrides: {
            root: {
                padding: theme.spacing(5)
            }
        }
    },
    MuiBackdrop     : {},
    MuiDialogContent: {
        styleOverrides: {
            root: {
                padding                     : theme.spacing(5),
                '& + .MuiDialogContent-root': {
                    paddingTop: 0
                },
                '& + .MuiDialogActions-root': {
                    paddingTop: 0
                },

                // Styling for Mobile Date Picker starts
                '& .PrivatePickersToolbar-root': {
                    padding: theme.spacing(4, 5),
                    color  : theme.palette.semantic.text.primary,

                    // backgroundColor        : theme.palette.semantic.background.primary,
                    '& .MuiTypography-root': {
                        color: theme.palette.semantic.text.primary
                    },
                    '& span.MuiTypography-overline': {
                        fontSize     : '1rem',
                        lineHeight   : '24px',
                        letterSpacing: '0.15px'
                    },
                    '& ~ div[class^="css-"] > div[class^="css-"]': {
                        marginTop               : theme.spacing(6),
                        marginBottom            : theme.spacing(6),
                        '& > div[class^="css-"]': {
                            backgroundColor:
                                theme.palette.mode === 'light'
                                    ? `${hexToRGBA(theme.palette.colors.gray[900], 0.6)} !important`
                                    : hexToRGBA(theme.palette.colors.gray[900], 0.6),
                            '& ~ .MuiIconButton-root span.MuiTypography-caption': {
                                color: 'inherit'
                            }
                        }
                    },
                    '& .PrivateTimePickerToolbar-hourMinuteLabel': {
                        alignItems                                   : 'center',
                        '& > .MuiButton-root span.MuiTypography-root': {
                            fontWeight   : 300,
                            lineHeight   : '72px',
                            fontSize     : '3.75rem',
                            letterSpacing: '-0.5px'
                        },
                        '& > .MuiTypography-root': {
                            // eslint-disable-next-line max-len
                            color                                          : hexToRGBA(theme.palette.semantic.text.brand.primary, 0.54),
                            '& + .MuiButton-root > span.MuiTypography-root': {
                                color: hexToRGBA(theme.palette.semantic.text.primary, 0.54)
                            }
                        }
                    },
                    '& .PrivateTimePickerToolbar-ampmSelection span.MuiTypography-root:not(.Mui-selected)':
                        {
                            color: hexToRGBA(theme.palette.semantic.text.primary, 0.54)
                        }
                }

                // Styling for Mobile Date Picker ends
            }
        }
    },
    MuiDialogActions: {
        styleOverrides: {
            root: {
                padding                 : theme.spacing(5),
                '&.dialog-actions-dense': {
                    padding   : theme.spacing(2.5),
                    paddingTop: 0
                }
            }
        }
    }
});

export default Dialog;
