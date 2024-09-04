import { styled } from '@mui/material/styles';
import Link from 'next/link';

const Wrapper = styled('div')(() => ({
    padding                               : '40px 10px 10px',
    maxWidth                              : 470,
    overflow                              : 'hidden',
    transition                            : 'all 0.2s ease',
    '@media screen and (min-width: 600px)': {
        paddingTop: '12vh'
    },
    '& > :first-of-type': {
        marginBottom                          : 40,
        '@media screen and (min-width: 600px)': {
            marginBottom: 71
        }
    }
}));

const LinkStyled = styled(Link)(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    width         : 120,
    fontWeight    : 400,
    fontSize      : 14,
    lineHeight    : 1.66,
    letterSpacing : 0.4,
    textDecoration: 'none',
    cursor        : 'pointer',
    color         : theme.palette.semantic.text.brand.primary
}));

const SpanStyled = styled('span')(({ theme }) => ({
    cursor: 'pointer',
    color : theme.palette.semantic.text.brand.primary
}));

const SendLinkPageStyled = {
    Wrapper,
    LinkStyled,
    SpanStyled
};

export default SendLinkPageStyled;
