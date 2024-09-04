import MuiSwitch from '@mui/material/Switch';
import MuiButton from '@mui/material/Button';
import MuiIconButton from '@mui/material/IconButton';
import { styled } from '@mui/material';

const ContainerMap = styled('div')({
    width     : '100%',
    height    : '100%',
    fontFamily: 'inherit'
});

const Container = styled('div')(({ theme }) => ({
    position    : 'relative',
    width       : '100%',
    borderRadius: 4,
    overflow    : 'hidden',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    fontFamily  : 'inherit',

    '.mapboxgl-ctrl-bottom-right': {
        display: 'none'
    },

    '.mapboxgl-popup': {
        '.mapboxgl-popup-content': {
            borderRadius: '8px',
            padding     : '8px'
        }
    }
}));

const ContainerControllers = styled('div')(({ theme }) => ({
    position     : 'absolute',
    top          : 0,
    left         : 0,
    width        : '100%',
    height       : '100%',
    overflow     : 'hidden',
    padding      : '12px',
    display      : 'flex',
    flexDirection: 'column',
    gap          : '8px',
    pointerEvents: 'none',
    zIndex       : 1200
}));

const RowControllers = styled('div')(({ theme }) => ({
    width         : '100%',
    overflow      : 'hidden',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 'inherit'
}));

const WrapControllers = styled('div')(({ theme }) => ({
    flexGrow      : 1,
    overflow      : 'hidden',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'flex-end',
    gap           : 'inherit',
    flexShrink    : 0
}));

const ControllerFullscreen = styled('div')(({ theme }) => ({
    padding        : '4px 4px 4px 12px',
    borderRadius   : 8,
    boxShadow      : '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',
    backgroundColor: theme.palette.semantic.background.white,
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    gap            : 8,
    fontSize       : 14,
    fontWeight     : 500,
    color          : theme.palette.semantic.text.primary,
    lineHeight     : 1.66,
    letterSpacing  : '0.4px',
    height         : 36,
    pointerEvents  : 'auto'
}));

const ControllerSatellite = styled(MuiIconButton)(({ theme }) => ({
    padding        : '4px 8px',
    borderRadius   : 8,
    boxShadow      : '0px 4px 16px 0px rgba(0, 0, 0, 0.08)',
    backgroundColor: theme.palette.semantic.background.white,
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    height         : 36,
    pointerEvents  : 'auto',

    '&:hover': {
        backgroundColor: theme.palette.semantic.background.secondary
    }
}));

const GeoUser = styled(MuiButton, {
    shouldForwardProp(propName) {
        return propName !== 'no_location';
    }
})<{ no_location?: boolean }>(({
    theme,
    no_location
}) => ({
    padding        : '6px',
    backgroundColor: no_location
        ? theme.palette.utility.foreground.error.tertiary
        : theme.palette.semantic.background.white,
    color: no_location
        ? theme.palette.utility.foreground.error.primary
        : theme.palette.semantic.text.primary,
    textTransform: 'none',
    borderRadius : 8,
    letterSpacing: '0.4px',
    height       : 32,
    gap          : 4,
    right        : 'auto',
    fontSize     : 12,
    lineHeight   : 1.5,
    overflow     : 'hidden',
    pointerEvents: 'auto',
    minWidth     : 'fit-content',

    '&:hover': {
        backgroundColor: theme.palette.semantic.background.secondary
    },

    '& .MuiDivider-root': {
        margin         : 0,
        width          : 1,
        height         : 20,
        backgroundColor: theme.palette.semantic.border.secondary
    }
}));

const ViewInGoogleMaps = styled(GeoUser)(({ theme }) => ({
    // position: 'absolute',
    // zIndex  : 1,
    // bottom  : 12,

    // right                         : 12,
    // [theme.breakpoints.down('xl')]: {
    //     bottom: 0,
    //     left  : 0,
    //     right : 'auto'
    // },
    margin: 0,
    width : '40px',
    height: '32px',

    p: {
        margin: 0
    }
}));

