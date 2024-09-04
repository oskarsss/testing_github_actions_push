import { styled } from '@mui/material/styles';
import MenuItem from '@mui/material/MenuItem';

export const Form = styled('form')(() => ({
    padding: '24px'
}));
export const MenuTitle = styled(MenuItem)(() => ({
    height      : '40px',
    borderBottom: '1px solid #e2e2e3'
}));
export const MenuSubTitle = styled('div')(() => ({
    width    : '100%',
    textAlign: 'center'
}));
