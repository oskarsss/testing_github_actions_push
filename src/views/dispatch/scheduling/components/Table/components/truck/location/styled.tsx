import { styled } from '@mui/material/styles';
import GpsFixed from '@mui/icons-material/GpsFixed';
import IconButton from '@mui/material/IconButton';
import { Button } from '@mui/material';

export const Container = styled('div')(
    ({
        isOnline,
        theme
    }: { isOnline: boolean; theme?: any }) => ({
        width     : '100%',
        display   : 'flex',
        alignItems: 'center',

        // backgroundColor: isOnline ? '#f3ffeb' : 'inherit',
        paddingTop  : '6px',
        paddingLeft : '8px',
        paddingRight: '6px',
        marginBottom: '-2px'
    })
);

export const LocationWrap = styled('div')({
    display    : 'flex',
    alignItems : 'center',
    fontSize   : '10px',
    padding    : '4px 0',
    marginRight: 'auto'
});

type GpsIconProps = {
    isOnline: boolean;
};

export const GpsIcon = styled(GpsFixed)<GpsIconProps>(({
    theme,
    isOnline
}) => ({
    width   : '14px',
    minWidth: '14px',
    height  : '14px',
    color   : isOnline
        ? theme.palette.utility.foreground.success.primary
        : theme.palette.semantic.foreground.primary
}));

export const Address = styled('div')(({ theme }) => ({
    fontWeight   : 700,
    lineHeight   : '143%',
    letterSpacing: '0.17px',
    color        : theme.palette.semantic.text.primary,
    marginLeft   : '8px'
}));

export const LocationUpdated = styled('div')(({ theme }) => ({
    fontWeight   : 400,
    lineHeight   : '157%',
    letterSpacing: '0.1px',
    color        : theme.palette.semantic.text.secondary,
    margin       : '0 6px',
    textWrap     : 'nowrap'
}));

type IconButtonType = {
    active: boolean;
};

export const IconButtonStyled = styled(IconButton)<IconButtonType>(({
    theme,
    active
}) => ({
    marginLeft: 2,
    color     : active
        ? theme.palette.semantic.foreground.brand.primary
        : theme.palette.semantic.foreground.primary
}));

export const IconButtonOnline = styled(IconButton)<IconButtonType>(({
    theme,
    active
}) => ({
    marginLeft: 2,
    color     : active
        ? theme.palette.utility.foreground.success.primary
        : theme.palette.semantic.foreground.primary
}));

export const ButtonStyled = styled(Button)(({ theme }) => ({
    padding       : '1px 2px',
    textTransform : 'capitalize',
    minWidth      : 'auto',
    borderRadius  : 0,
    textAlign     : 'left',
    color         : theme.palette.semantic.text.primary,
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'flex-start'
}));

export const ButtonLocation = styled(Button)(({ theme }) => ({
    color        : theme.palette.semantic.text.primary,
    minWidth     : 'auto',
    fontWeight   : 700,
    fontSize     : '12px',
    lineHeight   : '143%',
    letterSpacing: '0.17px',
    textTransform: 'capitalize',
    padding      : '1px',
    textAlign    : 'left'
}));

export const ContainerNoLoc = styled('div')({
    display   : 'flex',
    alignItems: 'center',

    '.MuiButtonBase-root': {
        textTransform: 'capitalize',
        fontSize     : '12px',
        whiteSpace   : 'nowrap',
        padding      : '0 4px',
        height       : '26px',
        marginLeft   : '4px',
        lineHeight   : '12px',

        '.MuiButton-endIcon': {
            marginLeft: '2px',

            svg: {
                width : '14px',
                height: '14px'
            }
        }
    }
});

export const NoLocationChip = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'center',
    gap           : '4px',
    fontWeight    : 600,
    padding       : '0px 4px',
    minHeight     : 22,
    borderRadius  : 4,
    fontSize      : 12,
    background    : theme?.palette.utility.foreground.error.tertiary,
    color         : theme?.palette.utility.foreground.error.primary,

    svg: {
        fontSize: '14px'
    }
}));
