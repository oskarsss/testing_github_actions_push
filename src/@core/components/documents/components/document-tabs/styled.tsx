import { styled } from '@mui/material/styles';
import MuiTabList from '@mui/lab/TabList';
import MuiTab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import EventBusy from '@mui/icons-material/EventBusy';

const Container = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'column',
    justifyContent: 'flex-start',
    alignItems    : 'flex-start'
}));

const Wrapper = styled(Box)(({ theme }) => ({
    borderTop     : `1px solid ${theme.palette.semantic.border.primary}`,
    borderLeft    : `1px solid ${theme.palette.semantic.border.primary}`,
    borderRight   : `1px solid ${theme.palette.semantic.border.primary}`,
    borderRadius  : '5px 5px 0 0',
    width         : '266px',
    minWidth      : '266px',
    maxWidth      : '266px',
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    paddingRight  : '5px'
}));

const TabList = styled(MuiTabList)(({ theme }) => ({
    width                     : '266px',
    minWidth                  : '266px',
    maxWidth                  : '266px',
    marginRight               : 0,
    overflowY                 : 'auto',
    border                    : `1px solid ${theme.palette.semantic.border.primary}`,
    borderRadius              : '0 0 5px 5px',
    '& .MuiTabs-flexContainer': {
        alignItems: 'center'
    }
}));

const Tab = styled(MuiTab)(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'flex-start',
    alignItems    : 'center',
    textAlign     : 'left',
    width         : '100%',
    minHeight     : '45px',
    '& svg'       : {
        marginBottom: '0 !important',
        marginRight : theme.spacing(3)
    },

    '&.pending': {
        backgroundColor: theme.palette.utility.foreground.warning.tertiary,
        color          : theme.palette.utility.text.warning,
        borderBottom   : `1px solid ${theme.palette.semantic.border.primary}`
    },
    '&.valid': {
        backgroundColor: theme.palette.utility.foreground.success.tertiary,
        color          : theme.palette.utility.text.success,
        borderBottom   : `1px solid ${theme.palette.semantic.border.primary}`
    },
    '&.invalid': {
        backgroundColor: theme.palette.utility.foreground.error.tertiary,
        color          : theme.palette.utility.text.error,
        borderBottom   : `1px solid ${theme.palette.semantic.border.primary}`
    }

    // '&.pending': {
    //     backgroundColor: theme.palette.mode === 'light' ? '#FFFAEB' : '#5f5600',
    //     color:
    //         theme.palette.mode === 'light'
    //             ? '#b26d00'
    //             : theme.palette.utility.foreground.warning.primary,
    //     borderBottom: `1px solid ${theme.palette.semantic.border.primary}`
    // },
    // '&.valid': {
    //     backgroundColor: theme.palette.mode === 'light' ? '#ECFDF3' : '#163b16',
    //     color:
    //         theme.palette.mode === 'light'
    //             ? '#044804'
    //             : theme.palette.utility.foreground.success.secondary,
    //     borderBottom: `1px solid ${theme.palette.semantic.border.primary}`
    // },
    // '&.invalid': {
    //     backgroundColor: theme.palette.mode === 'light' ? '#ffdde0' : '#490e0e',
    //     color:
    //         theme.palette.mode === 'light'
    //             ? '#a51313'
    //             : theme.palette.utility.foreground.error.primary,
    //     borderBottom: `1px solid ${theme.palette.semantic.border.primary}`
    // }
}));

const EventBusyIcon = styled(EventBusy)(({ theme }) => ({
    color   : theme.palette.utility.foreground.error.primary,
    position: 'absolute',
    right   : 0
}));

const DocTabsComponents = {
    Container,
    Wrapper,
    TabList,
    Tab,
    EventBusyIcon
};

export default DocTabsComponents;
