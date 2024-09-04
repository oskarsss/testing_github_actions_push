import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    gap          : 8,
    minHeight    : 180,
    width        : '100%',
    paddingTop   : 4,

    h5: {
        fontSize  : 18,
        fontWeight: 600,
        lineHeight: '150%',
        margin    : 0
    },

    p: {
        margin       : 0,
        fontSize     : 14,
        lineHeight   : '166%',
        letterSpacing: 0.4,
        color        : theme.palette.semantic.text.secondary
    }
}));

export const ContainerSelections = styled('div')({
    '.MuiFormControlLabel-root': {
        width      : 'calc(100% / 3)',
        marginRight: 0
    }
});
