import { styled } from '@mui/material/styles';
import MuiLoadingButton from '@mui/lab/LoadingButton';

export const Wrap = styled('div')({
    padding : '40px 10px 10px',
    width   : '100%',
    maxWidth: 520,

    '@media screen and (min-width: 600px)': {
        paddingTop: '8vh'
    }
});

export const ContainerLogo = styled('div')({
    marginBottom: 20
});

export const Content = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    flexDirection : 'column',

    minHeight: 500
});

export const FirstAndLastName = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'flex-start',
    justifyContent: 'space-between',

    marginTop   : 16,
    marginBottom: 16
}));

export const LoadingButton = styled(MuiLoadingButton)(() => ({
    width     : '100%',
    height    : 42,
    fontWeight: 600,
    marginTop : '10px'
}));
