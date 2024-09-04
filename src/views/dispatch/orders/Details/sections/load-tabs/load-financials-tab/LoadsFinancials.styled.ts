import { styled } from '@mui/material/styles';
import DividerMui from '@mui/material/Divider';

const TotalBoxStyled = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    gap            : '8px',
    width          : '200px',
    backgroundColor: theme.palette.semantic.foreground.brand.secondary,
    borderRadius   : '0px 0px 8px 8px',
    padding        : '8px 12px',

    '& div': {
        display       : 'flex',
        justifyContent: 'space-between',
        alignItems    : 'center',
        gap           : '4px'
    }
}));

const Container = styled('div')({
    padding: '16px 8px'
});

const Divider = styled(DividerMui)(({ theme }) => ({
    // margin           : '4px -8px 16px -8px',
    margin           : 0,
    borderColor      : theme.palette.semantic.background.secondary,
    borderBottomWidth: '8px'
}));

const LoadsFinancialsStyled = {
    TotalBoxStyled,
    Container,
    Divider
};

export default LoadsFinancialsStyled;
