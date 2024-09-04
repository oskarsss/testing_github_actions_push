import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import NavigationStyled from '@/layouts/UserLayout/Navigation/styled';

const ButtonIcon = styled(IconButton)(({ theme }) => ({
    borderRadius   : 4,
    width          : 28,
    height         : 28,
    backgroundColor: theme.palette.semantic.background.secondary
}));

const DotText = styled(NavigationStyled.Text)({
    fontSize  : 12,
    fontWeight: 400
});

const HeaderWrapper = styled('div')(() => ({
    padding       : '20px 16px',
    display       : 'flex',
    justifyContent: 'space-between',
    alignItems    : 'center',
    transition    : 'padding 250ms ease-in-out',
    minHeight     : 80
}));

const Section = styled('div')(() => ({
    display   : 'flex',
    alignItems: 'center'
}));

const ButtonLogo = styled('button')(() => ({
    margin    : 0,
    padding   : 0,
    border    : 'none',
    background: 'none',
    cursor    : 'pointer',
    outline   : 'none',
    width     : 34,
    height    : 34,
    img       : {
        borderRadius: 5,
        objectFit   : 'contain'
    }
}));

const Wrap = styled('div')(() => ({
    margin: '0 10px'
}));

const NavHeaderStyled = {
    ButtonIcon,
    DotText,
    HeaderWrapper,
    Section,
    ButtonLogo,
    Wrap
};

export default NavHeaderStyled;
