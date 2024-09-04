/* eslint-disable max-len */

import { Tooltip, Typography, createSvgIcon, styled } from '@mui/material';
import { IChipColors } from '@/@core/theme/chip';
import { LoadModel_Stop_Type } from '@proto/models/model_load';
import ManifestsTypes from '@/store/dispatch/manifests/types';
import VectorIcons from '@/@core/icons/vector_icons';
import {
    MANIFEST_STOP_TYPE_COLORS,
    MANIFEST_STOP_TYPE_ICONS
} from '@/@core/theme/entities/manifests/stop-type';
import { ManifestStopTypes } from '@/models/manifests/manifest-stop';
import { LOAD_STOP_TYPE_COLORS } from '@/@core/theme/entities/load/stop_type';
import { LoadStopTypes } from '@/models/loads/load-stop';
import { ManifestModel_ManifestStop_Type } from '@proto/models/model_manifest';
import { useMemo } from 'react';
import { PreparedMapStop } from '../../utils';
import StopMarkerPopupContent from '../../popups/stop-popup/Content';

type MarkerWrapperProps = { selected: boolean; otherStop: boolean; showTime: boolean };

const MarkerWrapper = styled('div', {
    shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'otherStop' && prop !== 'showTime'
})<MarkerWrapperProps>(({
    theme,
    selected,
    otherStop,
    showTime
}) => ({
    width   : '100%',
    height  : '100%',
    position: 'relative',
    display : 'flex',
    minWidth: showTime ? '100px' : '42px',

    // minWidth       : '142px',
    minHeight      : '42px',
    backgroundColor: theme.palette.semantic.foreground.white.primary,
    borderRadius   : '4px',
    cursor         : 'pointer',
    gap            : showTime ? '8px' : 0,
    boxSizing      : 'border-box',
    ...(selected && {
        boxShadow: `0px 0px 30px 10px ${theme.palette.utility.icon.ocean.primary}`
    }),
    ...(otherStop
        ? {
            backgroundColor: theme.palette.utility.foreground.warning.tertiary
        }
        : {})
}));

const SequenceStyled = styled('div')<{ color: IChipColors }>(({
    theme,
    color
}) => ({
    boxSizing      : 'border-box',
    color          : theme.palette.semantic.text.white,
    fontSize       : '1.5rem',
    backgroundColor: theme.palette.utility.foreground[color].primary,
    width          : '100%',
    height         : '100%',
    minHeight      : '42px',
    borderRadius   : '4px',
    maxWidth       : '42px',
    boxShadow      : '0px 0px 4px 0px rgba(0,0,0,0.75) inset',
    display        : 'flex',
    justifyContent : 'center',
    alignItems     : 'center',
    flex           : '1 1 100%',
    minWidth       : '42px',
    fontWeight     : 700
}));

const Info = styled('div')(({ theme }) => ({
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'flex-start',
    justifyContent: 'center',
    fontSize      : '12px',
    fontWeight    : 600,
    paddingRight  : '4px'
}));

const Time = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'otherStop'
})<{ otherStop: boolean }>(({
    theme,
    otherStop
}) => ({
    color     : otherStop ? theme.palette.utility.text.warning : theme.palette.semantic.text.primary,
    fontSize  : '14px',
    fontWeight: 600,
    lineHeight: '16px'
}));

const Date = styled(Typography, {
    shouldForwardProp: (prop) => prop !== 'otherStop'
})<{ otherStop: boolean }>(({
    theme,
    otherStop
}) => ({
    color     : otherStop ? theme.palette.utility.text.warning : theme.palette.semantic.text.secondary,
    fontSize  : '12px',
    fontWeight: 500,
    lineHeight: '16px'
}));

const ArrowBottomSvg = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="12"
        height="10"
        viewBox="0 0 12 10"
        fill="none"
    >
        <path
            d="M1.53008 3.19949L5.06094 8.2751C5.63162 9.09545 6.85332 9.07093 7.39062 8.22834L10.6272 3.15273C11.2215 2.22078 10.5521 1 9.44682 1H2.67935C1.54858 1 0.884341 2.27124 1.53008 3.19949Z"
            fill="htmlColor"
            stroke="white"
            strokeWidth="1.4"
        />
    </svg>,
    'ArrowBottomSvg'
);

const ArrowWrapper = styled('div')<{ selected: boolean }>(({
    theme,
    selected
}) => ({
    // position: 'relative',
    svg: {
        fill: `${
            selected
                ? theme.palette.utility.icon.ocean.primary
                : theme.palette.utility.foreground.gray.primary
        } !important`
    },

    '&.future_selected': {
        svg: {
            fill: '#D2DEFD !important'
        }
    },
    '&.now_selected': {
        svg: {
            fill: '#EDFFEA !important'
        }
    }
}));

