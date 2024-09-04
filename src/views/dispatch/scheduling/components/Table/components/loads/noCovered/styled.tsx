import { styled } from '@mui/material/styles';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled('div')(({ theme: { palette } }) => ({
    '&::before': {
        width     : '100%',
        content   : '""',
        height    : '100%',
        overflow  : 'hidden',
        position  : 'absolute',
        background: `repeating-linear-gradient(312deg, ${palette.utility.foreground.error.secondary} 0, ${palette.utility.foreground.error.secondary} 49px, transparent 50px, transparent 80px)`
    },

    height        : 'calc(100% - 16px)',
    margin        : '0 6px',
    overflow      : 'hidden',
    display       : 'flex',
    flexDirection : 'column',
    alignItems    : 'center',
    justifyContent: 'center',
    position      : 'absolute',

    '& span': {
        position  : 'relative',
        fontSize  : '32px',
        fontWeight: 600,
        userSelect: 'none',
        color     : palette.utility.text.error
    }
}));
