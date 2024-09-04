import { styled } from '@mui/material/styles';
import MuiTabList from '@mui/lab/TabList';
import MuiTab from '@mui/material/Tab';
import { CSSProperties } from 'react';

const Wrapper = styled('div')({
    paddingTop: 16
});

const Header = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    padding       : '12px 24px'
});

const TabList = styled(MuiTabList)(({ theme }) => ({
    width                     : '100%',
    marginRight               : 0,
    overflowY                 : 'auto',
    border                    : 'none',
    borderTop                 : `1px solid ${theme.palette.semantic.border.secondary}`,
    '& .MuiTabs-flexContainer': {
        width     : '100%',
        alignItems: 'center'
    }
}));

const Tab = styled(MuiTab)(({ theme }) => ({
    display                        : 'flex',
    flexDirection                  : 'row',
    justifyContent                 : 'flex-start',
    gap                            : 8,
    alignItems                     : 'center',
    textAlign                      : 'left',
    width                          : '100%',
    maxWidth                       : '100%',
    minHeight                      : '48px',
    padding                        : '0 24px',
    color                          : theme.palette.semantic.text.primary,
    borderBottom                   : `1px solid ${theme.palette.semantic.border.secondary}`,
    opacity                        : 1,
    '[data-testid="EventBusyIcon"]': {
        right: 16
    },
    div: {
        display: 'flex'
    },
    ':hover': {
        background: theme.palette.semantic.background.secondary
    }
}));

const ExpiresBlock = styled('div')<{ marginRight: CSSProperties['marginRight'] }>(
    ({
        marginRight,
        theme
    }) => ({
        display     : 'flex',
        background  : theme.palette.utility.foreground.error.secondary,
        position    : 'absolute',
        alignItems  : 'center',
        gap         : 4,
        right       : 0,
        padding     : '4px 8px',
        borderRadius: 4,
        marginRight,
        svg         : {
            position   : 'static',
            marginRight: 0
        }
    })
);

const DriverDocumentsStyled = {
    Wrapper,
    Header,
    TabList,
    Tab,
    ExpiresBlock
};

export default DriverDocumentsStyled;
