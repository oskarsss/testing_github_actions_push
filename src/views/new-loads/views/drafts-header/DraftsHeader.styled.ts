import { IconButton, styled } from '@mui/material';
import MuiTab from '@mui/material/Tab';

const Container = styled('div')(({ theme }) => ({
    width: '100%',
    background:
        theme.palette.mode === 'light'
            ? theme.palette.semantic.background.white
            : theme.palette.semantic.background.primary,
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    paddingLeft   : 8,
    paddingRight  : 15,
    gap           : 15
}));

const TabsWrapper = styled('div')(() => ({
    width         : '100%',
    height        : '100%',
    paddingTop    : 8,
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'flex-end',
    justifyContent: 'flex-start',
    overflow      : 'hidden'
}));

const Tabs = styled('div')(() => ({
    boxShadow      : '16px 16px 43px rgba(52, 64, 84, 0.08)',
    borderRadius   : '16px 16px 0 0',
    overflow       : 'auto',
    '.MuiTabs-root': {
        borderRadius: '16px 16px 0 0'
    }
}));

const ButtonsWrapper = styled('div')(() => ({
    height        : '100%',
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'flex-end',
    flexShrink    : 0,
    gap           : 15
}));

const CreateDraftButton = styled(IconButton)(({ theme }) => ({
    width : 32,
    height: 32,
    margin: '16px 4px',
    svg   : {
        fill: `${theme.palette.semantic.background.brand}`
    }
}));

const Tab = styled(MuiTab)(({ theme }) => ({
    padding     : '0 !important',
    minWidth    : '300px !important',
    height      : '64px !important',
    borderRadius: '16px 16px 0 0 !important',
    marginLeft  : '-8px !important',

    '& > div': {
        backgroundColor: `${theme.palette.semantic.foreground.secondary}`
    },

    '&.MuiTab-root': {
        maxWidth: 'none'
    },
    '&:first-of-type': {
        marginLeft: '0 !important'
    },
    '&.Mui-selected': {
        zIndex: 1
    },
    '&.Mui-selected > div': {
        backgroundColor: `${theme.palette.semantic.background.white} !important`,
        boxShadow      : '16px 0px 64px 0px rgba(52, 64, 84, 0.08)'
    }
}));

const DraftsHeaderStyled = {
    Container,
    TabsWrapper,
    Tabs,
    ButtonsWrapper,
    CreateDraftButton,
    Tab
};

export default DraftsHeaderStyled;
