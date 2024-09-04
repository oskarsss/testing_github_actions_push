import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
    width        : '100%',
    minWidth     : 'calc(100% - 8px)',
    position     : 'relative',
    zIndex       : 2,
    display      : 'flex',
    flexDirection: 'column',
    borderRadius : '4px',

    // padding        : '6px 8px',
    // padding        : '6px 0px',
    paddingBottom: '6px',

    // marginRight    : '8px',
    justifyContent : 'space-between',
    backgroundColor: theme.palette.semantic.foreground.white.tertiary
}));

// colors_semantic-foreground-white-tertiary
export const Top = styled('div')({
    display: 'flex',
    width  : '100%'
});

export const Wrap = styled('div')({
    width         : '100%',
    display       : 'flex',
    flexWrap      : 'wrap',
    justifyContent: 'space-between'
});
