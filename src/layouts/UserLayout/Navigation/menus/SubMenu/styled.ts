import { styled } from '@mui/material/styles';
import { Button, MenuItem, MenuList } from '@mui/material';
import MuiMenu from '@mui/material/Menu';

const SecondMenuContainer = styled('div')({
    paddingLeft : '223px',
    position    : 'fixed',
    top         : 170,
    left        : 0,
    overflow    : 'hidden',
    borderRadius: '8px',
    display     : 'flex'
});
const SecondMenu = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    justifyContent : 'center',
    alignItems     : 'center',
    gap            : 8,
    width          : '100%',
    border         : `2px solid ${theme.palette.semantic.background.white}`,
    boxShadow      : theme.palette.mode === 'light' ? '5px 4px 20px rgba(151, 161, 173, 0.15)' : 'none',
    borderRadius   : '8px',
    backgroundColor: theme.palette.semantic.background.primary,
    overflow       : 'hidden',
    flex           : 1
}));

const Company = styled(MenuItem)(({ theme }) => ({
    backgroundColor: theme.palette.semantic.background.white,
    height         : '48px',
    borderRadius   : '8px',
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'space-between',
    padding        : '12px',

    '&:hover, &:focus': {
        backgroundColor: theme.palette.semantic.foreground.brand.secondary
    },
    '& p': {
        margin       : 0,
        fontSize     : '12px',
        fontWeight   : 500,
        textTransform: 'capitalize',
        color        : theme.palette.semantic.text.primary,
        whiteSpace   : 'nowrap',
        overflow     : 'hidden',
        maxWidth     : '130px'
    }
}));
const AddNewCompanyWrapper = styled('div')({
    margin: '0 4px 4px'
});
const AddNewCompany = styled(Button)(({ theme }) => ({
    textTransform: 'capitalize',
    color        : 'inherit',
    fontWeight   : 500,
    fontSize     : '12px',
    lineHeight   : 0,
    width        : '100%',
    borderColor  : theme.palette.semantic.border.secondary,
    background   : theme.palette.semantic.background.white
}));
const Companies = styled(MenuList)(({ theme }) => ({
    padding               : '4px 4px 0',
    width                 : '100%',
    display               : 'flex',
    flexDirection         : 'column',
    gap                   : 4,
    maxHeight             : '400px',
    overflow              : 'auto',
    '&::-webkit-scrollbar': {
        width  : '6px !important',
        height : '6px !important',
        opacity: ' 1 !important'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${theme.palette.semantic.actions.foreground.gray.secondary} !important`,
        borderRadius   : '16px !important',
        width          : '4px !important'
    }
}));

const Menu = styled(MuiMenu)(() => ({
    '& .MuiPaper-root': {
        padding        : '4px 0',
        height         : '152px',
        minWidth       : '206px',
        minHeight      : '152px',
        overflow       : 'hidden',
        transition     : 'opacity 100ms linear !important',
        transformOrigin: 'inherit !important',
        transform      : 'none !important'
    },
    '.MuiList-root': {
        maxHeight: '144px',
        overflow : 'hidden',
        padding  : 0
    }
}));

const WrapLogo = styled('div')(() => ({
    width      : 24,
    height     : 24,
    marginRight: '12px'
}));

const CompanyInfo = styled('div')(() => ({
    display   : 'flex',
    alignItems: 'center'
}));

const MenuStyled = {
    SecondMenuContainer,
    SecondMenu,
    Company,
    AddNewCompany,
    AddNewCompanyWrapper,
    Companies,
    Menu,
    WrapLogo,
    CompanyInfo
};

export default MenuStyled;
