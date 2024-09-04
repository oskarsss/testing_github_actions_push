import { styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Typography from '@mui/material/Typography';
import themeConfig from '@/configs/themeConfig';

const MenuGroupLink = styled(ListItemButton)(({ theme }) => ({
    transition     : 'background 150ms linear, fill 100ms linear',
    padding        : '4px 12px 4px 30px',
    margin         : '0',
    backgroundColor: theme.palette.semantic.foreground.white.tertiary,
    color          : theme.palette.semantic.text.primary,
    cursor         : 'pointer',
    height         : '40px',

    '&.active': {
        background             : theme.palette.semantic.foreground.brand.tertiary,
        color                  : theme.palette.semantic.foreground.brand.primary,
        fontWeight             : 600,
        boxShadow              : `inset 4px 0 0 0 ${theme.palette.semantic.foreground.brand.primary}`,
        '.MuiListItemIcon-root': {
            fill: theme.palette.semantic.foreground.brand.primary
        },
        '&:hover': {
            background: theme.palette.semantic.foreground.brand.tertiary
        }
    },
    '&:hover': {
        background             : theme.palette.semantic.foreground.secondary,
        color                  : theme.palette.semantic.foreground.brand.primary,
        boxShadow              : `inset 4px 0 0 0 ${theme.palette.semantic.foreground.brand.primary}`,
        fontWeight             : 600,
        '.MuiListItemIcon-root': {
            fill: theme.palette.semantic.foreground.brand.primary
        }
    },

    '.MuiListItemIcon-root, .MuiBox-root': {
        color      : 'text.primary',
        marginRight: '12px',
        transition : 'fill 100ms linear',
        fill       : theme.palette.semantic.foreground.primary
    }
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
    fontWeight: isBold ? 600 : 500,
    ...((themeConfig.menuTextTruncate || (!themeConfig.menuTextTruncate && isCollapsed)) && {
        whiteSpace  : 'nowrap',
        overflow    : 'hidden',
        textOverflow: 'ellipsis'
    })
}));

const NavGroupItemStyled = {
    MenuGroupLink,
    ItemTitle
};

export default NavGroupItemStyled;
