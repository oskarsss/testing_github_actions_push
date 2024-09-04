import { styled } from '@mui/material/styles';
import { Button, IconButton } from '@mui/material';
import MuiAvatar from '@mui/material/Avatar';

export const ButtonStyled = styled(Button)(({ theme }) => ({
    color        : theme.palette.semantic.text.primary,
    minWidth     : 'auto',
    fontWeight   : 700,
    fontSize     : '12px',
    lineHeight   : '143%',
    letterSpacing: '0.17px',
    textTransform: 'capitalize',
    padding      : '1px'
}));

export const ButtonShowMore = styled('button')<{ showMore: boolean }>(({
    theme,
    showMore
}) => ({
    textTransform        : 'capitalize',
    minWidth             : 'auto',
    borderRadius         : 0,
    textAlign            : 'left',
    padding              : '0 20px 0 6px',
    color                : theme.palette.semantic.text.primary,
    display              : 'flex',
    justifyContent       : 'space-between',
    alignItems           : 'center',
    position             : 'relative',
    flexGrow             : 1,
    border               : 'none',
    backgroundColor      : 'transparent',
    outline              : 'none',
    '.MuiIconButton-root': {
        opacity   : showMore ? 1 : 0,
        transition: 'opacity 0.3s ease'
    },
    ':hover': {
        '.MuiIconButton-root': {
            opacity: 1
        }
    }
}));

export const CriticalNotification = styled(IconButton)(() => ({
    height: 38,
    width : 38
}));

type ContainerAvatarType = {
    isOnline: boolean;
};

export const Avatar = styled(MuiAvatar)<ContainerAvatarType>(({
    theme,
    isOnline
}) => ({
    height     : 38,
    width      : 38,
    marginRight: '6px',
    borderStyle: 'solid',
    borderWidth: '2px',
    borderColor: isOnline
        ? theme.palette.semantic.border.success.primary
        : theme.palette.semantic.background.secondary,
    backgroundColor: theme.palette.semantic.background.white,
    color          : theme.palette.semantic.text.secondary,
    fontFamily     : 'Inter',
    fontStyle      : 'normal',
    fontWeight     : '600',
    fontSize       : '16px',
    lineHeight     : '19px'
}));

export const Container = styled('div')(({ theme }) => ({
    width          : '95%',
    marginLeft     : '10px',
    display        : 'flex',
    flexWrap       : 'wrap',
    padding        : '6px 8px',
    backgroundColor: theme.palette.semantic.foreground.secondary,
    borderRadius   : '6px',
    marginTop      : '8px',
    paddingLeft    : '8px',
    paddingRight   : '8px',
    cursor         : 'pointer',
    minHeight      : '52px'
}));

export const DriverNameWrap = styled('div')({
    display      : 'flex',
    alignItems   : 'center',
    maxWidth     : '206px',
    whiteSpace   : 'nowrap',
    overflow     : 'hidden',
    textOverflow : 'ellipsis',
    textTransform: 'capitalize',
    gap          : '4px'
});

export const PhoneNumber = styled('div')(({ theme }) => ({
    width        : '100%',
    display      : 'flex',
    alignItems   : 'center',
    fontWeight   : 400,
    fontSize     : '10px',
    lineHeight   : '130%',
    letterSpacing: '0.15px',
    color        : theme.palette.semantic.text.secondary
}));

type DriverInfoColumnType = {
    isActive: boolean;
};

export const DriverInfoColumn = styled('div')<DriverInfoColumnType>(({ isActive }) => ({
    svg: {
        position  : 'absolute',
        left      : 'auto',
        right     : 0,
        top       : 0,
        bottom    : 0,
        margin    : 'auto',
        cursor    : 'pointer',
        transition: 'transform 0.20s ease-in-out',
        transform : isActive ? 'rotate(90deg)' : 'rotate(0deg)'
    }
}));

type ContainerProps = {
    isActive: boolean;
};

export const ContainerInfo = styled('div')<ContainerProps>(({
    theme,
    isActive
}) => ({
    backgroundColor: theme.palette.semantic.foreground.white.tertiary,
    transition     : 'all 0.20s ease-in-out',
    overflow       : 'hidden',
    display        : 'flex',
    width          : '100%',

    ...(isActive
        ? {
            opacity     : 1,
            height      : '90px',
            borderRadius: '4px',
            marginTop   : '12px'
        }
        : {
            opacity: 0,
            height : 0
        })
}));

export const InfoBlock = styled('div')(({ theme }) => ({
    height  : '88px',
    padding : '12px 8px',
    display : 'flex',
    flexWrap: 'wrap',
    color   : theme.palette.semantic.text.secondary
}));

export const Title = styled('div')(({ theme }) => ({
    width        : '100%',
    display      : 'flex',
    alignItems   : 'center',
    fontWeight   : 400,
    fontSize     : '10px',
    lineHeight   : '130%',
    letterSpacing: '0.15px',
    color        : theme.palette.semantic.text.secondary,
    svg          : {
        marginRight: '4px'
    }
}));

export const Block = styled('div')(({ theme }) => ({
    color        : theme.palette.semantic.text.primary,
    width        : '100%',
    display      : 'flex',
    alignItems   : 'flex-start',
    fontWeight   : 700,
    flexGrow     : 1,
    fontSize     : '12px',
    lineHeight   : '143%',
    letterSpacing: '0.17px',
    flexDirection: 'column'
}));

export const AddTimeOffBnt = styled(Button)(({ theme }) => ({
    fontSize  : '12px',
    lineHeight: '12px',
    padding   : '0 8px',
    color     : theme.palette.semantic.text.brand.primary,

    '.MuiButton-startIcon': {
        marginRight: '4px',

        '.MuiSvgIcon-root': {
            width : '16px',
            height: '16px'
        }
    }
}));
