// ** Util Import
import { Theme } from '@mui/material';
import { LayoutSettingsType } from '@/context/LayoutSettingsContext';

const GlobalStyles = (theme: Theme, settings: LayoutSettingsType) => {
    // ** Vars
    const { skin } = settings;

    const perfectScrollbarThumbBgColor = () =>

        // if (skin === 'semi-dark' && theme.palette.mode === 'light') {
        //     return '#504B6D !important';
        // }
        // if (skin === 'semi-dark' && theme.palette.mode === 'dark') {
        //     return '#C2C4D1 !important';
        // }
        `${theme.palette.semantic.foreground.white.tertiary} !important`;
    return {
        '.highlight-table': {
            backgroundColor: 'transparent',
            color          : theme.palette.semantic.foreground.brand.primary,
            fontWeight     : 600,
            display        : 'contents'
        },
        'body[style^="padding-right"] .layout-navbar-and-nav-container::after': {
            content        : '""',
            position       : 'absolute',
            left           : '100%',
            top            : 0,
            height         : '100%',
            backgroundColor: theme.palette.semantic.foreground.white.primary,
            width          : '30px'
        },
        body: {
            background: theme.palette.semantic.foreground.white.primary
        },
        '.MuiGrid-container.match-height .MuiCard-root': {
            height: '100%'
        },
        '.ps__rail-y': {
            zIndex                            : 1000,
            '&:hover, &:focus, &.ps--clicking': {
                backgroundColor:
                    theme.palette.mode === 'light' ? '#E4E5EB !important' : '#423D5D !important'
            },
            '& .ps__thumb-y': {
                backgroundColor:
                    theme.palette.mode === 'light' ? '#C2C4D1 !important' : '#504B6D !important'
            },
            '.layout-vertical-nav &': {
                '& .ps__thumb-y': {
                    width          : 4,
                    backgroundColor: perfectScrollbarThumbBgColor()
                },
                '&:hover, &:focus, &.ps--clicking': {
                    backgroundColor : 'transparent !important',
                    '& .ps__thumb-y': {
                        width: 6
                    }
                }
            }
        },
        '#nprogress': {
            pointerEvents: 'none',
            '& .bar'     : {
                left           : 0,
                top            : 0,
                height         : 3,
                width          : '100%',
                zIndex         : 2000,
                position       : 'fixed',
                backgroundColor: theme.palette.semantic.foreground.brand.primary
            }
        },
        '.row-hover': {
            '&:hover': {
                // WebkitFilter   : 'saturate(1.5)',
                backgroundColor: theme.palette.semantic.actions.foreground.gray.secondary
            }
        },
        '.row-selected': {
            WebkitFilter: 'saturate(1.5)',

            // eslint-disable-next-line max-len
            backgroundColor:
                theme.palette.mode === 'light' ? '#e0e9ff !important' : '#423D5D !important',
            borderBottom: '1px solid #ccdbff'
        },
        '.cell-selected': {
            boxShadow  : `0px 0px 0px 2.5px ${theme.palette.semantic.border.brand.primary} inset !important`,
            writingMode: 'horizontal-tb'
        },
        '.cell': {
            borderRight: `2px solid ${theme.palette.semantic.border.secondary} !important`
        },
        '.sticky-row': {
            '&.onboarding': {
                backgroundColor: theme.palette.mode === 'light' ? '#fff4c6' : '#867c1f',
                color          : theme.palette.mode === 'light' ? 'rgba(58, 53, 65, 0.68)' : '#fff'
            },
            '&.compliance_review': {
                backgroundColor: theme.palette.mode === 'light' ? '#ffe063' : '#ffe063',
                color:
                    theme.palette.mode === 'light'
                        ? 'rgba(58, 53, 65, 0.68)'
                        : 'rgba(58, 53, 65, 0.68)'
            },

            // '&.in_review, &.need_review': {
            //     backgroundColor: theme.palette.mode === 'light' ? '#ffe063' : '#9a7e11',
            //     color          : theme.palette.mode === 'light' ? '#937700' : '#fff'
            // },
            '&.available': {
                backgroundColor: theme.palette.mode === 'light' ? '#dff1df' : '#dff1df',
                color          : theme.palette.mode === 'light' ? '#044804' : '#044804'
            },

            // '&.open': {
            //     backgroundColor: theme.palette.mode === 'light' ? '#ffffdc' : '#bcac1a',
            //     color          : theme.palette.mode === 'light' ? '#937700' : '#fff'
            // },
            // '&.closed': {
            //     backgroundColor: theme.palette.mode === 'light' ? '#c9c9c9' : '#696969',
            //     color          : theme.palette.mode === 'light' ? '#2c2c2c' : '#fff'
            // },
            '&.not_invoiced': {
                backgroundColor: theme.palette.mode === 'light' ? '#ffe6c2' : '#9f6d46',
                color          : theme.palette.mode === 'light' ? 'rgba(207, 123, 0, 1)' : '#fff'
            },

            // '&.verified': {
            //     backgroundColor: theme.palette.mode === 'light' ? '#dff1df' : '#163b16',
            //     color          : theme.palette.mode === 'light' ? '#067d06' : '#fff'
            // },
            // '&.sent': {
            //     backgroundColor: theme.palette.mode === 'light' ? '#dff1df' : '#dff1df',
            //     color          : theme.palette.mode === 'light' ? '#044804' : '#044804'
            // },
            // '&.paid': {
            //     backgroundColor: theme.palette.mode === 'light' ? '#c3eac3' : '#639863',
            //     color          : theme.palette.mode === 'light' ? '#044804' : '#fff'
            // },
            '&.inactive': {
                backgroundColor: theme.palette.mode === 'light' ? '#eaeaea' : '#eaeaea',
                color          : theme.palette.mode === 'light' ? '#484848de' : '#484848de'
            },
            '&.active, &.invoiced': {
                backgroundColor: theme.palette.mode === 'light' ? '#e5eef7' : '#0E1E48',
                color          : theme.palette.mode === 'light' ? '#46597d' : '#adc3f6'
            },
            '&.attached': {
                backgroundColor: theme.palette.mode === 'light' ? '#e5eef7' : '#0E1E48',
                color          : theme.palette.mode === 'light' ? '#46597d' : '#adc3f6'
            },
            '&.active': {
                backgroundColor: theme.palette.mode === 'light' ? '#e5eef7' : '#0E1E48',
                color          : theme.palette.mode === 'light' ? '#46597d' : '#adc3f6'
            },
            '&.deleted, &.rejected': {
                backgroundColor: theme.palette.mode === 'light' ? '#ffdde0' : '#441a2a',
                color          : theme.palette.mode === 'light' ? '#a51313' : '#FFF'
            },
            '&.pending_termination': {
                backgroundColor: theme.palette.mode === 'light' ? '#ffdde0' : '#441a2a',
                color          : theme.palette.mode === 'light' ? '#a51313' : '#FFF'
            },
            '&.terminated': {
                backgroundColor: theme.palette.mode === 'light' ? '#ffdde0' : '#441a2a',
                color          : theme.palette.mode === 'light' ? '#a51313' : '#FFF'
            }
        },
        '.regular-row': {
            '.invalid': {
                backgroundColor: theme.palette.mode === 'light' ? '#ffdde0' : '#441a2a',
                borderTop      : `2px solid ${theme.palette.mode === 'light' ? '#ff9393' : '#ff9393'}`,
                color          : theme.palette.mode === 'light' ? '#a51313' : '#FFF',
                fontWeight     : 600
            },
            '.expiring': {
                backgroundColor: theme.palette.mode === 'light' ? '#ffe8c0' : '#291f08',
                fontWeight     : 600,
                color          : theme.palette.mode === 'light' ? '#b26d00' : '#b26d00'
            },
            '.checkbox': {
                color: theme.palette.mode === 'light' ? 'rgba(58, 53, 65, 0.3)' : 'inherit'
            }
        },
        '.notes': {
            '&__bold-font': {
                fontWeight: 600
            },
            '&__list': {
                padding  : 0,
                margin   : 0,
                '&__item': {
                    lineHeight: '1.25',
                    margin    : 0,

                    // whiteSpace : 'pre-line',
                    '&-wrapper': {
                        display       : 'flex',
                        alignItems    : 'center',
                        justifyContent: 'flex-start'
                    },
                    '&+&': {
                        marginTop: '10px'
                    },
                    '&::marker': {
                        content: 'none'
                    },
                    '&__text': {
                        marginRight: '3px',
                        marginLeft : '0px'
                    }
                }
            },
            '&__field': {
                fontStyle     : 'italic',
                fontWeight    : 400,
                textDecoration: ''
            },
            '&__icon-box': {
                verticalAlign: 'middle',
                display      : 'inline-block'
            }
        },
        '.calendly-popup': {
            maxHeight: 'unset !important'
        },
        '.os-scrollbar': {
            '--os-handle-border-radius' : '3px',
            '--os-size'                 : '12px',
            '--os-padding-perpendicular': '3px',
            '--os-padding-axis'         : '4px',
            '--os-handle-bg-hover'      : theme.palette.semantic.foreground.six,
            '--os-handle-bg-active'     : theme.palette.semantic.foreground.six,
            '--os-handle-bg'            : theme.palette.semantic.foreground.six
        }
    };
};

export default GlobalStyles;
