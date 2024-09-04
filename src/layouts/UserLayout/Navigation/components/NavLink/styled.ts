import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import MuiListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import themeConfig from '@/configs/themeConfig';
import MuiListItemIcon from '@mui/material/ListItemIcon';

const MenuNavLink = styled(ListItemButton, {
    shouldForwardProp: (prop) => prop !== 'isDisabled'
})<{ isDisabled?: boolean }>(({
    theme,
    isDisabled
}) => ({
    color                     : theme.palette.semantic.text.secondary,
    height                    : '48px',
    transition                : 'opacity .25s ease-in-out',
    padding                   : '5px 16px 5px 16px',
    margin                    : '0',
    ...(isDisabled ? { pointerEvents: 'none' } : { cursor: 'pointer' }),
    '&.active, &.active:hover': {
        backgroundColor: `${theme.palette.semantic.foreground.brand.primary}`,
        color          : theme.palette.semantic.text.secondary
    },
    ':hover': {
        backgroundColor: theme.palette.semantic.foreground.secondary
    },
    '&.active .MuiTypography-root, &.active .MuiListItemIcon-root': {
        color: `${theme.palette.semantic.text.white} !important`
    },

    '.MuiListItemIcon-root': {
        transition: 'margin .25s ease-in-out'
    }
}));

const ListItem = styled(MuiListItem)({
    px       : '0 !important',
    zIndex   : 20,
    overflow : 'hidden',
    minHeight: '48px'
});

const ListItemIcon = styled(MuiListItemIcon, {
    shouldForwardProp: (prop) => prop !== 'isParent'
})<{ isParent: boolean }>(({ isParent }) => ({
    ...(isParent
        ? {
            marginLeft : 5,
            marginRight: 15
        }
        : {})
}));

const ItemTitle = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'isBold' && prop !== 'isCollapsed'
})<{
    isBold: boolean;
    isCollapsed: boolean;
}>(({
    isBold,
    isCollapsed
}) => ({
    fontSize  : 14,
    fontWeight: isBold ? 700 : 500,
    ...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && isCollapsed)) && {
        whiteSpace  : 'nowrap',
        overflow    : 'hidden',
        textOverflow: 'ellipsis'
    })
}));

const NavLinkStyled = {
    MenuNavLink,
    ListItem,
    ListItemIcon,
    ItemTitle
};

export default NavLinkStyled;
