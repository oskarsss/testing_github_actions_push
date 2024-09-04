import { styled, Typography } from '@mui/material';
import MuiButton from '@mui/material/Button';

type LocationIconProps = {
    currentLocation: boolean;
    noLocation: boolean;
};

const LocationIconWrapper = styled('div')<LocationIconProps>(
    ({
        theme,
        currentLocation,
        noLocation
    }) => ({
        width          : '24px',
        height         : '24px',
        borderRadius   : '50%',
        flexShrink     : 0,
        display        : 'flex',
        alignItems     : 'center',
        justifyContent : 'center',
        backgroundColor: currentLocation
            ? theme.palette.semantic.foreground.brand.secondary
            : theme.palette.semantic.foreground.secondary,

        ...(noLocation
            ? {
                backgroundColor: theme.palette.utility.foreground.error.secondary
            }
            : {}),

        '& svg': {
            width : '16px',
            height: '16px',
            color : currentLocation
                ? theme.palette.semantic.foreground.brand.primary
                : theme.palette.semantic.foreground.primary,

            ...(noLocation
                ? {
                    color: theme.palette.utility.foreground.error.primary
                }
                : {})
        }
    })
);

const MainTextCell = styled(Typography)(({ theme }) => ({
    color     : theme.palette.semantic.text.secondary,
    fontSize  : '12px',
    fontWeight: 500,
    lineHeight: '18px'
}));

const SecondaryTextCell = styled(Typography)(({ theme }) => ({
    color     : theme.palette.semantic.text.secondary,
    fontSize  : '12px',
    fontWeight: 400,
    lineHeight: '18px',
    marginTop : '-3px'
}));

const HeaderContainer = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 8,
    paddingTop    : '10px'
});

const HeaderButton = styled(MuiButton)({
    padding     : '0px 12px',
    height      : '36px',
    borderRadius: '8px',
    fontSize    : '14px',
    fontWeight  : 600,

    '.MuiButton-icon.MuiButton-startIcon': {
        marginRight: '4px',
        svg        : {
            fontSize: '16px'
        }
    }
});

const HeaderWrapper = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : 8
});

const CapListStyled = {
    MainTextCell,
    SecondaryTextCell,
    LocationIconWrapper,
    Header: {
        Container: HeaderContainer,
        Wrapper  : HeaderWrapper,
        Button   : HeaderButton
    }
};

export default CapListStyled;
