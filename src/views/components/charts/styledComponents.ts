import { styled } from '@mui/material/styles';

// eslint-disable-next-line import/prefer-default-export
export const InfoBlock = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    width        : '160px',
    minWidth     : '160px',
    height       : '146px',
    background   : theme.palette.semantic.background.secondary,
    border       : `2px solid ${
        theme.palette.mode === 'light' ? '#e7eef6' : theme.palette.semantic.border.secondary
    }`,

    // boxShadow    : '4px 4px 16px rgba(117, 135, 170, 0.2)',
    // marginTop   : '24px',
    borderRadius: '16px',

    div: {
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        width         : '100%',
        height        : '54px',
        background:
            theme.palette.mode === 'light' ? '#fff' : theme.palette.semantic.background.secondary,
        color        : theme.palette.semantic.text.secondary,
        borderRadius : '14px 14px 0px 0px',
        fontWeight   : 600,
        fontSize     : '16px',
        lineHeight   : '160%',
        letterSpacing: '0.15px'
    },

    span: {
        fontWeight   : 700,
        fontSize     : '32px',
        lineHeight   : '123.5%',
        textAlign    : 'center',
        letterSpacing: '0.25px',
        marginTop    : '26px'
    }
}));
