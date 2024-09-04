import { styled } from '@mui/material/styles';

// eslint-disable-next-line import/prefer-default-export
export const PageTitle = styled('div')(({ theme }) => ({
    fontWeight : 700,
    fontSize   : '20px',
    lineHeight : '20px',
    color      : theme.palette.semantic.text.primary,
    marginRight: '24px'
}));

export const PageWrapper = styled('div')(() => ({
    margin       : 0,
    height       : '100%',
    position     : 'relative',
    overflow     : 'hidden',
    display      : 'flex',
    flexDirection: 'column'
}));
