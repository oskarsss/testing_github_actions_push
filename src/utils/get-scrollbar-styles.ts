import { Theme } from '@mui/material';

const getScrollBarStyles = (theme: Theme) => ({
    '&::-webkit-scrollbar': {
        width  : '6px !important',
        height : '6px !important',
        opacity: ' 1 !important'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: `${theme.palette.semantic.actions.foreground.gray.secondary} !important`,
        borderRadius   : '16px !important',
        width          : '4px !important'
    },

    // style for scroll bar box
    '&::-webkit-scrollbar-track-piece:vertical': {
        width          : '4px !important',
        backgroundColor: `${theme.palette.semantic.background.white} !important`
    },
    '&::-webkit-scrollbar-track-piece:horizontal': {
        height         : '4px !important',
        backgroundColor: `${theme.palette.semantic.background.white} !important`
    }
});

export default getScrollBarStyles;
