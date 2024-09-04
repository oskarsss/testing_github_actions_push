import { styled } from '@mui/material/styles';

export const Container = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    width         : '100%',
    height        : '100%',
    justifyContent: 'center',
    flexDirection : 'column',
    overflow      : 'hidden',
    flexGrow      : 1
});

export const Title = styled('p')(({ theme }) => ({
    margin    : '12px 0 0 4px',
    color     : theme.palette.semantic.text.primary,
    textAlign : 'center',
    fontSize  : '16px',
    fontWeight: 600,
    lineHeight: 1.5
}));

export const Desc = styled('p')(({ theme }) => ({
    margin    : 0,
    color     : theme.palette.semantic.text.secondary,
    textAlign : 'center',
    fontSize  : '12px',
    lineHeight: 1.4,
    width     : '200px'
}));
