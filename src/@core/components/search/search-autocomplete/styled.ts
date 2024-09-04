import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';
import MuiChip from '@mui/material/Chip';

export const Container = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'row',
    justifyContent : 'flex-start',
    alignItems     : 'center',
    backgroundColor: theme.palette.semantic.foreground.secondary,
    height         : '45px',
    paddingLeft    : '10px',
    paddingRight   : '10px',
    borderRadius   : 4,
    minWidth       : 200,
    maxWidth       : 340
}));
export const NoOptions = styled('div')(({ theme }) => ({
    fontSize     : 14,
    color        : theme.palette.semantic.text.secondary,
    letterSpacing: '0.25px',
    lineHeight   : '20px',

    span: {
        color     : theme.palette.semantic.text.primary,
        fontWeight: 500
    }
}));
export const SearchAutocompleteField = styled(MuiTextField)(({ theme }) => ({
    paddingLeft          : '10px',
    paddingRight         : '10px',
    '.MuiInputBase-input': {
        backgroundColor: 'inherit',
        border         : 'none'
    },
    '.MuiInputBase-root': {
        backgroundColor: 'inherit',
        border         : 'none !important'
    },
    '.MuiInput-root:before': {
        border: 'none !important'
    },
    '.MuiInput-root:after': {
        border: 'none !important'
    },
    '.MuiInput-root:hover': {
        border: 'none !important'
    }
}));
export const MenuWrap = styled('div')(({ theme }) => ({
    display        : 'flex',
    flexDirection  : 'column',
    alignItems     : 'flex-start',
    gap            : 10,
    overflow       : 'hidden',
    width          : '220px',
    padding        : '10px',
    backgroundColor: theme.palette.semantic.foreground.secondary
}));
export const ChipsWrapper = styled('div')({
    display       : 'flex',
    width         : 'auto',
    alignItems    : 'center',
    height        : '45px',
    flexDirection : 'row',
    justifyContent: 'space-between',
    overflow      : 'hidden'
});

export const Wrap = styled('div')({
    display   : 'flex',
    alignItems: 'center',
    gap       : '4px',
    overflow  : 'hidden'
});

export const Chip = styled(MuiChip)<{ selected?: boolean }>(({
    theme,
    selected
}) => ({
    backgroundColor: selected
        ? theme.palette.semantic.foreground.brand.primary
        : theme.palette.semantic.foreground.six,
    color: selected ? theme.palette.semantic.text.white : theme.palette.semantic.text.secondary,

    '&:hover': {
        backgroundColor: selected ? theme.palette.semantic.actions.foreground.primary : undefined
    },

    '.MuiSvgIcon-root': {
        color: selected
            ? theme.palette.semantic.foreground.white.secondary
            : theme.palette.semantic.foreground.primary
    }
}));
