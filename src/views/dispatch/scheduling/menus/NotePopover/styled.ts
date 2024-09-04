import { styled } from '@mui/material/styles';

export const ButtonClose = styled('button')(({ theme }) => ({
    display        : 'flex',
    alignItems     : 'center',
    justifyContent : 'center',
    width          : '50px',
    height         : '50px',
    border         : 'none',
    borderLeft     : '1px solid #E5E5E5',
    backgroundColor: 'transparent',
    borderColor    : theme.palette.semantic.border.secondary,
    cursor         : 'pointer',
    transition     : 'opacity 250ms',
    '&:hover'      : {
        opacity: 0.7
    },
    svg: {
        fill: theme.palette.semantic.foreground.primary
    }
}));
