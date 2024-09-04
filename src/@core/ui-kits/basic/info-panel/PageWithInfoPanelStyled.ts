import { Box, Stack, styled, Drawer } from '@mui/material';

const panelWidth = '530px';

const Panel = styled(Stack)<{
    isPanelOpen: boolean;
}>(({ isPanelOpen }) => ({
    position                    : 'relative',
    height                      : '100%',
    zIndex                      : isPanelOpen ? 'auto' : -1,
    'button[aria-label="close"]': {
        display   : isPanelOpen ? 'inline-flex' : 'none',
        transition: 'display 0.225s',
        zIndex    : 1200
    }
}));

const DrawerStyled = styled(Drawer)({
    height              : '100%',
    width               : panelWidth,
    flexShrink          : 0,
    zIndex              : 1000,
    '& .MuiDrawer-paper': {
        width   : panelWidth,
        position: 'relative'
    }
});

const TableWrapper = styled(Box, {
    shouldForwardProp: (prop) => prop !== 'selectedLoadId'
})<{ isPanelOpen: boolean }>(({
    isPanelOpen,
    theme
}) => ({
    position     : 'relative',
    flexGrow     : 1,
    display      : 'flex',
    flexDirection: 'column',
    overflow     : 'hidden',
    height       : '100%',
    transition   : theme.transitions.create('margin', {
        easing  : theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: `-${panelWidth}`,
    ...(isPanelOpen && {
        width     : `calc(100% - ${panelWidth})`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing  : theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen
        }),
        marginRight: 0
    })
}));

const ContentWrapper = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'flex-start',
    height        : '100%',
    overflow      : 'hidden'
}));

const PageWithInfoPanelStyled = {
    Panel,
    TableWrapper,
    ContentWrapper,
    Drawer: DrawerStyled
};

export default PageWithInfoPanelStyled;
