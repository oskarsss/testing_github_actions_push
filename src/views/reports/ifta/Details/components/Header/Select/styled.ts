import { styled } from '@mui/material/styles';
import MuiFormControl from '@mui/material/FormControl';

const Wrapper = styled('div')(({ theme }) => ({
    display              : 'flex',
    alignItems           : 'center',
    justifyContent       : 'justify-content',
    width                : 280,
    marginRight          : 10,
    borderRadius         : 6,
    cursor               : 'pointer',
    background           : theme.palette.mode === 'light' ? '#0000000A' : 'rgba(255, 255, 255, 0.08)',
    '.MuiTypography-root': {
        display   : 'flex',
        alignItems: 'center',
        height    : 45
    },
    '.MuiTypography-h6': {
        paddingLeft: 12
    },
    '.MuiTypography-body1': {
        paddingRight: 12
    }
}));

const FormControl = styled(MuiFormControl)({
    '.MuiInputBase-root': {
        background     : 'none',
        '&.Mui-focused': {
            background: 'none'
        },
        '&:hover': {
            background: 'none !important'
        },
        '&::before': {
            border      : 'none',
            borderBottom: 'none !important'
        },
        '&::after': {
            border: 'none'
        },
        '.MuiSelect-select': {
            paddingTop   : 11,
            paddingBottom: 11,
            '&:focus'    : {
                background: 'none !important'
            }
        }
    }
});

const Quarter = styled('span')({
    marginRight: 5,
    fontWeight : 'bold'
});

const StartAdornment = styled('div')({
    display     : 'flex',
    paddingRight: 5
});

const SelectStyled = {
    Wrapper,
    FormControl,
    Quarter,
    StartAdornment
};

export default SelectStyled;
