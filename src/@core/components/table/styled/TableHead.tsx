import { styled, Theme } from '@mui/material/styles';

type TableBody = {
    width: number;
    theme?: Theme;
};

// eslint-disable-next-line import/prefer-default-export
export const Fixed = styled('div')<TableBody>(({
    width,
    theme
}) => ({
    width      : `${width}px`,
    borderRight: `4px solid ${theme.palette.semantic.border.secondary}`,

    overflow : 'hidden',
    position : 'sticky',
    left     : 0,
    float    : 'left',
    zIndex   : 3,
    boxShadow: 'rgb(0 0 0 / 21%) 2px 0px 4px -2px'

    // filter      : 'brightness(0.95)',
    // WebkitFilter: 'brightness(0.95)'
}));
