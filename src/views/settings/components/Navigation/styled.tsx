import { styled } from '@mui/material';

// eslint-disable-next-line import/prefer-default-export
export const Description = styled('p')(({ theme }) => ({
    fontSize    : '14px',
    color       : theme.palette.semantic.text.secondary,
    marginBottom: '5px'
}));
