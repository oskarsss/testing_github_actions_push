import { styled } from '@mui/material/styles';

type ImageProps = {
    login?: boolean;
};

const Container = styled('div')({
    display   : 'flex',
    alignItems: 'center'
});

const ImageLogo = styled('img')<ImageProps>(({ login }) => ({
    marginRight: login ? 30 : 22,
    width      : login ? 76 : 56,
    height     : login ? 58 : 43
}));

const ImageNameCompany = styled('img')<ImageProps>(({ login }) => ({
    width : login ? 152 : 112,
    height: login ? 41 : 30
}));

const AuthLogoStyled = {
    Container,
    ImageLogo,
    ImageNameCompany
};

export default AuthLogoStyled;
