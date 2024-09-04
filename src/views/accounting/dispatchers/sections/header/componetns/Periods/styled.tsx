import { styled } from '@mui/material/styles';
import MuiFormControl from '@mui/material/FormControl';
import MuiMenuItem from '@mui/material/MenuItem';
import MuiBox from '@mui/material/Box';

const FormControl = styled(MuiFormControl)({
    width                : 450,
    '& label.Mui-focused': {
        color: 'rgba(60, 60, 67, 0.6)'
    },
    '.MuiInputBase-root': {
        padding              : '4px 1px',
        '.MuiSelect-outlined': {
            padding: '4px 32px 4px 8px'
        },
        '&.Mui-focused fieldset': {
            border: '1px solid rgba(58, 53, 65, 0.22)'
        }
    }
});

const Box = styled(MuiBox)({
    display       : 'flex',
    flexDirection : 'row',
    justifyContent: 'space-between',
    alignItems    : 'center',
    paddingLeft   : '5px'
});

const Item = styled(MuiMenuItem)({
    display       : 'flex',
    justifyContent: 'space-between',
    alignItems    : 'center',
    maxWidth      : 450
});

const PeriodsSelectStyled = {
    FormControl,
    Box,
    Item
};

export default PeriodsSelectStyled;
