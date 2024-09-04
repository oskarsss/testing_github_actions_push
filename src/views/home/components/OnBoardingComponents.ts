import { styled } from '@mui/material/styles';

const MainContainer = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'stretch',
    height       : '100%',
    width        : '100%',
    overflow     : 'hidden'
});

const ContentContainer = styled('div')({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'stretch',
    gap          : '28px',
    width        : '100%',
    padding      : '20px'
});

const OnBoardingComponents = {
    MainContainer,
    ContentContainer
};

export default OnBoardingComponents;
