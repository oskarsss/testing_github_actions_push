import { styled } from '@mui/material/styles';
import { Box, Stack } from '@mui/material';
import { IChipColors, StatusChipStyled } from '@/@core/theme/chip';

const Container = styled('div')(({ theme }) => ({
    width        : '50%',
    marginTop    : '20px',
    background   : theme.palette.semantic.foreground.white.tertiary,
    boxShadow    : '0px 2px 10px 0px rgba(58, 53, 65, 0.1)',
    borderRadius : '5px',
    height       : 'auto',
    overflow     : 'hidden',
    display      : 'flex',
    flexDirection: 'column'
}));

const ContentBlock = styled('div')(() => ({
    width   : '100%',
    height  : '100%',
    overflow: 'hidden'
}));

const HeaderBlock = styled(Box)(({ theme }) => ({
    minHeight      : 49,
    maxHeight      : 49,
    height         : 49,
    display        : 'flex',
    flex           : '1 1 0',
    overflow       : 'auto',
    scrollbarWidth : 'none',
    borderBottom   : `1px solid ${theme.palette.semantic.border.secondary}`,
    '.MuiTabs-root': {
        margin             : 0,
        '.MuiTabs-scroller': {
            overflow: 'initial'
        }
    },
    '&::-webkit-scrollbar': {
        display: 'none'
    }
}));

const Map = styled('div')({
    height       : '100%',
    overflow     : 'hidden',
    display      : 'flex',
    flexDirection: 'column'
});

const MapHeader = styled('div')(({ theme }) => ({
    padding       : '12px 16px',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    borderBottom  : `1px solid ${theme.palette.semantic.border.secondary}`
}));

const MapHeaderButtons = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : 12
});

const MapEmptyScreen = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    height        : '100%',
    overflow      : 'hidden'
});

const Device = styled('div')<{ disabled?: boolean }>(({
    theme,
    disabled
}) => ({
    display         : 'flex',
    alignItems      : 'center',
    justifyContent  : 'space-between',
    padding         : '12px 16px',
    borderBottom    : `1px solid ${theme.palette.semantic.border.secondary}`,
    '&:last-of-type': {
        borderBottom: 'none'
    },
    '.MuiAccordionSummary-content': {
        margin          : 0,
        justifyContent  : 'space-between',
        '&.Mui-expanded': {
            margin: 0
        }
    },

    ...(disabled
        ? {}
        : {
            '&:hover': {
                cursor    : 'pointer',
                background: theme.palette.semantic.background.secondary
            }
        })
}));

const RightPanel = styled('div')(({ theme }) => ({
    position     : 'absolute',
    width        : 450,
    maxHeight    : '45%',
    overflow     : 'auto',
    top          : '12px',
    left         : '12px',
    zIndex       : 1,
    borderRadius : '8px',
    background   : theme.palette.semantic.background.white,
    padding      : '16px',
    display      : 'flex',
    flexDirection: 'column',
    gap          : 24,
    boxShow      : '4px 4px 16px 0 #7587AA4D'
}));

const RightPanelBlockInfoWrap = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    gap          : 12
});

const RightPanelBlockInfo = styled('div')(({ theme }) => ({
    display   : 'flex',
    alignItems: 'center',
    gap       : '8px',
    svg       : {
        fill: theme.palette.semantic.foreground.brand.primary
    }
}));

const RightPanelBlockInfoContent = styled('div')(({ theme }) => ({
    padding         : '12px 16px',
    border          : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius    : '4px',
    '&:last-of-type': {
        padding: 0
    },
    '.MuiTypography-body2': {
        display       : 'flex',
        alignItems    : 'center',
        justifyContent: 'center',
        height        : 48
    }
}));

const PopupWrapper = styled('div')({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    gap           : 8
});

const Vehicle = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'flex-start',
    gap           : 12,
    padding       : '0 10px',
    '&:hover'     : {
        cursor    : 'pointer',
        background: theme.palette.semantic.background.secondary
    }
}));

const VehicleLeft = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : 8
});

const VehicleRight = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : 5
});

const TabLabel = styled(Stack)<{ count?: number }>(({
    theme,
    count
}) => ({
    flexDirection: 'row',
    alignItems   : 'center',
    position     : 'relative',
    ...(count && {
        '&:after': {
            content   : `'${count}'`,
            minWidth  : '22px',
            padding   : '0px 5px',
            flexShrink: 0,
            marginLeft: '2px',
            position  : 'relative',
            zIndex    : 1,
            color     : theme.palette.utility.foreground.error.primary
        },
        '&:before': {
            content        : `'${count}'`,
            position       : 'absolute',
            right          : 0,
            zIndex         : 0,
            borderRadius   : '50%',
            padding        : '2px 5px',
            minWidth       : '22px',
            flexShrink     : 0,
            backgroundColor: theme.palette.utility.foreground.error.secondary,
            color          : 'transparent'
        }
    })
}));

type WrapProps = {
    color: IChipColors;
};

export const WrapGeoIcon = styled(StatusChipStyled)<WrapProps>(({
    theme,
    color
}) => ({
    padding: '0 2px',
    '& svg': {
        width   : '20px',
        minWidth: '20px',
        height  : '20px',
        color   : theme.palette.utility.text[color]
    }
}));

const CenterStyled = {
    Container,
    ContentBlock,
    HeaderBlock,
    MapEmptyScreen,
    Map,
    MapHeader,
    MapHeaderButtons,
    Device,
    RightPanel,
    RightPanelBlockInfoWrap,
    RightPanelBlockInfo,
    RightPanelBlockInfoContent,
    PopupWrapper,
    Vehicle,
    VehicleLeft,
    VehicleRight,
    TabLabel,
    WrapGeoIcon
};

export default CenterStyled;
