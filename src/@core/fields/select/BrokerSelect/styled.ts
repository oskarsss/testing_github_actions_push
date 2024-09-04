import { styled } from '@mui/material/styles';
import { Grid, Typography } from '@mui/material';
import MuiIconButton from '@mui/material/IconButton';
import MuiDivider from '@mui/material/Divider';

export const Content = styled(Grid)(({ theme }) => ({
    width   : 'calc(100% - 44px)',
    wordWrap: 'break-word',
    color   : theme.palette.semantic.text.secondary
}));

export const Title = styled(Typography)(({ theme }) => ({
    fontSize  : '16px',
    fontWeight: 500,
    color     : theme.palette.semantic.text.primary
}));

export const Description = styled('div')(() => ({
    height    : 20,
    display   : 'flex',
    alignItems: 'center',
    gap       : 10
}));

export const Divider = styled(MuiDivider)(({ theme }) => ({
    height    : 20,
    width     : 1,
    background: theme.palette.semantic.border.secondary,
    margin    : 0
}));

export const IconWrapper = styled('div')(() => ({
    display       : 'flex',
    alignItems    : 'center',
    justifyContent: 'center',
    gap           : 5,

    svg: {
        width     : 16,
        height    : 16,
        flexShrink: 0
    }
}));

export const IconButton = styled(MuiIconButton)(() => ({
    position  : 'relative',
    top       : '-8px',
    right     : '-3px',
    padding   : '3px',
    opacity   : 1,
    transition: 'opacity 0.2s',

    '&:hover': {
        opacity: 1
    }
}));
