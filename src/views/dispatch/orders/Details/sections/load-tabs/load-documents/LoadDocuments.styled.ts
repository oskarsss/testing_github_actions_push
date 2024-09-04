import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

const Container = styled('div')({
    padding      : '16px',
    display      : 'flex',
    flexDirection: 'column',
    gap          : '12px'
});

const HeaderContainer = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : '8px',
    minHeight     : '32px'
});

const HeaderWrapper = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : '4px'
});

const Button = styled(MuiButton)(({
    theme,
    variant,
    disabled
}) => ({
    height       : '24px',
    minWidth     : 'auto',
    padding      : '0px 8px !important',
    textTransform: 'none',
    borderRadius : '4px',
    fontSize     : '12px',
    fontWeight   : 600,
    lineHeight   : 1.66,

    '.MuiButton-startIcon': {
        marginRight: '2px',

        svg: {
            fontSize: '16px'
        }
    },

    ...(variant === 'outlined' && {
        borderColor: theme.palette.semantic.border.secondary,
        color      : theme.palette.semantic.text.secondary,

        svg: {
            transition: 'opacity 0.3s',
            color     : theme.palette.semantic.foreground.primary,
            opacity   : disabled ? 0.5 : 1
        },

        '&:hover': {
            borderColor    : theme.palette.semantic.border.secondary,
            backgroundColor: theme.palette.semantic.background.secondary
        }
    })
}));

const LoadDocumentsStyled = {
    Container,
    HeaderContainer,
    HeaderWrapper,
    Button
};

export default LoadDocumentsStyled;
