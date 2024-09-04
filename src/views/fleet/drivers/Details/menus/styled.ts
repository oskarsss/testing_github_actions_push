import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';

// eslint-disable-next-line import/prefer-default-export
export const ButtonContainer = styled(Grid)(() => ({
    display              : 'flex',
    justifyContent       : 'flex-end',
    '.MuiButtonBase-root': {
        fontWeight: '600',
        width     : '120px'
    }
}));
