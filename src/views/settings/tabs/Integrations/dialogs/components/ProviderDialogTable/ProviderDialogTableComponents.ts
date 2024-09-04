import { styled } from '@mui/material/styles';
import { Button, Stack } from '@mui/material';

const Header = styled('div')(() => ({
    display       : 'flex',
    width         : '100%',
    justifyContent: 'center',
    alignItems    : 'center',
    padding       : '15px 30px'
}));

const Container = styled(Stack)({
    overflow: 'hidden',
    width   : '90vw',
    height  : '100%'
});

const Title = styled('h6')(() => ({
    margin    : '0 30px 0 0',
    fontSize  : '24px',
    flexShrink: 0,
    whiteSpace: 'nowrap',
    fontWeight: 600
}));

const ButtonClose = styled(Button)({
    width     : '100px',
    flexShrink: 0
});

const ProviderDialogTableComponents = {
    Container,
    Header,
    Title,
    ButtonClose
};

export default ProviderDialogTableComponents;
