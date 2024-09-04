// eslint-disable-next-line import/no-extraneous-dependencies
import { keyframes } from '@mui/system';
import { styled } from '@mui/material/styles';

export const Container = styled('div')(() => ({
    width         : '100%',
    display       : 'flex',
    flex          : '1 0 0',
    flexDirection : 'column',
    justifyContent: 'space-between',
    marginTop     : '50px',
    order         : 2,
    h5            : {
        margin: 0
    },
    p: {
        margin: 0
    }
}));
export const Title = styled('h5')(() => ({
    fontSize  : '20px',
    lineHeight: 1.33
}));
export const Top = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    margin        : '0 auto',
    width         : '930px',
    height        : '424px'
}));

const dots = keyframes`
  0%,
  20% {
    color: rgba(0, 0, 0, 0);
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  40% {
    color: #525164;
    text-shadow: 0.25em 0 0 rgba(0, 0, 0, 0), 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  60% {
    text-shadow: 0.25em 0 0 #525164, 0.5em 0 0 rgba(0, 0, 0, 0);
  }
  80%,
  100% {
    text-shadow: 0.25em 0 0 #525164, 0.5em 0 0 #525164;
  }
`;
export const Animation = styled('div')(() => ({
    height   : '100%',
    marginTop: 'auto',
    h6       : {
        fontWeight   : 500,
        fontSize     : '20px',
        lineHeight   : 1.23,
        letterSpacing: '0.25px',
        textAlign    : 'center',
        minHeight    : '30px',
        span         : {
            '&::after': {
                content  : "' .'",
                animation: `${dots} 1s steps(5, end) infinite`
            }
        }
    }
}));
export const Information = styled('div')(() => ({
    width     : '465px',
    marginLeft: '70px'
}));
export const InformationTitle = styled('h6')(() => ({
    fontSize    : '24px',
    fontWeight  : 600,
    lineHeight  : 1.33,
    marginBottom: '32px',
    marginTop   : 0
}));
export const InformationBox = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column',
    gap          : '32px',
    borderTop    : '2px solid #e7eef6',
    paddingTop   : '32px'
}));
export const InformationItem = styled('div')<{ isError: boolean }>(({ isError }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    div           : {
        display   : 'flex',
        alignItems: 'center'
    },
    p: {
        fontWeight     : 700,
        fontSize       : '20px',
        lineHeight     : 1.33,
        padding        : '7px 12px',
        marginRight    : '16px',
        borderRadius   : '3px',
        color          : isError ? '#CB281A' : '#285ff6',
        backgroundColor: isError ? '#F4F5FA' : '#e3effe'
    },
    h6: {
        margin    : 0,
        fontWeight: 500,
        fontSize  : '18px',
        lineHeight: 1.33
    }
}));
export const Actions = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    minHeight     : '40px'
}));