const BgFullScreenIcon = (isWhite: boolean) =>
    `url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 1.77778V5.33333H1.77778V1.77778H5.33333V0H1.77778C0.8 0 0 0.8 0 1.77778ZM1.77778 10.6667H0V14.2222C0 15.2 0.8 16 1.77778 16H5.33333V14.2222H1.77778V10.6667ZM14.2222 14.2222H10.6667V16H14.2222C15.2 16 16 15.2 16 14.2222V10.6667H14.2222V14.2222ZM14.2222 0H10.6667V1.77778H14.2222V5.33333H16V1.77778C16 0.8 15.2 0 14.2222 0Z" fill="${
        isWhite ? 'white' : '%23BDC7D2'
    }" /></svg>')`;

const BgNoFullScreenIcon = (isWhite: boolean) =>
    `url('data:image/svg+xml,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.05425 3.55572V0.500163H4.83203V3.33349C4.83203 4.16192 4.16046 4.8335 3.33203 4.8335H0.498698V4.05572H3.55425H4.05425V3.55572Z" stroke="${
        isWhite ? 'white' : '%23BDC7D2'
    }" stroke-linecap="round"/><path d="M11.9457 3.55572V0.500163H11.168V3.33349C11.168 4.16192 11.8395 4.8335 12.668 4.8335H15.5013V4.05572H12.4457H11.9457V3.55572Z" stroke="${
        isWhite ? 'white' : '%23BDC7D2'
    }" stroke-linecap="round"/><path d="M11.9457 12.4443V15.4998H11.168V12.6665C11.168 11.8381 11.8395 11.1665 12.668 11.1665H15.5013V11.9443H12.4457H11.9457V12.4443Z" stroke="${
        isWhite ? 'white' : '%23BDC7D2'
    }" stroke-linecap="round"/><path d="M4.05425 12.4443V15.4998H4.83203V12.6665C4.83203 11.8381 4.16046 11.1665 3.33203 11.1665H0.498698V11.9443H3.55425H4.05425V12.4443Z" stroke="${
        isWhite ? 'white' : '%23BDC7D2'
    }" stroke-linecap="round"/></svg>')`;

const Switch = styled(MuiSwitch)(({ theme }) => ({
    width                    : 56,
    height                   : 28,
    borderRadius             : 100,
    padding                  : 0,
    '& .MuiSwitch-switchBase': {
        padding        : 0,
        transform      : 'translateX(0px)',
        '&.Mui-checked': {
            color                      : '#fff',
            transform                  : 'translateX(28px)',
            '& .MuiSwitch-thumb:before': {
                backgroundImage: BgFullScreenIcon(true)
            },
            '& + .MuiSwitch-track': {
                opacity        : 1,
                backgroundColor: theme.palette.semantic.background.secondary
            }
        }
    },
    '& .MuiSwitch-thumb': {
        backgroundColor: theme.palette.semantic.foreground.brand.primary,
        width          : 28,
        height         : 28,
        '&:before'     : {
            content           : "''",
            position          : 'absolute',
            width             : '100%',
            height            : '100%',
            left              : 0,
            top               : 0,
            backgroundRepeat  : 'no-repeat',
            backgroundPosition: 'center',
            backgroundImage   : BgNoFullScreenIcon(true)
        }
    },

    '& .MuiSwitch-track': {
        borderRadius       : 22 / 2,
        opacity            : 1,
        backgroundColor    : theme.palette.semantic.background.secondary,
        '&:before, &:after': {
            content  : '""',
            position : 'absolute',
            top      : '50%',
            transform: 'translateY(-50%)',
            width    : 16,
            height   : 16
        },
        '&:before': {
            backgroundImage: BgNoFullScreenIcon(false),
            left           : 6
        },
        '&:after': {
            backgroundImage: BgFullScreenIcon(false),
            right          : 6
        }
    }
}));

const LoadMapStyled = {
    ContainerMap,
    Container,
    ContainerControllers,
    RowControllers,
    WrapControllers,
    ControllerFullscreen,
    ControllerSatellite,
    GeoUser,
    ViewInGoogleMaps,
    Switch
};

export default LoadMapStyled;
