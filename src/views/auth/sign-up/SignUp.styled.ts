import { styled } from '@mui/material/styles';
import NewPasswordPageStyled from '@/views/auth/forgot-password/NewPasswordPage/styled';

const Wrap = styled('div')({
    padding: '40px 10px 10px',

    '@media screen and (min-width: 480px)': {
        width: 480
    },
    '@media screen and (min-width: 768px)': {
        paddingTop: '8vh',
        width     : 598
    }
});

const ContainerLogo = styled('div')({
    marginBottom: 22
});

const Title = styled(NewPasswordPageStyled.Title)({
    maxWidth: 300,
    margin  : '0 0 2px',

    '@media screen and (min-width: 768px)': {
        maxWidth: 'none'
    }
});

const BottomText = styled('p')(({ theme }) => ({
    margin       : '20px 0 0',
    fontSize     : 14,
    lineHeight   : 1.43,
    letterSpacing: 0.17,
    textAlign    : 'center',
    color        : '#8b8d92',

    a: {
        marginLeft    : 8,
        lineHeight    : 1.66,
        letterSpacing : 0.4,
        textDecoration: 'none',
        color         : theme.palette.semantic.foreground.brand.primary
    }
}));

const ContainerTwoInputs = styled('div')(() => ({
    marginBottom: 16,

    '@media screen and (min-width: 768px)': {
        display       : 'flex',
        justifyContent: 'space-between'
    }
}));

const Dot = styled('div')(() => ({
    display: 'flex',

    marginTop   : 16,
    marginBottom: 16
}));

const DotInfo = styled('p')(() => ({
    fontSize     : 12,
    lineHeight   : 1.28,
    letterSpacing: 0.17,
    color        : '#525164',

    height: 56,
    margin: '0 0 0 20px',

    '@media screen and (min-width: 768px)': {
        fontSize: 14,
        margin  : '0 0 0 32px'
    }
}));

const TextError = styled('p')(({ theme }) => ({
    margin     : 0,
    paddingLeft: '1rem',
    width      : '100%',

    fontSize: 14,
    color   : theme.palette.utility.foreground.error.primary
}));

const SingUpStyled = {
    Wrap,
    ContainerLogo,
    Title,
    BottomText,
    ContainerTwoInputs,
    Dot,
    DotInfo,
    TextError
};

export default SingUpStyled;
