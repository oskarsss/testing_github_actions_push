import { styled, Theme } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius: '8px',

    flex: 1,

    boxSizing   : 'content-box',
    marginBottom: '24px',
    overflow    : 'auto'
}));
export const Header = styled('div')(({ theme }) => ({
    display     : 'flex',
    position    : 'sticky',
    top         : 0,
    zIndex      : 5,
    borderBottom: `1px solid ${theme.palette.semantic.border.secondary}`
}));

export const WrapRegularHead = styled('div')(({ theme }) => ({
    display   : 'flex',
    minWidth  : '100%',
    background: theme.palette.semantic.foreground.secondary
}));

export const WrapStickyHead = styled('div')(({ theme }) => ({
    display    : 'flex',
    position   : 'sticky',
    left       : 0,
    zIndex     : 4,
    boxShadow  : 'rgb(0 0 0 / 21%) 2px 0px 4px -2px',
    borderRight: `1px solid ${theme.palette.semantic.border.secondary}`
}));
export const HeaderCell = styled('div')(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    padding   : '6px 12px',
    background: theme.palette.semantic.foreground.secondary,
    cursor    : 'pointer',
    p         : {
        margin       : 0,
        fontWeight   : 600,
        fontSize     : '12px',
        lineHeight   : 1.43,
        letterSpacing: '0.17px',
        color        : theme.palette.semantic.text.primary,
        textAlign    : 'start'
    }
}));

const getBackgroundColor = (theme: Theme) =>
    theme.palette.mode === 'light' ? '#FEF3F2' : '#f84b511a';

export const BodyCell = styled('div')<{ width: number; error?: boolean }>(
    ({
        theme,
        width,
        error = false
    }) => ({
        width,
        minWidth       : width,
        maxWidth       : width,
        height         : '40px',
        padding        : '6px 12px',
        fontSize       : '12px',
        lineHeight     : '166%',
        textAlign      : 'start',
        letterSpacing  : '0.4px',
        backgroundColor: error ? getBackgroundColor(theme) : 'inherit',
        cursor         : error ? 'pointer' : 'inherit',
        display        : 'flex',
        alignItems     : 'center'
    })
);

export const WrapStickyBody = styled('div')<{ width: number }>(({
    theme,
    width
}) => ({
    width,
    minWidth   : width,
    maxWidth   : width,
    display    : 'flex',
    position   : 'sticky',
    left       : 0,
    zIndex     : 4,
    overflow   : 'hidden',
    boxShadow  : 'rgb(0 0 0 / 21%) 2px 0px 4px -2px',
    borderRight: `1px solid ${theme.palette.semantic.border.secondary}`
}));

export const Row = styled('div')(({ theme }) => ({
    display     : 'flex',
    borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? theme.palette.semantic.border.secondary : '#000'
    }`,
    cursor                    : 'pointer',
    '&:nth-of-type(odd) > div': {
        background: theme.palette.semantic.foreground.six
    },
    '&:nth-of-type(even) > div': {
        background: theme.palette.semantic.foreground.white.primary
    }
}));
