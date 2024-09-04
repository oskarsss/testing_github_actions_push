import { styled, Theme } from '@mui/material/styles';
import IconButtonMui from '@mui/material/IconButton';
import { Stack } from '@mui/material';

type ContainerProps = {
    isMenuOpen: boolean;
    theme?: Theme;
    navCollapsed: boolean;
};

const Container = styled('div')<ContainerProps>(({
    theme,
    isMenuOpen,
    navCollapsed
}) => ({
    position  : 'fixed',
    right     : 0,
    top       : 0,
    height    : '100vh',
    minWidth  : 1025,
    width     : `calc(100% - 47% - ${navCollapsed ? '32px' : '120px'})`,
    zIndex    : 1000,
    display   : 'flex',
    transform : isMenuOpen ? 'translateX(0)' : 'translateX(110%)',
    transition: 'transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, width .25s ease-in-out',
    background: theme.palette.semantic.foreground.white.primary,
    borderLeft: `1px solid ${theme.palette.semantic.border.secondary}`,
    boxShadow:
        theme.palette.mode === 'light'
            ? '0px 20px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)'
            : '0px 20px 24px -4px rgba(19, 17, 32, 0.2), 0px 8px 8px -4px rgba(19, 17, 32, 0.14)'
}));

const Title = styled('h6')(({ theme }) => ({
    fontWeight: 600,
    fontSize  : 20,
    lineHeight: 1.5,
    margin    : 0,
    color     : theme.palette.semantic.text.primary,
    whiteSpace: 'nowrap'
}));

const Description = styled('p')(({ theme }) => ({
    fontWeight  : 400,
    fontSize    : 12,
    margin      : 0,
    overflow    : 'hidden',
    textOverflow: 'ellipsis',
    color       : theme.palette.semantic.text.primary,
    '& span'    : {
        color: theme.palette.semantic.text.secondary
    }
}));

const FlexContainer = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : 8,
    position  : 'relative'
});

const BlockInformation = styled('div')(({ theme }) => ({
    display     : 'flex',
    alignItems  : 'center',
    padding     : '8px 16px',
    gap         : 12,
    borderRadius: 12,
    background  : theme.palette.semantic.background.white,
    borderWidth : 1,
    borderStyle : 'solid',
    borderColor : theme.palette.semantic.border.secondary
}));

const GreyBlock = styled('div')(({ theme }) => ({
    borderRadius: '4px',
    padding     : '8px 12px',
    background  : theme.palette.semantic.background.secondary
}));

type IconButtonProps = {
    primary?: boolean;
};

const IconButtonStyled = styled(IconButtonMui, {
    shouldForwardProp: (prop) => prop !== 'primary'
})<IconButtonProps>(({
    theme,
    primary = false
}) => ({
    padding: '2px',

    '& .MuiSvgIcon-root': {
        fontSize: '20px',
        color   : primary
            ? theme.palette.semantic.foreground.brand.primary
            : theme.palette.semantic.foreground.quarterary
    }
}));

const MiddleContainer = styled(Stack)({
    alignItems   : 'stretch',
    flexDirection: 'row',
    flexShrink   : 0,
    gap          : 20,
    minHeight    : '320px'

    // minHeight    : '308px',
});

const BottomContainer = styled('div')({
    display       : 'flex',
    alignItems    : 'stretch',
    justifyContent: 'space-between',
    gap           : '20px',
    flexGrow      : 2,
    minHeight     : '400px',
    overflow      : 'hidden'
});

const LoadDetailsViewStyled = {
    Container,
    Title,
    Description,
    FlexContainer,
    BlockInformation,
    GreyBlock,
    IconButtonStyled,
    MiddleContainer,
    BottomContainer
};

export default LoadDetailsViewStyled;
