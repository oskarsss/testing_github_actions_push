import { styled } from '@mui/material';

const Container = styled('div')(({ theme }) => ({
    position    : 'relative',
    width       : '100%',
    borderRadius: 4,
    overflow    : 'hidden',
    border      : `1px solid ${theme.palette.semantic.border.secondary}`,
    fontFamily  : 'inherit',

    '.mapboxgl-ctrl-bottom-right': {
        display: 'none'
    },

    '.mapboxgl-popup': {
        '.mapboxgl-popup-content': {
            borderRadius: '8px',
            padding     : '8px'
        }
    }
}));

const Map = styled('div')({
    width     : '100%',
    height    : '100%',
    fontFamily: 'inherit'
});

const GeneralMapStyled = {
    Container,
    Map
};

export default GeneralMapStyled;
