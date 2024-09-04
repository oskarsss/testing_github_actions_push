import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import { MenuList } from '@mui/material';

const List = styled(MenuList)(({ theme }) => ({
    padding        : 0,
    backgroundColor: theme.palette.semantic.background.white
}));

const MenuItemStyled = styled(MenuItem)(({ theme }) => ({
    padding   : '6px 16px 6px 29px',
    fontWeight: 500,
    fontSize  : '14px',
    height    : '36px',
    overflow  : 'hidden',
    '&:hover' : {
        backgroundColor: theme.palette.semantic.background.white
    }
}));

const HeaderMenuStyled = {
    List,
    MenuItemStyled
};

export default HeaderMenuStyled;
