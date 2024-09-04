import { styled } from '@mui/material/styles';
import MuiDivider from '@mui/material/Divider';

const Divider = styled(MuiDivider)(({ theme }) => ({
    height             : '1px',
    width              : '1px',
    background         : theme.palette.semantic.border.secondary,
    margin             : '0px !important',
    '&.MuiDivider-root': {
        margin: '0px !important'
    }
}));

export default Divider;
