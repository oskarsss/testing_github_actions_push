import { styled } from '@mui/material/styles';
import MuiListItem from '@mui/material/ListItem';
import MuiListItemButton from '@mui/material/ListItemButton';
import MuiListItemIcon from '@mui/material/ListItemIcon';
import MuiTypography from '@mui/material/Typography';
import MuiBox from '@mui/material/Box';
import MuiCollapse from '@mui/material/Collapse';
import ChevronRight from 'mdi-material-ui/ChevronRight';
import themeConfig from '@/configs/themeConfig';

type NavCollapsedProps = {
    nav_collapsed: boolean;
};

const ListItem = styled(MuiListItem, {
    shouldForwardProp: (prop) => prop !== 'nav_collapsed'
})<NavCollapsedProps>(({
    theme,
    nav_collapsed
}) => ({
    px           : '0 !important',
    flexDirection: 'column',
    minHeight    : 48,
    overflow     : 'hidden',
    zIndex       : 20,

    '& .MuiTouchRipple-root': {
        opacity: nav_collapsed ? 0 : 1
    },

    '&:hover': {
        zIndex: 21,
        height: 'auto',

        '.sub-menu': {
            display: 'block !important',
            opacity: '1 !important'
        },

        '.MuiCollapse-root': {
            display: 'block'
        },

        '.ListItemBtn': {
            backgroundColor : theme.palette.semantic.foreground.secondary,
            '&.Mui-selected': {
                backgroundColor: theme.palette.semantic.foreground.brand.primary
            }
        }
    }
}));

const ListItemButton = styled(MuiListItemButton)(({ theme }) => ({
    width : '100%',
    height: 48,

    '&:hover': {
        backgroundColor: theme.palette.semantic.foreground.brand.primary,
        opacity        : 0.8
    },

    '&.Mui-selected': {
        backgroundColor: theme.palette.semantic.foreground.brand.primary,

        color: theme.palette.semantic.text.white,

        marginLeft: 0,

        '.MuiTypography-root, .MuiSvgIcon-fontSizeMedium': {
            color: theme.palette.semantic.text.white
        },
        '&:hover': {
            backgroundColor: theme.palette.semantic.foreground.brand.primary,
            opacity        : 0.8
        }
    },

    transition: 'padding .25s ease-in-out',

    padding: '5px auto 5px 16px',
    margin : 0,
    zIndex : 9
}));

const ListItemIcon = styled(MuiListItemIcon, {
    shouldForwardProp: (prop) =>
        prop !== 'isParent' && prop !== 'isCollapsed' && prop !== 'isChildren'
})<{
    isParent: boolean;
    isCollapsed: boolean;
    isChildren: boolean;
}>(({
    theme,
    isParent,
    isCollapsed,
    isChildren
}) => ({
    color     : theme.palette.semantic.text.primary,
    transition: 'margin .25s ease-in-out',
    ...(isParent && isCollapsed ? {} : { marginRight: 10 }),
    ...(isParent && isChildren ? { marginLeft: 5, marginRight: 15 } : {})
}));

const TypographyTitle = styled(MuiTypography, {
    shouldForwardProp: (prop) => prop !== 'is_active' && prop !== 'isCollapsed'
})<{
    is_active: boolean;
    isCollapsed: boolean;
}>(({
    theme,
    is_active,
    isCollapsed
}) => ({
    fontSize  : 14,
    fontWeight: is_active ? 700 : 500,
    color     : theme.palette.semantic.text.primary,
    ...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && isCollapsed)) && {
        whiteSpace  : 'nowrap',
        overflow    : 'hidden',
        textOverflow: 'ellipsis'
    })
}));

const Box = styled(MuiBox)({
    marginLeft: 0.8,
    display   : 'flex',
    alignItems: 'center'
});

const CollapseContainer = styled(MuiCollapse)(() => ({
    overflow   : 'visible',
    zIndex     : 23,
    paddingLeft: 0,
    width      : '100%',
    transition : 'all 250ms ease-in-out',
    position   : 'relative'
}));

const MenuItemTextWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'isCollapsed'
})<{ isCollapsed: boolean }>(({ isCollapsed }) => ({
    width         : '100%',
    display       : 'flex',
    justifyContent: 'space-between',
    transition    : 'opacity .25s ease-in-out',
    opacity       : isCollapsed ? 0 : 1
}));
const MenuGroupToggleRightIcon = styled(ChevronRight, {
    shouldForwardProp(propName) {
        return propName !== 'isGroupActive';
    }
})<{ isGroupActive: boolean }>(({
    theme,
    isGroupActive
}) => ({
    color     : theme.palette.semantic.text.secondary,
    transition: 'transform .25s ease-in-out',
    fontSize  : 20,
    ...(isGroupActive && { transform: 'rotate(90deg)' })
}));

const NavGroupStyled = {
    ListItem,
    ListItemButton,
    ListItemIcon,
    TypographyTitle,
    Box,
    CollapseContainer,
    MenuItemTextWrapper,
    MenuGroupToggleRightIcon
};

export default NavGroupStyled;
