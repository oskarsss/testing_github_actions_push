import { Stack, styled } from '@mui/material';

const TableHeader = styled(Stack)(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'row',
    maxHeight    : '25px',
    height       : '100px'
}));

export const ManifestDetailsStyled = {
    TableHeader
};
