import { styled } from '@mui/material/styles';

type ContainerProps = {
    width: number;
};

export const Container = styled('div')<ContainerProps>(({
    theme,
    width
}) => ({
    width,
    minWidth  : width,
    maxWidth  : width,
    position  : 'relative',
    height    : '100%',
    boxSizing : 'border-box',
    borderLeft: `1px solid ${theme.palette.semantic.border.secondary}`,
    ...(theme.palette.isLight && {
        backgroundColor: '#f7f7f7'
    }),

    '&:first-of-type': {
        borderLeft: 'none'
    }
}));

export const Indicator = styled('div')(({ theme }) => ({
    position  : 'absolute',
    width     : '2px',
    height    : '100%',
    background: theme.palette.semantic.foreground.brand.primary,
    zIndex    : 1,
    '&:before': {
        content   : '""',
        position  : 'absolute',
        left      : '-100px',
        background: `linear-gradient(90deg, rgba(255,255,255,0) 0%, ${theme.palette.semantic.foreground.brand.primary} 100%)`,
        opacity   : 0.1,
        height    : '100%',
        width     : '100px',
        display   : 'block'
    }
}));
