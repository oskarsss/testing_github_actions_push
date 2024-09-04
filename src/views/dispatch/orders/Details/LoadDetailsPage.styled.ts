import { styled } from '@mui/material/styles';

const Wrapper = styled('div')(({ theme }) => ({
    height    : '100%',
    overflow  : 'hidden',
    display   : 'flex',
    background: theme.palette.semantic.background.white
}));

const LoadDetailsStyled = {
    Wrapper
};

export default LoadDetailsStyled;
