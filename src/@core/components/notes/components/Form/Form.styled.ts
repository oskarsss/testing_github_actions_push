import { styled } from '@mui/material/styles';
import MuiInput from '@mui/material/Input';
import MuiInputAdornment from '@mui/material/InputAdornment';
import MuiTextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

export const FileInput = styled('input')({
    visibility: 'hidden',
    display   : 'none'
});

export const Input = styled(MuiInput)({
    paddingLeft : '16px',
    paddingRight: '14px',
    fontSize    : '12px',
    minHeight   : '48px',
    width       : '100%'
});

export const InputAdornment = styled(MuiInputAdornment)({
    gap: '8px'
});

export const FormWrapper = styled('div')<{
    size: 'small' | 'normal';
}>(({
    theme,
    size
}) => ({
    minHeight      : size === 'small' ? '40px' : '100px',
    display        : 'flex',
    backgroundColor: theme.palette.semantic.foreground.secondary,
    flexDirection  : 'column',
    height         : '100%',
    border         : `1px solid ${theme.palette.semantic.border.secondary}`,
    borderRadius   : 12,
    padding        : '10px 14px'
}));

type TextFiledProps = {
    notesSize: 'small' | 'normal';
};

export const TextFiled = styled(MuiTextField, {
    shouldForwardProp: (prop) => prop !== 'notesSize'
})<TextFiledProps>(({
    theme,
    notesSize
}) => ({
    padding     : 0,
    borderRadius: '6px',
    '& fieldset': { border: '0 !important' },

    '.MuiInputBase-root.MuiOutlinedInput-root.MuiInputBase-colorPrimary': {
        alignItems   : notesSize === 'small' ? 'flex-end' : 'flex-end',
        flexDirection: notesSize === 'small' ? 'row' : 'column'
    },
    '.MuiInputBase-input': {
        padding: '0 !important',

        '&::-webkit-scrollbar': {
            width  : '4px !important',
            height : '4px !important',
            opacity: ' 1 !important'
        },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: `${theme.palette.mode === 'light' ? '#D0D5DD' : '#535252'} !important`,
            borderRadius   : '16px !important',
            width          : '4px !important'
        },

        // style for scroll bar box
        '&::-webkit-scrollbar-track-piece:vertical': {
            width          : '4px !important',
            backgroundColor: `${theme.palette.semantic.background.secondary} !important`
        },
        '&::-webkit-scrollbar-track-piece:horizontal': {
            height         : '4px !important',
            backgroundColor: `${theme.palette.semantic.background.secondary} !important`
        }
    }
}));

export const Text = styled(Typography)(({ theme }) => ({
    marginLeft: '0 !important',
    fontSize  : '14px',
    fontWeight: 500,
    color     : theme.palette.semantic.text.primary
}));
