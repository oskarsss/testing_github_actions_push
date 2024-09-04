/* eslint-disable no-nested-ternary */
import { styled } from '@mui/material/styles';
import PerfectScrollbarComponent from 'react-perfect-scrollbar';
import MuiAvatar from '@mui/material/Avatar';
import { Theme } from '@mui/material';
import Typography from '@mui/material/Typography';

export const Container = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    flex         : '1 1 100%',
    overflow     : 'hidden'
});

export const PerfectScrollbar = styled(PerfectScrollbarComponent)({
    '& .ps__rail-y': {
        width: '6px !important'
    },
    '& .ps__thumb-y': {
        width: '4px !important',
        right: '1px !important'
    }
});

export const Avatar = styled(MuiAvatar)(() => ({
    width   : '24px',
    height  : '24px',
    fontSize: '14px'
}));

export const Message = styled('span')<{
    is_it_me: boolean;
    theme?: Theme;
}>(({
    theme,
    is_it_me
}) => ({
    width                      : '100%',
    fontSize                   : 'inherit',
    wordBreak                  : 'break-word',
    fontWeight                 : 500,
    lineHeight                 : '14px',
    color                      : is_it_me ? '#FFFFFF' : theme.palette.semantic.text.primary,
    'svg[aria-label="cleared"]': {
        path: {
            fill: theme.palette.utility.foreground.error.primary
        }
    },
    path: {
        fill: theme.palette.semantic.foreground.brand.primary
    }
}));

export const FileContainer = styled('div')(({ theme }) => ({
    lineHeight   : 1.5,
    color        : theme.palette.semantic.text.primary,
    transition   : 'background-color 0.2s ease-in-out',
    display      : 'flex',
    flexDirection: 'column',
    alignItem    : 'center',
    flex         : '1 1 100%',
    gap          : '8px',
    overflow     : 'hidden',

    svg: {
        color: theme.palette.semantic.foreground.quarterary
    }
}));

export const Title = styled('p')(({ theme }) => ({
    fontSize    : 'inherit',
    margin      : 0,
    fontWeight  : 700,
    lineHeight  : '20px',
    overflow    : 'hidden',
    textOverflow: 'ellipsis',
    color       : theme.palette.semantic.text.primary,
    position    : 'relative',

    '& span': {
        color     : theme.palette.semantic.text.secondary,
        fontWeight: 400
    }
}));

export const NoteHiddenTime = styled('span')<{
    size: 'small' | 'normal';
    is_it_me: boolean;
}>(({
    theme,
    size,
    is_it_me
}) => ({
    float            : 'right',
    marginInlineStart: '5px',
    paddingInlineEnd : '8px',
    visibility       : 'hidden',
    fontSize         : size === 'small' ? '10px' : '12px',
    lineHeight       : size === 'small' ? 0.9 : 1.5,
    fontWeight       : 500,
    color            : is_it_me ? 'rgba(255, 255, 255, 0.75)' : theme.palette.semantic.text.secondary
}));

export const NoteVisibleTime = styled('span')({
    position      : 'absolute',
    bottom        : 0,
    display       : 'flex',
    alignItems    : 'center',
    whiteSpace    : 'nowrap',
    right         : 0,
    visibility    : 'visible',
    insetInlineEnd: '0px',
    gap           : 2,
    marginBottom  : 4,
    paddingRight  : 6
});

export const NoteBodyContainer = styled('div')({
    display: 'flex',
    width  : '100%'
});

export const TodayTitle = styled(Typography)<{ size: 'small' | 'normal' }>(({
    theme,
    size
}) => ({
    position             : 'relative',
    fontSize             : size === 'small' ? '12px' : '14px',
    fontWeight           : 500,
    lineHeight           : '20px',
    '&::before, &::after': {
        content  : '""',
        width    : size === 'small' ? '40%' : '45%',
        borderTop: `1px solid ${theme.palette.semantic.border.primary}`,
        position : 'absolute',
        top      : '50%',
        transform: 'translateY(-50%)'
    },
    '&::before': {
        left: 0
    },
    '&::after': {
        right: 0
    }
}));
