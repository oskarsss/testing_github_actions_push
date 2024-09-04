import { Tabs as MUITabs, Tab as MUITab, styled } from '@mui/material';

const Tabs = styled(MUITabs)(({ theme }) => ({
    '.MuiTabs-indicator': {
        display: 'none'
    },
    '&.MuiTabs-root': {
        border         : `1px solid ${theme.palette.semantic.border.secondary}`,
        backgroundColor: theme.palette.mode === 'light' ? '#F9FAFB' : '#26282d',
        maxHeight      : '38px',
        display        : 'flex'
    },
    '& .MuiTabs-flexContainer': {
        height  : '100%',
        padding : '4px',
        overflow: 'hidden'
    },
    '& .Mui-selected': {
        backgroundColor: theme.palette.semantic.background.white,
        boxShadow      : '0px 1px 2px 0px rgba(16, 24, 40, 0.06), 0px 1px 3px 0px rgba(16, 24, 40, 0.10)',
        transition     : 'background-color 0.2s ease-in-out'
    },
    '& .MuiButtonBase-root': {
        padding       : 0,
        display       : 'flex',
        justifyContent: 'center',
        alignItems    : 'center',
        minHeight     : 'fit-content',
        borderRadius  : '6px'
    }
}));

const Tab = styled(MUITab)(({ theme }) => ({
    flex            : '1 1 0',
    '& .MuiTab-root': {
        backgroundColor: theme.palette.semantic.background.secondary,
        padding        : 0,
        margin         : 0
    }
}));

const CommonTabsStyled = {
    Tabs,
    Tab

    // TabLabel
};

export default CommonTabsStyled;
