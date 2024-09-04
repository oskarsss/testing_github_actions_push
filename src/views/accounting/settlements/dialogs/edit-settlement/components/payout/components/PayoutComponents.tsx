import { styled } from '@mui/material/styles';
import { Button, Typography } from '@mui/material';

const Container = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    width        : '100%',
    gap          : '12px',
    overflow     : 'hidden',
    flexGrow     : 1,
    flexShrink   : 0
});

const HeaderContainer = styled('div')({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : '8px'
});

const ControllersWrapper = styled('div')({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '8px'
});

const CreateButton = styled(Button)({
    height       : '24px',
    padding      : '2px 8px',
    borderRadius : '4px',
    textTransform: 'none',
    fontSize     : '12px',
    minWidth     : 'fit-content',

    '.MuiButton-startIcon': {
        mr : '4px',
        svg: {
            width : '16px',
            height: '16px'
        }
    }
});

const ContentTabTitle = styled('p')({
    margin    : 0,
    fontSize  : '12px',
    fontWeight: 600,
    lineHeight: 1.5
});

const ContentTabDivider = styled('div')(({ theme }) => ({
    width          : '100%',
    height         : '1px',
    backgroundColor: theme.palette.semantic.border.primary
}));

const ContentTabContainer = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    gap          : '4px',
    width        : '100%'
});

const ContentTabRow = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : '4px',
    width         : '100%'
});

const ContentTabText = styled(Typography)<{ color?: 'secondary' | 'primary' }>(
    ({
        theme,
        color
    }) => ({
        fontSize  : '12px',
        fontWeight: 500,
        lineHeight: 1.5,
        color     : theme.palette.semantic.text[color || 'secondary']
    })
);

const PayoutComponents = {
    HeaderContainer,
    ControllersWrapper,
    ContentTabTitle,
    ContentTabDivider,
    ContentTabContainer,
    ContentTabRow,
    ContentTabText,
    CreateButton,
    Container
};

export default PayoutComponents;