const CompletedIcon = createSvgIcon(
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
    >
        <rect
            x="0.332031"
            y="0.333008"
            width="13.3333"
            height="13.3333"
            rx="6.66667"
            fill="white"
        />
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M6.9987 13.6663C10.6806 13.6663 13.6654 10.6816 13.6654 6.99967C13.6654 3.31778 10.6806 0.333008 6.9987 0.333008C3.3168 0.333008 0.332031 3.31778 0.332031 6.99967C0.332031 10.6816 3.3168 13.6663 6.9987 13.6663ZM10.1552 5.45187C10.405 5.18132 10.3881 4.75954 10.1176 4.50981C9.84701 4.26007 9.42523 4.27694 9.1755 4.54749L5.97306 8.0168L4.8219 6.76971C4.57217 6.49917 4.1504 6.4823 3.87985 6.73203C3.6093 6.98177 3.59243 7.40354 3.84217 7.67409L5.48319 9.45187C5.6094 9.58859 5.78699 9.66634 5.97306 9.66634C6.15913 9.66634 6.33672 9.58859 6.46293 9.45186L10.1552 5.45187Z"
            fill="#21B204"
        />
    </svg>,
    'CompletedIcon'
);

const CompletedIconWrapper = styled('div')(() => ({
    position: 'absolute',
    right   : -11,
    top     : -11
}));

type Props = {
    stop: PreparedMapStop;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onMouseEnter?: () => void;
    isSelected?: boolean;
    showArrow: boolean;
    highlightArrow: boolean;
    sx?: any;
    mainLoadId?: string;
};

function Sequence({ stop }: { stop: PreparedMapStop }) {
    if (
        stop.originType === ManifestsTypes.OriginType.MANIFEST &&
        (stop.type === ManifestModel_ManifestStop_Type.START ||
            stop.type === ManifestModel_ManifestStop_Type.END)
    ) {
        return (
            <SequenceStyled color={MANIFEST_STOP_TYPE_COLORS[ManifestStopTypes[stop.type]]}>
                {MANIFEST_STOP_TYPE_ICONS[ManifestStopTypes[stop.type]]}
            </SequenceStyled>
        );
    }
    return (
        <SequenceStyled
            color={
                stop.originType === ManifestsTypes.OriginType.LOAD
                    ? LOAD_STOP_TYPE_COLORS[LoadStopTypes[stop.type as LoadModel_Stop_Type]]
                    : MANIFEST_STOP_TYPE_COLORS[ManifestStopTypes[stop.type]]
            }
        >
            {stop.sequence}
        </SequenceStyled>
    );
}

function StopMarkerContent({
    stop,
    onClick,
    onMouseEnter,
    isSelected = false,
    showArrow,
    highlightArrow,
    sx = {},
    mainLoadId
}: Props) {
    const otherStop = mainLoadId ? mainLoadId !== stop.loadId || !stop.loadId : false;

    const showTime = useMemo(() => {
        if (
            stop.originType === ManifestsTypes.OriginType.MANIFEST &&
            (stop.type === ManifestModel_ManifestStop_Type.START ||
                stop.type === ManifestModel_ManifestStop_Type.END)
        ) {
            return false;
        }
        return true;
    }, [stop.originType, stop.type]);
    return (
        <Tooltip
            title={<StopMarkerPopupContent stop={stop} />}
            arrow
            TransitionProps={{ timeout: 1 }}
            placement="top"
            slotProps={{
                tooltip: {
                    sx: {
                        padding   : 0,
                        background: 'none',
                        boxShadow : '0px 0px 4px 2px rgba(0, 0, 0, 0.2)'
                    }
                },
                arrow: {
                    sx: {
                        color: ({ palette }) => palette.semantic.foreground.white.primary
                    }
                }
            }}
        >
            <MarkerWrapper
                showTime={showTime}
                selected={isSelected}
                onMouseEnter={onMouseEnter}
                onClick={onClick}
                sx={sx}
                otherStop={otherStop}
            >
                {stop.isCompleted && showTime && (
                    <CompletedIconWrapper>
                        <CompletedIcon />
                    </CompletedIconWrapper>
                )}
                {stop.lateness > 0 && showTime && (
                    <CompletedIconWrapper>
                        <VectorIcons.RushingTimeIcon color="error" />
                    </CompletedIconWrapper>
                )}
                {stop.earliness > 0 && showTime && (
                    <CompletedIconWrapper>
                        <VectorIcons.RushingTimeIcon color="success" />
                    </CompletedIconWrapper>
                )}
                <Sequence stop={stop} />
                {showTime && (
                    <Info>
                        <Time otherStop={otherStop}>{stop.markerDisplayTime.time}</Time>
                        <Date otherStop={otherStop}>
                            {stop.markerDisplayTime.month} {stop.markerDisplayTime.day}
                        </Date>
                    </Info>
                )}
                {showArrow && (
                    <ArrowWrapper selected={highlightArrow}>
                        <ArrowBottomSvg
                            sx={{
                                zIndex   : 1000,
                                position : 'absolute',
                                bottom   : '-85%',
                                left     : '50%',
                                transform: 'translate(-50%, -50%)'
                            }}
                        />
                    </ArrowWrapper>
                )}
            </MarkerWrapper>
        </Tooltip>
    );
}

export default StopMarkerContent;
