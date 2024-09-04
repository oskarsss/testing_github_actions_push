import { styled } from '@mui/material/styles';
import { Box, Paper, TextField } from '@mui/material';
import Stack from '@mui/material/Stack';
import PerfectScrollbar from 'react-perfect-scrollbar';

export const IconWrapper = styled(Box)(() => ({
    height        : '30px',
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center'
}));

export const ItemPaper = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.semantic.foreground.white.tertiary,
    padding        : '12px',
    cursor         : 'pointer'
}));

export const ItemsWrapper = styled(Stack)(() => ({
    padding: '10px 10px',
    gap    : '10px'
}));

export const ScrollBar = styled(PerfectScrollbar)(({ theme }) => ({
    backgroundColor:
        theme.palette.mode === 'dark'
            ? theme.palette.semantic.background.primary
            : theme.palette.semantic.background.secondary
}));

export const SearchField = styled(TextField)(({ theme }) => ({
    borderRadius        : '4px',
    backgroundColor     : theme.palette.mode === 'light' ? '#F4F5FA' : 'rgba(255, 255, 255, 0.08)',
    padding             : '4px 8px',
    maxWidth            : '400px',
    width               : '100%',
    '.MuiInputBase-root': {
        height               : '36px',
        '.MuiInputBase-input': {
            padding: '0'
        }
    }
}));
