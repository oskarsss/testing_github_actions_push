import FormControl from '@mui/material/FormControl';
import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Wrapper = styled(FormControl)(() => ({
    // margin  : '0 20px',
    // display: 'flex',
    // flexGrow: 1
    // width : '400px'
}));

export const SyncBtn = styled(Button)(() => ({
    width      : 115,
    marginRight: 15,
    fontWeight : 700,
    height     : 36,
    minWidth   : 115,
    maxWidth   : 115,
    whiteSpace : 'nowrap'
}));
