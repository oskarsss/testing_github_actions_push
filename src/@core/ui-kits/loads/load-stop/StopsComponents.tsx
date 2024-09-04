import { styled } from '@mui/material/styles';
import MuiDivider from '@mui/material/Divider';
import { IChipColors } from '@/@core/theme/chip';
import { TableMode } from '@/@core/ui-kits/loads/load-stop/utils';
import TimelineMui from '@mui/lab/Timeline';
import MuiTimelineConnector from '@mui/lab/TimelineConnector';
import MuiButton from '@mui/material/Button';
import { AppPalette } from '@/@core/theme/palette';
import React from 'react';

type TextProps = {
    textColor?: 'primary' | 'secondary' | 'disabled';
    fontWeight?: number;
};

const HeaderText = styled('span')<TextProps>(
    ({
        theme,
        textColor = 'secondary',
        fontWeight = 500
    }) => ({
        fontSize  : '14px',
        fontWeight,
        lineHeight: 1.5,
        color     : theme.palette.semantic.text[textColor],
        whiteSpace: 'nowrap'
    })
);

const Text = styled('span')<TextProps>(({
    theme,
    textColor = 'secondary',
    fontWeight = 500
}) => ({
    fontSize    : '12px',
    fontWeight,
    lineHeight  : 1.5,
    color       : theme.palette.semantic.text[textColor],
    overflow    : 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace  : 'nowrap'
}));

const StopItemRow = styled('div')(() => ({
    display       : 'flex',
    flexDirection : 'row',
    alignItems    : 'center',
    justifyContent: 'space-between',
    gap           : '4px'
}));

const StopItemRowWrapper = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'row',
    alignItems   : 'center',
    gap          : '4px'
}));

const StopItemWrapper = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    justifyContent : 'space-between',
    padding        : '8px',
    width          : '100%',
    overflow       : 'hidden',
    backgroundColor: theme.palette.semantic.foreground.white.primary
}));

const Divider = styled(MuiDivider)(({ theme }) => ({
    backgroundColor: theme.palette.semantic.border.primary,
    borderColor    : theme.palette.semantic.border.primary,
    margin         : '0px'
}));

const ManifestId = styled('p')(({ theme }) => ({
    margin        : 0,
    color         : theme.palette.semantic.text.brand.primary,
    fontSize      : '14px',
    fontWeight    : 600,
    lineHeight    : 1.4,
    textDecoration: 'underline',
    cursor        : 'pointer',
    transition    : 'color 0.3s',
    whiteSpace    : 'nowrap',

    '&:hover': {
        color: theme.palette.semantic.text.brand.secondary
    }
}));

type TimeLineProps = {
    color: IChipColors;
    tableMode: TableMode;
    selected?: boolean;
};

const Timeline = styled(TimelineMui, {
    shouldForwardProp: (prop) => prop !== 'color' && prop !== 'tableMode' && prop !== 'selected'
})<TimeLineProps>(({
    theme,
    color,
    tableMode,
    onClick,
    selected
}) => ({
    padding   : '0px 16px',
    margin    : 0,
    flexShrink: 0,
    transition: 'background-color 0.3s, box-shadow 0.3s',
    cursor    : onClick && tableMode === TableMode.NONE ? 'pointer' : 'default',
    boxShadow : selected
        ? `inset 3px 0px 0px 0px ${theme.palette.semantic.foreground.brand.primary}`
        : undefined,
    backgroundColor:
        tableMode === TableMode.EDIT_ROUTE
            ? theme.palette.semantic.foreground.white.primary
            : 'transparent',
    '&:hover': {
        boxShadow:
            // eslint-disable-next-line no-nested-ternary
            tableMode === TableMode.NONE && onClick && !selected
                ? `inset 3px 0px 0px 0px ${theme.palette.semantic.foreground.brand.secondary}`
                : 'transparent',
        '.edit-stop-button': {
            opacity: 1
        }
    },

    '& .MuiTimelineItem-root': {
        minHeight: '60px'
    },

    '& .MuiTimelineItem-root:before': {
        margin : 0,
        padding: 0,
        flex   : 0
    },

    '& .MuiTimelineDot-root': {
        width          : 36,
        height         : 20,
        padding        : '0px 2px 0px 4px',
        borderRadius   : '4px !important',
        justifyContent : 'center',
        alignItems     : 'center',
        margin         : 0,
        zIndex         : 10,
        boxShadow      : 'none',
        backgroundColor: theme.palette.utility.foreground[color]?.primary,
        gap            : '2px',
        borderWidth    : '1px',
        borderStyle    : 'solid',
        borderColor    : theme.palette.utility.foreground[color]?.primary,
        svg            : {
            fontSize: '14px'
        },

        ...(tableMode === TableMode.EDIT_ROUTE
            ? {
                cursor: 'grab',
                svg   : {
                    fontSize: '14px',
                    color   : theme.palette.semantic.foreground.white
                }
            }
            : {}),
        ...(tableMode === TableMode.TAKE_ROUTE
            ? {
                backgroundColor: theme.palette.semantic.foreground.white.primary,
                borderColor    : theme.palette.semantic.border.primary
            }
            : {})
    },

    '& .MuiTimelineContent-root': {
        display      : 'flex',
        flexDirection: 'column',
        gap          : '8px',
        padding      : '8px 0px 0px 6px',
        marginTop    : '-8px',
        overflow     : 'hidden'
    }
}));

