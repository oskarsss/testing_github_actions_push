import { styled } from '@mui/material/styles';
import { List } from '@mui/material';

const Wrapper = styled('div')({
    position : 'relative',
    width    : 600,
    padding  : '25px 25px 20px',
    minHeight: 'fit-content'
});

const Header = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    padding       : '0 0 10px'
}));

const ListOptions = styled(List)(({ theme }) => ({
    cursor: 'pointer',
    li    : {
        padding       : '8px',
        borderBottom  : `1px solid ${theme.palette.semantic.border.secondary}`,
        '&:last-child': {
            borderBottom: 'none'
        },
        '&:focus': {
            outline        : 'none',
            backgroundColor: theme.palette.semantic.foreground.brand.tertiary
        }
    }
}));

const AssignComponentStyled = {
    Wrapper,
    Header,
    ListOptions
};

export default AssignComponentStyled;
