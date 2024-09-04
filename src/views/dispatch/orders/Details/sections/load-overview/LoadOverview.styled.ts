import { styled } from '@mui/material/styles';
import MuiIconButton from '@mui/material/IconButton';
import MuiButton from '@mui/material/Button';
import LoadDetailsViewStyled from '../../LoadDetailsView.styled';

const Wrapper = styled('div')<{ no_truck?: boolean }>(({
    theme,
    no_truck
}) => ({
    borderTop       : `1px solid ${theme.palette.semantic.border.primary}`,
    borderBottom    : `1px solid ${theme.palette.semantic.border.primary}`,
    borderLeftWidth : 1,
    borderRightWidth: 1,
    borderLeftStyle : 'solid',
    borderRightStyle: 'solid',
    borderLeftColor : 'transparent',
    borderRightColor: 'transparent',
    position        : 'relative',
    height          : '64px',
    overflow        : 'hidden',
    display         : 'flex',
    alignItems      : 'center',
    flexDirection   : 'row',

    animationDuration      : '3s',
    animationIterationCount: 'infinite',
    // eslint-disable-next-line no-nested-ternary
    animationName          : no_truck ? 'changeBorderColorLight' : 'none',

    ...(no_truck ? { borderRadius: '12px' } : {}),

    '@keyframes changeBorderColorLight': {
        '0%': {
            borderColor: theme.palette.semantic.border.brand.primary
        },
        '50%': {
            borderColor: theme.palette.semantic.border.primary
        },
        '100%': {
            borderColor: theme.palette.semantic.border.brand.primary
        }
    }
}));

const IconWrapper = styled(LoadDetailsViewStyled.FlexContainer)({
    '& svg': {
        width     : '48px',
        height    : '48px',
        flexShrink: 0
    }
});

const Title = styled('p')(({ theme }) => ({
    margin      : '0 0 2px 0',
    width       : '100%',
    fontSize    : '14px',
    fontWeight  : 700,
    lineHeight  : 1.43,
    color       : theme.palette.semantic.text.primary,
    whiteSpace  : 'nowrap',
    overflow    : 'hidden',
    textOverflow: 'ellipsis'
}));

const Description = styled('p')(({ theme }) => ({
    margin      : 0,
    fontSize    : '12px',
    lineHeight  : 1.4,
    fontWeight  : 500,
    color       : theme.palette.semantic.text.secondary,
    whiteSpace  : 'nowrap',
    overflow    : 'hidden',
    textOverflow: 'ellipsis'
}));

const IconButton = styled(MuiIconButton)({
    padding: 2,

    '& svg': {
        fontSize: '16px',
        width   : '16px',
        height  : '16px'
    }
});

const Button = styled(MuiIconButton)(({
    theme,
    color
}) => ({
    padding     : 2,
    height      : '36px',
    width       : '36px',
    borderRadius: '12px',
    backgroundColor:
        color === 'error'
            ? theme.palette.utility.foreground.error.secondary
            : theme.palette.semantic.foreground.brand.secondary,

    '& svg': {
        fontSize: '20px',
        width   : '20px',
        height  : '20px',

        fill:
            color === 'error'
                ? theme.palette.utility.foreground.error.primary
                : theme.palette.semantic.foreground.brand.primary
    }
}));

const ButtonAssignTruck = styled(MuiButton)(({ theme }) => ({
    width      : '100%',
    height     : '100%',
    borderColor: theme.palette.semantic.border.brand.primary,
    '& svg'    : {
        fill  : `${theme.palette.semantic.foreground.brand.primary} !important`,
        width : '20px',
        height: '20px'
    }
}));

const Divider = styled('div')(({ theme }) => ({
    width     : '1px',
    height    : '40px',
    background: theme.palette.semantic.border.primary,
    margin    : '0 8px 0 8px',
    flexShrink: 0
}));

const Container = styled('div')({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '16px',
    width        : '100%'
});

const ContainerItem = styled('div')({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'center',
    gap           : '8px',
    overflow      : 'hidden',

    flex: '1 1 0'
});

const InfoWrapper = styled('div')({
    overflow: 'hidden',
    flexGrow: 1
});

const LoadOverviewStyled = {
    Container,
    Wrapper,
    Button,
    IconButton,
    ButtonAssignTruck,
    Divider,

    Item: {
        Container: ContainerItem,
        IconWrapper,
        InfoWrapper,
        Title,
        Description
    }
};

export default LoadOverviewStyled;
