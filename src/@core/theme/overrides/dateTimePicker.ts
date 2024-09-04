import { Theme } from '@mui/material';

const DateTimePicker = (theme: Theme) => ({
    MuiMultiSectionDigitalClockSection: {
        styleOverrides: {
            root: {
                '.MuiMenuItem-root.MuiMenuItem-gutters.Mui-selected': {
                    backgroundColor: theme.palette.semantic.foreground.brand.primary,
                    color          : theme.palette.semantic.text.white,

                    '&:hover': {
                        backgroundColor: theme.palette.semantic.actions.foreground.primary,
                        color          : theme.palette.semantic.text.white
                    }
                }
            }
        }
    },
    MuiCalendarPicker: {
        styleOverrides: {
            root: {
                '& [role="presentation"]': {
                    // eslint-disable-next-line max-len
                    fontWeight: 400,
                    '& .PrivatePickersFadeTransitionGroup-root + .PrivatePickersFadeTransitionGroup-root > div':
                        {
                            marginRight: 0
                        },
                    '& .MuiIconButton-sizeSmall': {
                        padding: theme.spacing(0.5)
                    },
                    '& + div .MuiIconButton-root:not(.Mui-disabled)': {
                        color: theme.palette.semantic.text.secondary
                    }
                },
                '& .PrivatePickersSlideTransition-root': {
                    minHeight: 240
                }
            }
        }
    },
    MuiPickersDay: {
        styleOverrides: {
            root: {
                fontSize                                              : '0.875rem',
                '&.MuiButtonBase-root.MuiPickersDay-root.Mui-selected': {
                    backgroundColor: theme.palette.semantic.foreground.brand.primary,
                    color          : theme.palette.semantic.text.white,

                    '&:hover': {
                        backgroundColor: theme.palette.semantic.actions.foreground.primary
                    }
                }
            }
        }
    },
    MuiPickersMonth: {
        styleOverrides: {
            root: {
                '.MuiPickersMonth-monthButton.Mui-selected ': {
                    backgroundColor: `${theme.palette.semantic.foreground.brand.primary} !important`,
                    color          : theme.palette.semantic.text.white,

                    '&:hover': {
                        backgroundColor: `${theme.palette.semantic.actions.foreground.primary} !important`
                    }
                }
            }
        }
    },
    MuiPickersYear: {
        styleOverrides: {
            root: {
                '.MuiPickersYear-yearButton.Mui-selected': {
                    backgroundColor: `${theme.palette.semantic.foreground.brand.primary} !important`,
                    color          : theme.palette.semantic.text.white,

                    '&:hover': {
                        backgroundColor: `${theme.palette.semantic.actions.foreground.primary} !important`
                    }
                }
            }
        }
    },
    MuiDateRangePickerDay: {
        styleOverrides: {
            rangeIntervalDayHighlight: {
                '&:not(.MuiDateRangePickerDay-outsideCurrentMonth)': {
                    backgroundColor: `${theme.palette.semantic.foreground.brand.primary}1F`
                }
            }
        }
    },
    MuiClockPicker: {
        styleOverrides: {
            arrowSwitcher: {
                '& .MuiIconButton-root:not(.Mui-disabled)': {
                    color: theme.palette.semantic.text.secondary
                },
                '& + div': {
                    '& > div': {
                        backgroundColor:
                            theme.palette.mode === 'light'
                                ? theme.palette.colors.gray[50]
                                : theme.palette.semantic.background.primary,
                        '& ~ .MuiIconButton-root span.MuiTypography-caption': {
                            color: 'inherit'
                        }
                    }
                }
            }
        }
    },
    MuiMonthPicker: {
        styleOverrides: {
            root: {
                '& > .MuiTypography-root.Mui-selected': {
                    fontSize: '1rem'
                }
            }
        }
    }
});

export default DateTimePicker;