export type LineType = 'regular' | 'mixed' | 'none' | 'completed' | 'start';

const getBackgroundStyle = (
    type: LineType,
    palette: AppPalette,
    color: IChipColors,
    percentageProgress: number
) => {
    switch (type) {
    case 'mixed':
        return `linear-gradient(
              to bottom, 
              ${palette.utility.foreground[color]?.primary} ${percentageProgress}%, 
              ${palette.semantic.border.secondary} ${percentageProgress}%,
              ${palette.semantic.border.secondary} 100%
            )`;
    case 'regular':
        return palette.semantic.border.secondary;
    case 'completed':
        return palette.utility.foreground[color]?.primary;
    case 'start':
        return `linear-gradient(to bottom,
               ${palette.semantic.foreground.white.primary} 40%,
               ${palette.utility.foreground[color]?.primary} 40%)`;
    case 'none':
        return 'none';
    default:
        return 'none';
    }
};

type TimelineConnectorProps = {
    color: IChipColors;
    type: LineType;
    percentageProgress: number;
};

const TimelineConnector = styled(MuiTimelineConnector)<TimelineConnectorProps>(
    ({
        theme,
        color,
        type,
        percentageProgress
    }) => ({
        width   : 1,
        position: 'relative',

        svg: {
            fontSize: '18px',
            color   : theme.palette.utility.foreground[color]?.primary
        },

        '&:before': {
            content        : '""',
            position       : 'absolute',
            display        : 'block',
            top            : 0,
            left           : 0,
            width          : '100%',
            height         : '100%',
            zIndex         : 1,
            backgroundColor: theme.palette.semantic.background.white
        },

        '&:after': {
            content   : '""',
            position  : 'absolute',
            top       : 0,
            left      : 0,
            width     : '100%',
            height    : '100%',
            zIndex    : 2,
            background: getBackgroundStyle(type, theme.palette, color, percentageProgress),
            ...(type === 'start'
                ? {
                    backgroundSize  : '1px 15px',
                    backgroundRepeat: 'repeat-y'
                }
                : {})
        }
    })
);

const EditButton = styled(MuiButton)({
    padding   : '0px 10px',
    height    : '20px',
    fontSize  : '12px',
    fontWeight: 600,
    lineHeight: 1.5,
    opacity   : 0,
    transition: 'opacity 0.3s',

    '.MuiButton-icon': {
        marginRight: '4px',
        svg        : {
            width : '16px',
            height: '16px'
        }
    }
});

const StopItemTimeDivider = () => (
    <Divider
        sx={{
            width: '87%',
            ml   : 'auto'
        }}
    />
);

const StopsComponents = {
    StopItemRow,
    StopItemRowWrapper,
    StopItemWrapper,
    Text,
    Divider,
    ManifestId,
    Timeline,
    TimelineConnector,
    EditButton,
    HeaderText,
    StopItemTimeDivider
};

export default StopsComponents;
