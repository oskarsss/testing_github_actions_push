import { styled } from '@mui/material';

// eslint-disable-next-line import/prefer-default-export
export const Container = styled('div')(() => ({
    display       : 'flex',
    justifyContent: 'center',
    alignItems    : 'center',
    height        : '100%',
    width         : '100%',
    p             : {
        color     : 'red',
        fontSize  : '1.5rem',
        fontWeight: 500
    }
}));
