import Avatar from '@mui/material/Avatar';
import { Popover } from '@mui/material';
import { styled } from '@mui/material/styles';

const Container = styled('div')(() => ({
    position    : 'relative',
    borderRadius: '50%'
}));

const TypeIcon = styled('div')(({ theme }) => ({
    svg: {
        position    : 'absolute',
        bottom      : 0,
        right       : 0,
        width       : 32,
        height      : 32,
        borderRadius: '50%',
        background  : theme.palette.semantic.background.white
    }
}));

const Wrapper = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    borderRadius  : '50%',
    zIndex        : 0,
    '&:hover'     : {
        opacity: 0.72
    }
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
    border  : `4px solid ${theme.palette.semantic.border.primary}`,
    width   : 120,
    height  : 120,
    fontSize: '3.2rem',
    cursor  : 'pointer'
}));

const PopoverStyled = styled(Popover)(() => ({
    pointerEvents      : 'none',
    '.MuiPopover-paper': {
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        width          : 120,
        height         : 120,
        borderRadius   : '50%',
        backgroundColor: 'rgba(22, 28, 36, 0.64)',
        transition     : 'opacity 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        cursor         : 'pointer',
        div            : {
            display              : 'grid',
            placeItems           : 'center',
            placeContent         : 'center',
            color                : 'rgb(255, 255, 255)',
            '.MuiTypography-root': {
                fontSize: 12,
                color   : 'rgb(255, 255, 255)'
            }
        }
    }
}));

const AvatarStyled = {
    Container,
    Wrapper,
    AvatarStyle,
    PopoverStyled,
    TypeIcon
};

export default AvatarStyled;
