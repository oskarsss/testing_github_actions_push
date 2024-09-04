import { styled } from '@mui/material/styles';

export const Container = styled('div')(({ theme }) => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'space-between',
    width         : '100%',
    height        : 70,
    padding       : '14px 24px',
    borderBottom  : `2px solid ${theme.palette.semantic.border.secondary}`,
    h5            : {
        fontSize: 16,
        margin  : 0
    }
}));
