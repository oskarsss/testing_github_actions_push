import { styled } from '@mui/material/styles';
import MuiTab from '@mui/material/Tab';
import MuiTabs from '@mui/material/Tabs';
import getScrollBarStyles from '@/utils/get-scrollbar-styles';

const Tabs = styled(MuiTabs)(({ theme }) => ({
    borderBottom              : `1px solid ${theme.palette.semantic.border.primary}`,
    minHeight                 : '44px',
    flexShrink                : 0,
    '& .MuiTabs-flexContainer': {
        gap: '20px'
    },
    '& .MuiTabs-scrollableX': getScrollBarStyles(theme)
}));

const Tab = styled(MuiTab)<{ size?: 'small' | 'medium' }>(({
    theme,
    size = 'small'
}) => ({
    minWidth     : 'auto',
    flexShrink   : 0,
    whiteSpace   : 'nowrap',
    padding      : 0,
    minHeight    : size === 'small' ? '44px' : '50px',
    maxHeight    : size === 'small' ? '44px' : '50px',
    maxWidth     : 'fit-content',
    width        : 'fit-content',
    fontSize     : size === 'small' ? '14px' : '16px',
    lineHeight   : 1.4,
    fontWeight   : 600,
    textTransform: 'none',
    gap          : '4px',
    color        : theme.palette.semantic.text.secondary,
    flexDirection: 'row',
    alignItems   : 'center',

    svg: {
        width : size === 'small' ? '16px' : '18px',
        height: size === 'small' ? '16px' : '18px',
        color : theme.palette.semantic.foreground.primary,
        fill  : theme.palette.semantic.foreground.primary
    },

    '&.Mui-selected': {
        color: theme.palette.semantic.text.brand.primary,
        svg  : {
            color: theme.palette.semantic.foreground.brand.primary,
            fill : theme.palette.semantic.foreground.brand.primary
        }
    }
}));

const TabsStyled = {
    Tabs,
    Tab
};
export default TabsStyled;
