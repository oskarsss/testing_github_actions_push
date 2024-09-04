import { Tab, Tabs, styled } from '@mui/material';

export const PAGE_TABS_HEIGHT = '40px';

const StyledTab = styled(Tab, {
    shouldForwardProp: (prop) => prop !== 'iconExist'
})<{ iconExist: boolean }>(({
    iconExist,
    theme
}) => ({
    height          : PAGE_TABS_HEIGHT,
    minHeight       : PAGE_TABS_HEIGHT,
    maxHeight       : PAGE_TABS_HEIGHT,
    display         : 'flex',
    flex            : '1 1 auto',
    '& .MuiBox-root': {
        textOverflow  : 'ellipsis',
        whiteSpace    : 'nowrap',
        overflow      : 'hidden',
        display       : 'flex',
        justifyContent: 'flex-start'
    },
    ...(iconExist && {
        svg: {
            height: 30,
            width : 30,
            fill  : theme.palette.semantic.foreground.primary
        },
        '&.Mui-selected': {
            svg: {
                fill: theme.palette.semantic.foreground.brand.primary
            }
        }
    })
}));

const StyledTabs = styled(Tabs)(({ theme }) => ({
    height   : PAGE_TABS_HEIGHT,
    minHeight: PAGE_TABS_HEIGHT,
    maxHeight: PAGE_TABS_HEIGHT,
    overflow : 'initial'
}));

const PageTabsStyled = {
    Tab : StyledTab,
    Tabs: StyledTabs
};

export default PageTabsStyled;
