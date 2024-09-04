import { styled } from '@mui/material/styles';
import MuiDivider from '@mui/material/Divider';

export const Wrap = styled('div')({
    padding: 16,
    width  : '100%'
});
export const Container = styled('div')({
    display      : 'flex',
    flexDirection: 'column',
    padding      : '16px 16px 8px 16px',
    width        : '100%'
});

export const ReorderItem = styled('div')(({ theme }) => ({
    padding      : '12px 16px',
    marginBottom : '8px',
    display      : 'flex',
    alignItems   : 'center',
    gap          : 8,
    borderRadius : 4,
    overflow     : 'hidden',
    border       : `1px solid ${theme.palette.semantic.border.secondary}`,
    fontSize     : 14,
    fontWeight   : 500,
    lineHeight   : 1.43,
    letterSpacing: 0.17
}));
export const Divider = styled(MuiDivider)(({ theme }) => ({
    width          : '100%',
    margin         : 0,
    height         : 1,
    backgroundColor: theme.palette.semantic.border.secondary
}));
