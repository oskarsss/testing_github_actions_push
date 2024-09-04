import { styled } from '@mui/material/styles';

type TableBody = {
    width: number;
};

// eslint-disable-next-line import/prefer-default-export
export const Fixed = styled('div')<TableBody>(({ width }) => ({
    width    : `${width}px`,
    overflow : 'hidden',
    position : 'sticky',
    left     : 0,
    float    : 'left',
    zIndex   : 1,
    boxShadow: 'rgb(0 0 0 / 21%) 2px 0px 4px -2px'
}));
