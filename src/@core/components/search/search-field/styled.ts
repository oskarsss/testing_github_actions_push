import { styled } from '@mui/material/styles';
import MuiTextField from '@mui/material/TextField';

export const Container = styled('div')(({ theme }) => ({
    display      : 'flex',
    flexDirection: 'row',

    // justifyContent : 'flex-start',
    // alignItems     : 'center',
    flex           : '1 1 200px',
    width          : '100%',
    maxWidth       : 400,
    backgroundColor: theme.palette.semantic.foreground.secondary,

    // height         : 45,
    paddingLeft : '10px',
    paddingRight: '10px',
    borderRadius: 4

    // minWidth       : 400
}));
export const SearchTextField = styled(MuiTextField)(() => ({
    '&.MuiOutlinedInput-root': {
        height: 45,
        color : 'primary'
    },

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
