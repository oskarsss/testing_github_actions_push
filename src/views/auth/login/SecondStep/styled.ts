import { styled } from '@mui/material/styles';

const Bottom = styled('div')(() => ({
    position             : 'relative',
    display              : 'flex',
    alignItems           : 'center',
    justifyContent       : 'space-between',
    '.MuiButtonBase-root': {
        width     : '49%',
        height    : 42,
        fontWeight: 600
    }
}));

const ButtonBack = styled('button')(({ theme }) => ({
    display        : 'flex',
    alignItems     : 'center',
    padding        : 0,
    backgroundColor: 'transparent',
    outline        : 'none',
    border         : 'none',
    fontWeight     : 400,
    fontSize       : 14,
    lineHeight     : 1.66,
    letterSpacing  : '0.4px',
    textDecoration : 'none',
    cursor         : 'pointer',
    color          : theme.palette.mode === 'light' ? '#285ff6' : '#3269ff'
}));

const Form = styled('form')(() => ({
    marginBottom        : 24,
    '& > :first-of-type': {
        marginBottom: 14
    }
}));

const SecondStepStyled = {
    Bottom,
    ButtonBack,
    Form
};

export default SecondStepStyled;
