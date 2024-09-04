import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

const Container = styled('div')({
    width         : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : '12px'
});

const Wrapper = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : 'inherit'
});

const Button = styled(LoadingButton)(({ theme }) => ({
    padding     : '2px 16px',
    fontWeight  : 500,
    fontSize    : 16,
    borderRadius: '8px',
    height      : '36px',
    minWidth    : 'auto',
    borderColor : theme.palette.semantic.foreground.brand.primary
}));

const Title = styled('h6')(({ theme }) => ({
    fontWeight: 700,
    fontSize  : 24,
    lineHeight: 1.5,
    margin    : 0,
    color     : theme.palette.semantic.text.primary,
    whiteSpace: 'nowrap'
}));

const LoadHeaderStyled = {
    Container,
    Wrapper,
    Button,
    Title
};

export default LoadHeaderStyled;
