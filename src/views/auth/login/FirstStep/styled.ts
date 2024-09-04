import { styled } from '@mui/material/styles';

const Title = styled('h5')(({ theme }) => ({
    margin       : 0,
    marginBottom : 24,
    fontWeight   : 500,
    fontSize     : 34,
    lineHeight   : 1.23,
    letterSpacing: 0.25,
    color        : theme.palette.mode === 'light' ? '#000000' : '#fff'
}));

const Description = styled('p')(({ theme }) => ({
    margin       : 0,
    marginBottom : 40,
    fontSize     : 14,
    lineHeight   : 1.6,
    letterSpacing: 0.17,
    color        : theme.palette.mode === 'light' ? '#525164' : '#fff'
}));

const Form = styled('form')(({ theme }) => ({
    marginBottom: 24,
    '.block'    : {
        marginBottom  : 23,
        display       : 'flex',
        justifyContent: 'flex-end',
        a             : {
            fontWeight    : 400,
            fontSize      : 14,
            lineHeight    : 1.66,
            letterSpacing : 0.4,
            textDecoration: 'none',
            color         : theme.palette.mode === 'light' ? '#285ff6' : '#3269ff'
        }
    },
    '.containerError': {
        marginBottom: 14
    }
}));

const TextError = styled('p')(() => ({
    margin     : 0,
    paddingLeft: '1rem',
    width      : '100%',
    fontSize   : 14,
    color      : '#ff4c51'
}));

const Bottom = styled('p')(({ theme }) => ({
    margin       : 0,
    fontSize     : 14,
    lineHeight   : 1.43,
    letterSpacing: 0.17,
    textAlign    : 'center',
    color        : theme.palette.mode === 'light' ? '#8b8d92' : '#fff',
    a            : {
        marginLeft    : 8,
        lineHeight    : 1.66,
        letterSpacing : 0.4,
        textDecoration: 'none',
        color         : theme.palette.semantic.text.brand.primary
    }
}));

const FirstStepStyled = {
    Title,
    Description,
    Form,
    TextError,
    Bottom
};

export default FirstStepStyled;
