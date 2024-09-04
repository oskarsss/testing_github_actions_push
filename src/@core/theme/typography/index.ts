import { Theme } from '@mui/material';

const Typography = (theme: Theme) => ({
    h1: {
        fontWeight   : 500,
        letterSpacing: '-1.5px',
        color        : theme.palette.semantic.text.primary
    },
    h2: {
        fontWeight   : 500,
        letterSpacing: '-0.5px',
        color        : theme.palette.semantic.text.primary
    },
    h3: {
        fontWeight   : 500,
        letterSpacing: 0,
        color        : theme.palette.semantic.text.primary
    },
    h4: {
        fontWeight   : 500,
        letterSpacing: '0.25px',
        color        : theme.palette.semantic.text.primary
    },
    h5: {
        fontWeight   : 500,
        letterSpacing: 0,
        color        : theme.palette.semantic.text.primary
    },
    h6: {
        letterSpacing: '0.15px',
        color        : theme.palette.semantic.text.primary
    },
    subtitle1: {
        letterSpacing: '0.15px',
        color        : theme.palette.semantic.text.primary
    },
    subtitle2: {
        letterSpacing: '0.1px',
        color        : theme.palette.semantic.text.secondary
    },
    body1: {
        letterSpacing: '0.15px',
        color        : theme.palette.semantic.text.primary
    },
    body2: {
        lineHeight   : 1.5,
        letterSpacing: '0.15px',
        color        : theme.palette.semantic.text.secondary
    },
    button: {
        letterSpacing: '0.3px',
        color        : theme.palette.semantic.text.primary
    },
    caption: {
        letterSpacing: '0.4px',
        color        : theme.palette.semantic.text.secondary
    },
    overline: {
        letterSpacing: '1px',
        color        : theme.palette.semantic.text.secondary
    }
});

export default Typography;
