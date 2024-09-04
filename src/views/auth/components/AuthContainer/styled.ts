import { styled } from '@mui/material/styles';
import { TypeAnimation as TypeAnimationLib } from 'react-type-animation';

const Section = styled('section', {
    shouldForwardProp: (prop) => prop !== 'turnOffBgImage'
})<{
    turnOffBgImage?: boolean;
}>(({
    theme,
    turnOffBgImage
}) => ({
    height: '100vh',

    display: 'flex',
    width  : '100%',

    '@media screen and (min-width: 1024px)': !turnOffBgImage
        ? {
            backgroundImage   : 'url(/images/pages/auth.jpg)',
            backgroundRepeat  : 'no-repeat',
            backgroundPosition: 'right 20% center',
            backgroundSize    : 'cover'
        }
        : {}
}));

const Container = styled('div')(({ theme }) => ({
    position      : 'relative',
    overflow      : 'auto',
    height        : '100%',
    width         : '100%',
    display       : 'flex',
    justifyContent: 'center',
    background    : theme.palette.semantic.background.primary,

    '@media screen and (min-width: 1024px)': {
        height: '100vh',
        width : '100%'
    },

    '@media screen and (min-width: 1280px)': {
        width: '55%'
    }
}));

const TypeAnimation = styled(TypeAnimationLib)({
    display: 'none',

    '@media screen and (min-width: 1280px)': {
        display  : 'block',
        position : 'absolute',
        bottom   : '24px',
        right    : 'calc((100% - 55%) / 2)',
        transform: 'translateX(50%)',

        fontWeight   : 400,
        fontSize     : '30px',
        lineHeight   : 1.6,
        letterSpacing: '0.17px',

        color: '#ffffff'
    }
});

const AuthContainersStyled = {
    Section,
    Container,
    TypeAnimation
};

export default AuthContainersStyled;
