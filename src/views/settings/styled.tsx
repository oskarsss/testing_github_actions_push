import PerfectScrollbar from 'react-perfect-scrollbar';
import Box from '@mui/material/Box';
import { styled } from '@mui/material';
import MuiMenuList from '@mui/material/MenuList';

export const Container = styled('div')(() => ({
    display : 'flex',
    height  : '100%',
    overflow: 'hidden'
}));
export const PerfectScrollbarNavigation = styled(PerfectScrollbar)(() => ({
    width : '350px',
    height: '100%'
}));
export const PerfectScrollbarSection = styled(PerfectScrollbar)(() => ({
    width : '100%',
    height: '100%'
}));

export const MenuListStyled = styled(MuiMenuList)(({ theme }) => ({
    width   : '100%',
    maxWidth: '300px',

    '& .MuiButtonBase-root.MuiMenuItem-root': {
        borderRadius: '6px',
        transition  : 'backgroundColor 150ms linear',

        '.MuiListItemIcon-root': {
            transition: 'color 150ms linear',
            color     : '#BDC7D2'
        },

        '.MuiTypography-root': {
            fontWeight   : 500,
            letterSpacing: '0.3px'
        },

        '&:hover': {
            backgroundColor: theme.palette.semantic.foreground.brand.tertiary,

            '.MuiListItemIcon-root': {
                color: theme.palette.semantic.foreground.brand.primary
            }
        }
    },

    '& .Mui-selected': {
        backgroundColor: `${theme.palette.semantic.foreground.brand.tertiary} !important`,

        '.MuiListItemIcon-root': {
            color: `${theme.palette.semantic.foreground.brand.primary} !important`
        },
        '.MuiTypography-root': {
            fontWeight: '700 !important'
        }
    }
}));

export const MenuList = styled(MenuListStyled)(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'column',
    justifyContent: 'space-between',
    flexShrink    : 0,
    gap           : '32px',
    padding       : '30px 10px !important',
    borderRight   : `1px solid ${theme.palette.semantic.border.primary}`,
    li            : {
        marginBottom: '4px',
        padding     : '8px 16px !important'
    }
}));
export const Title = styled('h3')(() => ({
    margin       : '0 auto 32px 16px',
    fontWeight   : 600,
    fontSize     : '24px',
    lineHeight   : 1.33,
    letterSpacing: '0.3px'
}));
export const Section = styled(Box)(({ theme }) => ({
    padding        : '55px 32px 32px',
    height         : 'auto',
    minHeight      : '100%',
    width          : '100%',
    overflow       : 'hidden',
    backgroundColor: theme.palette.semantic.background.secondary
}));
export const Content = styled('div')(() => ({
    width         : '100%',
    height        : '100%',
    display       : 'flex',
    justifyContent: 'center',
    p             : {
        margin : 0,
        padding: 0
    }
}));
export const ContainerContent = styled('div')(() => ({
    width   : '100%',
    maxWidth: '1080px',
    minWidth: '840px',
    height  : '100%'
}));
