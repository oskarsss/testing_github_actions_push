import { styled } from '@mui/material/styles';

export const Button = styled('button')(({ theme }) => ({
    width          : '100%',
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'space-between',
    marginTop      : '8px',
    paddingTop     : 0,
    paddingBottom  : 0,
    paddingLeft    : '8px',
    paddingRight   : '8px',
    border         : 'none',
    backgroundColor: 'transparent',
    transition     : 'opacity 0.3s',
    cursor         : 'pointer',

    '&:hover': {
        opacity: 0.8
    },

    svg: {
        width      : '20px',
        minWidth   : '20px',
        height     : '20px',
        marginRight: '10px',
        color      : theme.palette.semantic.foreground.primary
    }
}));

export const NotesBody = styled('div')(({ theme }) => ({
    display      : 'flex',
    alignItems   : 'center',
    width        : 'calc(100% - 60px)',
    fontWeight   : 400,
    fontSize     : '9px',
    lineHeight   : '13px',
    letterSpacing: '0.25px',
    color        : theme.palette.semantic.text.secondary,
    whiteSpace   : 'nowrap',

    span: {
        color: theme.palette.semantic.text.secondary
    },
    div: {
        padding       : '0 4px',
        marginRight   : 'auto',
        textOverflow  : 'ellipsis',
        overflow      : 'hidden',
        textTransform : 'capitalize',
        boxOrientation: 'vertical',
        lineClamp     : 1
    }
}));

export const NotesLength = styled('span')(({ theme }) => ({
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    width          : '20px',
    minWidth       : '20px',
    height         : '20px',
    borderRadius   : '100px',
    marginLeft     : '10px',
    backgroundColor: theme.palette.semantic.foreground.brand.secondary,

    fontWeight   : 700,
    fontSize     : '9px',
    textAlign    : 'center',
    letterSpacing: '0.1px',
    color        : theme.palette.semantic.text.brand.primary
}));
