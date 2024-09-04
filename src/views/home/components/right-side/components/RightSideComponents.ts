import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import MuiDivider from '@mui/material/Divider';
import Link from 'next/link';

const Container = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    gap          : '16px',
    minWidth     : '360px',
    maxWidth     : '360px',
    height       : '100%',
    overflow     : 'hidden'
}));

const ChartContainer = styled('div')(({ theme }) => ({
    width       : '100%',
    height      : '180px',
    padding     : '10px',
    borderRadius: '12px',
    marginBottom: '4px',
    boxShadow   : '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    background  : theme.palette.semantic.foreground.white.tertiary
}));

const Wrapper = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'stretch',
    gap          : '12px'
}));

const TitleWrapper = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    gap          : '4px'
}));

const Title = styled('p')(({ theme }) => ({
    fontSize  : '18px',
    fontWeight: 600,
    lineHeight: 1.4,
    margin    : 0,
    color     : theme.palette.semantic.text.primary
}));

const SubTitle = styled('p')(({ theme }) => ({
    fontSize  : '14px',
    fontWeight: 500,
    lineHeight: 1.4,
    margin    : 0,
    color     : theme.palette.semantic.text.secondary
}));

const ControllersWrapper = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'column',
    alignItems   : 'flex-start',
    gap          : '8px'
}));

const Button = styled(MuiButton)(({
    variant,
    theme,
    color
}) => ({
    height      : '24px',
    padding     : '0 10px',
    fontSize    : '12px',
    fontWeight  : 600,
    lineHeight  : 0.5,
    borderRadius: '4px',
    borderColor : theme.palette.semantic.border.secondary,
    color:
        color === 'primary'
            ? theme.palette.semantic.text.brand.primary
            : theme.palette.semantic.text.secondary,

    ...(variant === 'outlined'
        ? {
            svg: {
                color: theme.palette.semantic.foreground.primary
            },
            backgroundColor: 'transparent !important',
            '&:hover'      : {
                borderColor: theme.palette.semantic.border.tertiary
            }
        }
        : {}),

    '.MuiButton-icon': {
        '&.MuiButton-endIcon': {
            marginLeft: '4px'
        },
        '&.MuiButton-startIcon': {
            marginRight: '4px'
        },
        svg: {
            fontSize: '16px'
        }
    }
}));

const Divider = styled(MuiDivider)(({ theme }) => ({
    margin: 0
}));

const SocialMediaLink = styled(Link)(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'row',
    alignItems     : 'center',
    justifyContent : 'center',
    width          : '24px',
    height         : '24px',
    borderRadius   : '4px',
    backgroundColor: theme.palette.semantic.foreground.brand.secondary,
    boxShadow      : '0px 1px 2px 0px rgba(16, 24, 40, 0.05)',
    transition     : 'background-color 0.2s',

    svg: {
        fontSize: '16px'
    },

    '&:hover': {
        backgroundColor: theme.palette.semantic.foreground.brand.tertiary
    }
}));

const RightSideComponents = {
    Container,
    ChartContainer,
    TitleWrapper,
    ControllersWrapper,
    Title,
    SubTitle,
    Wrapper,
    Button,
    Divider,
    SocialMediaLink
};

export default RightSideComponents;
