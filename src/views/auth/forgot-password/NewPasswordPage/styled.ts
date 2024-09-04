import { styled } from '@mui/material/styles';
import Link from 'next/link';

const Wrap = styled('div')({
    padding : '40px 10px 10px',
    maxWidth: 470,

    '@media screen and (min-width: 600px)': {
        paddingTop: '12vh'
    }
});

const ContainerLogo = styled('div')({
    marginBottom: 40,

    '@media screen and (min-width: 600px)': {
        marginBottom: 71
    }
});

const Title = styled('h5')(({ theme }) => ({
    margin: '0 0 24px',

    fontWeight   : 500,
    fontSize     : 34,
    lineHeight   : 1.23,
    letterSpacing: 0.25,
    color        : theme.palette.semantic.text.primary,

    span: {
        fontWeight: 600
    },

    '@media screen and (min-width: 600px)': {
        width: 'auto'
    }
}));

const Description = styled('p')(({ theme }) => ({
    width       : '100%',
    margin      : 0,
    marginBottom: 40,

    fontSize     : 14,
    lineHeight   : 1.6,
    letterSpacing: 0.17,

    color: theme.palette.semantic.text.secondary // '#525164'
}));

const LinkStyled = styled(Link)(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    width     : 120,

    fontWeight    : 400,
    fontSize      : 14,
    lineHeight    : 1.66,
    letterSpacing : 0.4,
    textDecoration: 'none',

    color: theme.palette.semantic.foreground.brand.primary
}));

const Form = styled('form')({
    marginBottom: 24
});

const ContainerError = styled('div')(({ theme }) => ({
    marginBottom: 14,

    p: {
        margin     : 0,
        paddingLeft: '1rem',
        width      : '100%',

        fontSize: 14,
        color   : theme.palette.utility.foreground.error.primary
    }
}));

const ContainerSuccess = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',

    p: {
        marginLeft: 20
    }
});

const NewPasswordPageStyled = {
    Wrap,
    ContainerLogo,
    Title,
    Description,
    LinkStyled,
    Form,
    ContainerError,
    ContainerSuccess
};

export default NewPasswordPageStyled;
