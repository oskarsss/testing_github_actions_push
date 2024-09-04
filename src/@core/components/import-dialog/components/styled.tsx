import { styled } from '@mui/material/styles';
import MuiTabs from '@mui/material/Tabs';
import MuiTab from '@mui/material/Tab';

export const TabsContainer = styled('div')(() => ({
    position: 'relative',
    width   : '1122px',
    margin  : '0 auto 50px',
    order   : 1,
    h5      : {
        fontWeight: 600,
        fontSize  : '20px',
        margin    : '0 0 24px'
    }
}));
export const Tabs = styled(MuiTabs)(({ theme }) => ({
    '&.MuiTabs-root': {
        borderWidth : 1,
        borderColor : theme.palette.semantic.border.secondary,
        borderStyle : 'solid',
        borderRadius: 12,
        padding     : 2
    },
    '& .MuiTabs-indicator': {
        backgroundColor: 'transparent'
    }
}));
export const Tab = styled(MuiTab)(({ theme }) => ({
    textTransform: 'none',
    fontWeight   : 500,
    fontSize     : 16,
    color        : theme.palette.semantic.text.secondary,
    flexGrow     : 1,
    borderRadius : 10,
    borderWidth  : 2,
    borderStyle  : 'solid',
    borderColor  : 'transparent',
    minHeight    : 48,
    gap          : 16,
    transition   : 'all 250ms',

    '&.MuiTab-labelIcon': {
        fill      : theme.palette.mode === 'light' ? '#BDC7D2' : theme.palette.semantic.text.secondary,
        transition: 'fill 250ms',
        svg       : {
            path: {
                fill:
                    theme.palette.mode === 'light'
                        ? '#BDC7D2'
                        : theme.palette.semantic.text.secondary,
                transition: 'fill 250ms'
            }
        }
    },

    '&.Mui-selected': {
        backgroundColor: theme.palette.semantic.background.primary,
        borderColor:
            theme.palette.mode === 'light' ? '#E7EEF6' : theme.palette.semantic.background.primary,
        boxShadow : '4px 4px 16px rgba(117, 135, 170, 0.15)',
        fontWeight: 700,
        color:
            theme.palette.mode === 'light'
                ? theme.palette.semantic.foreground.brand.primary
                : theme.palette.semantic.text.secondary,

        '&.MuiTab-labelIcon': {
            fill:
                theme.palette.mode === 'light'
                    ? theme.palette.semantic.foreground.brand.primary
                    : theme.palette.semantic.text.secondary,
            svg: {
                path: {
                    fill:
                        theme.palette.mode === 'light'
                            ? theme.palette.semantic.foreground.brand.primary
                            : theme.palette.semantic.text.secondary
                }
            }
        }
    },

    '&:hover.MuiTab-labelIcon': {
        color:
            theme.palette.mode === 'light'
                ? theme.palette.semantic.foreground.brand.primary
                : theme.palette.semantic.foreground.brand.primary,
        fill:
            theme.palette.mode === 'light'
                ? theme.palette.semantic.foreground.brand.primary
                : theme.palette.semantic.foreground.brand.primary,
        svg: {
            path: {
                fill:
                    theme.palette.mode === 'light'
                        ? theme.palette.semantic.foreground.brand.primary
                        : theme.palette.semantic.foreground.brand.primary
            }
        }
    },

    '&.Mui-focusVisible': {
        backgroundColor: '#E7EEF6'
    }
}));

export const LoaderContainer = styled('div')(() => ({
    display       : 'flex',
    margin        : 'auto',
    alignItems    : 'center',
    justifyContent: 'center',
    order         : 3
}));

export const ErrorContainer = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'center',
    height       : '100%',
    width        : '100%',
    margin       : '50px auto 0',
    order        : 3,
    h2           : {
        width    : '70%',
        color    : theme.palette.utility.foreground.error.primary,
        textAlign: 'center',
        margin   : '0 auto 64px'
    },
    button: {
        margin: '0 auto'
    }
}));
