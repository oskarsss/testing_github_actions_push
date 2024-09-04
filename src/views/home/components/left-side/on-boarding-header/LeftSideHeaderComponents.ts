import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import NextImage from 'next/image';

const Container = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'row',
    alignItems     : 'center',
    gap            : '40px',
    height         : '92px',
    paddingLeft    : '20px',
    borderRadius   : '12px',
    flexShrink     : 0,
    marginBottom   : '4px',
    backgroundColor: theme.palette.semantic.foreground.secondary
}));

const Title = styled('h1')(({ theme }) => ({
    margin    : 0,
    fontSize  : '20px',
    fontWeight: 700,
    lineHeight: 1.3,
    color     : theme.palette.semantic.text.primary
}));

const SubTitle = styled('h5')(({ theme }) => ({
    margin    : 0,
    fontSize  : '14px',
    fontWeight: 500,
    lineHeight: 1.4,
    color     : theme.palette.semantic.text.secondary
}));

const TitleWrapper = styled('div')({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '4px'
});

const Wrapper = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    gap          : '4px'
});

const Button = styled(MuiButton)({
    borderRadius: '8px',
    padding     : '8px 12px',
    fontSize    : '14px',
    fontWeight  : 600,
    lineHeight  : 1.4
});

const Image = styled(NextImage)({
    position : 'absolute',
    top      : '0',
    left     : '50%',
    transform: 'translate(-50%, -14%)',
    maxWidth : '361px',
    width    : '100%',
    objectFit: 'contain'
});

const ImageWrapper = styled('div')({
    position  : 'relative',
    height    : '100%',
    flexGrow  : 1,
    marginLeft: '-20px'
});

const LeftSideHeaderComponents = {
    Container,
    Wrapper,
    TitleWrapper,
    SubTitle,
    Button,
    Image,
    ImageWrapper,
    Title
};

export default LeftSideHeaderComponents;
