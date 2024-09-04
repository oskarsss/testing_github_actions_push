import { Stack, Typography, styled } from '@mui/material';

const ArticleWrapper = styled(Stack)(({ theme }) => ({
    padding     : '16px',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius: '8px',
    background  : theme.palette.semantic.foreground.white.tertiary
}));

const Icon = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    width         : '40px',
    height        : '40px',
    border        : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius  : '8px',
    svg           : {
        width : '24px !important',
        height: '24px !important'
    }
}));

const Text = styled(Typography)(({ theme }) => ({
    variant: 'body1',
    color  : theme.palette.semantic.text.disabled
}));

const BorderConnectStyled = {
    ArticleWrapper,
    Icon,
    Text
};

export default BorderConnectStyled;
