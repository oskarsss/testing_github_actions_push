import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';

export const Container = styled('div')(() => ({
    display      : 'flex',
    flexDirection: 'column'
}));
export const Button = styled(MuiButton)(({ theme }) => ({
    width            : 'max-content',
    padding          : '6px 12px !important',
    backgroundColor  : theme.palette.mode === 'light' ? '#F4F5FA' : 'rgba(255, 255, 255, 0.08)',
    border           : '1px solid',
    borderColor      : theme.palette.mode === 'light' ? '#F4F5FA' : 'rgba(255, 255, 255, 0.08)',
    borderRadius     : '4px !important',
    color            : 'inherit !important',
    marginTop        : '16px',
    '&:first-of-type': {
        marginTop: 0
    },
    svg: {
        fontSize: '24px',
        color   : theme.palette.semantic.text.secondary
    },
    p: {
        margin       : '0 0 0 10px',
        fontWeight   : 500,
        fontSize     : '14px',
        lineHeight   : 1.43,
        letterSpacing: '0.17px'
    },
    '&:hover': {
        backgroundColor: theme.palette.mode === 'light' ? '#F4F5FA' : 'rgba(255, 255, 255, 0.08)',
        borderColor    : theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.08)' : '#F4F5FA'
    }
}));
