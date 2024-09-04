/* eslint-disable no-nested-ternary */

import { styled, lighten } from '@mui/material';
import MuiButton from '@mui/material/Button';

const colors = {
    progress : '#244DA6',
    cancelled: '#B70000',
    completed: '#1B945C'
};

export const Container = styled('div')(() => ({
    flexShrink    : 0,
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    width         : '100%',
    height        : '40px',
    gap           : '16px'
}));

export const ProgressBarContainer = styled('div')(({ theme }) => ({
    borderRadius: '8px',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    overflow    : 'hidden',
    height      : '40px',
    flexGrow    : 1
}));

type ProgressBarItemProps = {
    is_completed: boolean;
    is_progress: boolean;
    is_cancelled: boolean;
    isSelected?: boolean;
};

function getColor({
    is_completed,
    is_progress,
    is_cancelled,
    isSelected
}: ProgressBarItemProps) {
    if (is_completed) {
        return colors.completed;
    }

    if (is_progress) {
        return colors.progress;
    }

    if (is_cancelled) {
        return colors.cancelled;
    }
    return '';
}

export const ProgressBarItem = styled('div')<ProgressBarItemProps>(
    ({
        theme,
        is_progress,
        is_cancelled,
        is_completed,
        isSelected
    }) => ({
        display       : 'flex',
        height        : '100%',
        alignItems    : 'center',
        justifyContent: 'center',
        padding       : '0 20px',
        flex          : '1 1 0',
        position      : 'relative',
        cursor        : 'pointer',
        gap           : '8px',
        color:
            is_progress || is_completed || is_cancelled
                ? '#fff'
                : theme.palette.semantic.foreground.quarterary,

        '& .arrowRight': {
            svg: {
                color: theme.palette.semantic.background.white,
                stroke:
                    getColor({
                        is_completed,
                        is_progress,
                        is_cancelled
                    }) || theme.palette.semantic.border.secondary,

                ...(is_progress || is_completed || is_cancelled
                    ? {
                        color: theme.palette.utility.foreground[
                            is_completed ? 'success' : is_progress ? 'blue_dark' : 'error'
                        ].primary
                    }
                    : {}),
                ...(isSelected
                    ? {
                        color: theme.palette.semantic.foreground.brand.primary
                    }
                    : {})
            }
        },

        ...(is_progress || is_completed || is_cancelled
            ? {
                backgroundColor:
                      theme.palette.utility.foreground[
                          is_completed ? 'success' : is_progress ? 'blue_dark' : 'error'
                      ].primary
            }
            : {}),

        '&:hover': {
            backgroundColor: isSelected
                ? theme.palette.semantic.foreground.brand.primary
                : getColor({
                    is_completed,
                    is_progress,
                    is_cancelled
                }) || theme.palette.semantic.background.primary,

            '& .arrowRight': {
                svg: {
                    color: isSelected
                        ? theme.palette.semantic.foreground.brand.primary
                        : getColor({
                            is_completed,
                            is_progress,
                            is_cancelled
                        }) || theme.palette.semantic.background.primary
                }
            }
        },
        ...(isSelected && {
            backgroundColor: theme.palette.semantic.foreground.brand.primary,
            animation      : 'selected 2s ease-in-out infinite',
            '& .arrowRight': {
                svg: {
                    color    : theme.palette.semantic.foreground.brand.primary,
                    animation: 'selectedSvg 2s ease-in-out infinite'
                }
            }
        }),
        '@keyframes selected': {
            '0%': {
                backgroundColor: theme.palette.semantic.foreground.brand.primary
            },
            '50%': {
                backgroundColor: lighten(theme.palette.semantic.foreground.brand.primary, 0.2)
            },
            '100%': {
                backgroundColor: theme.palette.semantic.foreground.brand.primary
            }
        },
        '@keyframes selectedSvg': {
            '0%': {
                color: theme.palette.semantic.foreground.brand.primary
            },
            '50%': {
                color: lighten(theme.palette.semantic.foreground.brand.primary, 0.2)
            },
            '100%': {
                color: theme.palette.semantic.foreground.brand.primary
            }
        }
    })
);

const ProgressBarContent = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'flex-start',
    gap           : '4px',
    height        : '100%',
    minWidth      : '150px'
});

type IconContainerProps = {
    is_icon: boolean;
    isSelected?: boolean;
};

const IconContainer = styled('div')<IconContainerProps>(({
    theme,
    is_icon,
    isSelected
}) => ({
    width          : '32px',
    height         : '32px',
    flexShrink     : 0,
    fontSize       : '18px',
    fontWeight     : 600,
    lineHeight     : 1.2,
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    borderRadius   : '50%',
    color          : isSelected ? '#000' : theme.palette.semantic.text.white,
    backgroundColor: is_icon || isSelected ? '#fff' : theme.palette.semantic.foreground.tertiary
}));

const Wrapper = styled('div')<{ hasIcon?: boolean; isSelected?: boolean }>(
    ({
        theme,
        hasIcon,
        isSelected
    }) => ({
        display      : 'flex',
        flexDirection: 'column',
        gap          : '0px',

        p: {
            margin    : 0,
            fontSize  : '14px',
            fontWeight: 600,
            lineHeight: 1.2,
            textWrap  : 'nowrap',
            ...(!hasIcon && {
                color: theme.palette.semantic.text.primary
            }),
            ...(isSelected && {
                color: '#fff'
            })
        },
        span: {
            fontSize  : '12px',
            fontWeight: 500,
            lineHeight: 1.3,
            marginTop : '-2px',
            textWrap  : 'nowrap',
            ...(!hasIcon && {
                color: theme.palette.semantic.text.secondary
            }),
            ...(isSelected && {
                color: '#fff'
            })
        }
    })
);

const Button = styled(MuiButton)(({ theme }) => ({
    whiteSpace  : 'nowrap',
    height      : '100%',
    borderRadius: '8px',
    borderColor : theme.palette.semantic.foreground.brand.primary,
    fontSize    : '16px',
    fontWeight  : 500,
    padding     : '0 16px'
}));

const Content = styled('div')({
    display   : 'flex',
    alignItems: 'stretch',
    height    : '100%'
});

const ManifestStopsProgressBarStyled = {
    Container,
    ProgressBarContainer,
    ProgressBarItem,
    ProgressBarContent,
    IconContainer,
    Wrapper,
    Button,
    Content
};

export default ManifestStopsProgressBarStyled;
