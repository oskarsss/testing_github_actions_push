import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import themeConfig from '@/configs/themeConfig';
import MuiList from '@mui/material/List';

const MenuItemTextMetaWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isSubToSub' && prop !== 'isCollapsed'
})<{
    isSubToSub?: boolean;
    isCollapsed?: boolean;
}>(({
    isSubToSub,
    isCollapsed
}) => ({
    width         : '100%',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    transition    : 'opacity .25s ease-in-out',
    opacity       : isCollapsed ? 0 : 1,
    ...(themeConfig.menuTextTruncate && { overflow: 'hidden' }),
    ...(isSubToSub && { marginLeft: 36 })
}));

const Text = styled('p')(() => ({
    margin       : 0,
    fontWeight   : 500,
    fontSize     : 14,
    lineHeight   : 1.25,
    letterSpacing: '0.15px',
    whiteSpace   : 'nowrap',
    maxWidth     : 120,
    overflow     : 'hidden',
    span         : {
        fontWeight: 700,
        fontSize  : 12
    }
}));

const HeaderUnderline = styled(Box)(({ theme }) => ({
    top          : 70,
    zIndex       : 2,
    height       : 2,
    position     : 'absolute',
    pointerEvents: 'none',
    width        : '100%',
    background   : theme.palette.semantic.border.secondary
}));

const NavContainer = styled(Box)({
    position: 'relative',
    overflow: 'hidden',
    height  : '100%'
});

const Wrap = styled('div')({
    height        : '100%',
    display       : 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between'
});

const List = styled(MuiList)({
    transition: 'padding .25s ease',
    padding   : '0 0 8px 0'
});

const NavigationStyled = {
    MenuItemTextMetaWrapper,
    Text,
    HeaderUnderline,
    NavContainer,
    Wrap,
    List
};

export default NavigationStyled;
